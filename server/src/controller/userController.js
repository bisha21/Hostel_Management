import { createToken } from "../helper/createToken.js";
import Booking from "../model/bookingModel.js";
import Room from "../model/RoomModal.js";
import User from "../model/userModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../utlis/emai.js";
import generateOtp from "../utlis/generateOtp.js";
import cloudinary from "../utlis/cloudinary.js";
import { getDataUri } from "../utlis/datauri.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const {
    username,
    email,
    address,
    password,
    user_type,
    confirmPassword,
    phoneNumber,
  } = req.body;

  // Check for missing fields
  if (
    !username ||
    !email ||
    !password ||
    !user_type ||
    !confirmPassword ||
    !address ||
    !phoneNumber
  ) {
    return next(new AppError("All fields are required", 400));
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return next(new AppError("Password and confirm password must match", 400));
  }
  let imageUrl = null;
  if (req.file) {
    try {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      imageUrl = cloudResponse.secure_url;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res
        .status(500)
        .json({ message: "Image upload failed", error: error.message });
    }
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    user_type,
    address,
    phone_number: phoneNumber,
    profile_picture: imageUrl,
  });

  // Fetch the user with bookings and rooms
  const userWithDetails = await User.findByPk(newUser.id, {
    include: [
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
    ],
  });

  // Generate token and respond
  const authToken = await createToken({
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
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    include: [
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
    ],
  });

  if (!user) {
    return next(new AppError("Invalid email or password", 400));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(new AppError("Invalid email or password", 400));
  }
  const authToken = await createToken({
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
});

export const logOut = asyncHandler(async (req, res) => {
  res.cookie("authToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const updateMe = asyncHandler(async (req, res, next) => {
  const updates = req.body;
  const keys = Object.keys(updates);
  console.log(req.body);
  console.log("user", req.user);

  // Check if no field is provided
  if (keys.length === 0) {
    return next(new AppError("Please provide a field to update", 400));
  }

  // Prevent updating password or user_type
  if (keys.includes("password") || keys.includes("user_type")) {
    return next(
      new AppError(
        "You are not allowed to update password or role from this route",
        400,
      ),
    );
  }
  const user = await User.findByPk(req.user.userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Update all allowed fields
  await user.update(updates);

  res.status(200).json({
    status: "success",
    message: "Profile updated successfully",
    data: {
      updatedFields: updates,
    },
  });
});

export const getUsersWithRooms = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        user_type: "student",
      },
      include: [
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
      ],
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users with room details:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};

export const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  req.session.email = email;
  if (!email) {
    return res.status(400).json({ message: "Please provide email" });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ email: "Email not registered" });
  }

  const otp = generateOtp();
  await sendMail({
    email: user.email,
    subject: "Reset Password OTP",
    message: `Your OTP is ${otp}`,
  });

  user.otp = otp;
  user.otpGeneratedTime = Date.now().toString(); // Store as string or number
  await user.save();

  return res.status(200).json({ message: "OTP sent to email!" });
};

export const verifyOtp = asyncHandler(async (req, res) => {
  const email = req.session.email;
  const { otp } = req.body;
  console.log(otp);
  console.log(email);
  req.session.otp = otp;
  if (!otp || !email) {
    return res.status(400).json({ message: "Please provide OTP and email" });
  }

  const user = await User.findOne({
    where: { email, otp },
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid OTP or email" });
  }

  const otpGeneratedTime = parseInt(user.otpGeneratedTime);
  const currentTime = Date.now();

  const otpExpiryTime = 2 * 60 * 1000; // 2 minutes

  if (currentTime - otpGeneratedTime > otpExpiryTime) {
    return res
      .status(400)
      .json({ message: "OTP expired. Please request a new one." });
  }

  res.status(200).json({ message: "OTP verified successfully!" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const email = req.session.email;
  const otp = req.session.otp;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Session expired or missing email/OTP." });
  }

  if (!password || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Please provide newPassword and confirmPassword" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await User.findOne({ where: { email, otp } });
  if (!user) {
    return res.status(404).json({ message: "Invalid email or OTP" });
  }

  if (!user.otpGeneratedTime) {
    return res.status(400).json({ message: "Invalid OTP timestamp" });
  }

  const otpGeneratedTime = parseInt(user.otpGeneratedTime);
  const currentTime = Date.now();

  if (currentTime - otpGeneratedTime > 2 * 60 * 1000) {
    return res
      .status(400)
      .json({ message: "OTP expired. Please request a new one." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  user.otp = null;
  user.otpGeneratedTime = null;

  await user.save();
  req.session.destroy();

  res.status(200).json({ message: "Password reset successfully!" });
});

export const userProfileDetails = asyncHandler(async (req, res) => {
  try {
    
    console.log(req.session.userId)
    const users = await User.findOne({
      where: {
        userId: userId,
      },
      include: [
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
      ],
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users with room details:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});
