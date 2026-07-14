import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Booking, Room, User } from "../models/index.js";
import { AppError, AuthenticationError, NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import { createToken } from "../services/tokenService.js";
import { sendMail } from "../services/emailService.js";
import cloudinary from "../services/cloudinaryService.js";
import { getDataUri } from "../utils/datauri.js";
import generateOtp from "../utils/generateOtp.js";
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  VerifyOtpInput,
} from "../schemas/auth.schema.js";
import type { UpdateProfileInput } from "../schemas/user.schema.js";

const bookingInclude = [
  {
    model: Booking,
    attributes: ["id", "userId", "roomId", "total_amount", "status"],
    include: [
      {
        model: Room,
        attributes: ["id", "RoomNumber", "Type", "Price"],
      },
    ],
  },
];

export const registerUser = asyncHandler(
  async (req: Request<object, unknown, RegisterInput>, res: Response, next: NextFunction) => {
    const { username, email, address, password, user_type, phoneNumber } = req.body;

    let imageUrl: string | null = null;
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        imageUrl = cloudResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ message: "Image upload failed", error: message });
        return;
      }
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      next(new AppError("User already exists", 400));
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      user_type,
      address,
      phone_number: phoneNumber,
      profile_picture: imageUrl,
    });

    const userWithDetails = await User.findByPk(newUser.id, { include: bookingInclude });
    if (!userWithDetails) {
      next(new NotFoundError("User not found"));
      return;
    }

    const authToken = createToken({
      userId: userWithDetails.id,
      email: userWithDetails.email,
      user_type: userWithDetails.user_type,
      username: userWithDetails.username,
    });
    res.cookie("authToken", authToken);

    res.status(200).json({
      status: "success",
      data: {
        ...userWithDetails.dataValues,
        authToken,
      },
    });
  },
);

export const login = asyncHandler(
  async (req: Request<object, unknown, LoginInput>, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: bookingInclude });
    if (!user) {
      next(new AppError("Invalid email or password", 400));
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      next(new AppError("Invalid email or password", 400));
      return;
    }

    const authToken = createToken({
      userId: user.id,
      email: user.email,
      user_type: user.user_type,
      username: user.username,
    });
    res.cookie("authToken", authToken);

    res.status(200).json({
      status: "success",
      data: {
        ...user.dataValues,
        authToken,
      },
    });
  },
);

export const logOut = asyncHandler((_req: Request, res: Response) => {
  res.cookie("authToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const updateMe = asyncHandler(
  async (req: Request<object, unknown, UpdateProfileInput>, res: Response, next: NextFunction) => {
    const updates = req.body;

    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }

    const user = await User.findByPk(req.user.userId);
    if (!user) {
      next(new NotFoundError("User not found"));
      return;
    }

    await user.update(updates);

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        updatedFields: updates,
      },
    });
  },
);

export const getUsersWithRooms = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.findAll({
    where: { user_type: "student" },
    include: bookingInclude,
  });

  res.json(users);
});

export const handleForgotPassword = asyncHandler(
  async (req: Request<object, unknown, ForgotPasswordInput>, res: Response) => {
    const { email } = req.body;
    req.session.email = email;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ email: "Email not registered" });
      return;
    }

    const otp = generateOtp();
    await sendMail({
      email: user.email,
      subject: "Reset Password OTP",
      message: `Your OTP is ${otp}`,
    });

    user.otp = String(otp);
    user.otpGeneratedTime = Date.now().toString();
    await user.save();

    res.status(200).json({ message: "OTP sent to email!" });
  },
);

export const verifyOtp = asyncHandler(
  async (req: Request<object, unknown, VerifyOtpInput>, res: Response) => {
    const email = req.session.email;
    const { otp } = req.body;
    req.session.otp = otp;

    if (!email) {
      res.status(400).json({ message: "Please provide OTP and email" });
      return;
    }

    const user = await User.findOne({ where: { email, otp } });
    if (!user) {
      res.status(404).json({ message: "Invalid OTP or email" });
      return;
    }

    const otpGeneratedTime = parseInt(user.otpGeneratedTime ?? "0", 10);
    const currentTime = Date.now();
    const otpExpiryTime = 2 * 60 * 1000;

    if (currentTime - otpGeneratedTime > otpExpiryTime) {
      res.status(400).json({ message: "OTP expired. Please request a new one." });
      return;
    }

    res.status(200).json({ message: "OTP verified successfully!" });
  },
);

export const resetPassword = asyncHandler(
  async (req: Request<object, unknown, ResetPasswordInput>, res: Response) => {
    const { password } = req.body;
    const email = req.session.email;
    const otp = req.session.otp;

    if (!email || !otp) {
      res.status(400).json({ message: "Session expired or missing email/OTP." });
      return;
    }

    const user = await User.findOne({ where: { email, otp } });
    if (!user) {
      res.status(404).json({ message: "Invalid email or OTP" });
      return;
    }

    if (!user.otpGeneratedTime) {
      res.status(400).json({ message: "Invalid OTP timestamp" });
      return;
    }

    const otpGeneratedTime = parseInt(user.otpGeneratedTime, 10);
    const currentTime = Date.now();

    if (currentTime - otpGeneratedTime > 2 * 60 * 1000) {
      res.status(400).json({ message: "OTP expired. Please request a new one." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.otp = null;
    user.otpGeneratedTime = null;

    await user.save();
    req.session.destroy(() => {});

    res.status(200).json({ message: "Password reset successfully!" });
  },
);

export const OwnDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    next(new AuthenticationError("Authentication required"));
    return;
  }
  const { userId } = req.user;

  const user = await User.findOne({ where: { id: userId }, include: bookingInclude });
  if (!user) {
    next(new NotFoundError("User not found"));
    return;
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});
