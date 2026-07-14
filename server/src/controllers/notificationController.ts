import type { NextFunction, Request, Response } from "express";
import { Notification, User } from "../models/index.js";
import { AppError, AuthenticationError, NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import { sendMail } from "../services/emailService.js";
import { getAll } from "./handleFactoryController.js";
import type {
  CreateNotificationForAllInput,
  CreateNotificationInput,
} from "../schemas/notification.schema.js";

export const createNotification = asyncHandler(
  async (req: Request<object, unknown, CreateNotificationInput>, res: Response, next: NextFunction) => {
    const { message, type, priority, sentby, email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      next(new NotFoundError("User not found"));
      return;
    }

    const notification = await Notification.create({
      userId: user.id,
      message,
      type,
      priority,
      sentby,
    });

    await sendMail({
      email,
      subject: `New Notification: ${type}`,
      message,
    });

    res.status(201).json({
      message: "Notification created and email sent successfully",
      notification,
    });
  },
);

export const createNotificationForAll = asyncHandler(
  async (
    req: Request<object, unknown, CreateNotificationForAllInput>,
    res: Response,
    next: NextFunction,
  ) => {
    const { message, type, priority, sentby } = req.body;

    const users = await User.findAll({ attributes: ["id", "email"] });
    if (users.length === 0) {
      next(new NotFoundError("No users found"));
      return;
    }

    const emails = users.map((user) => user.email).filter((email) => email.trim() !== "");
    if (emails.length === 0) {
      next(new AppError("No valid email addresses found", 400));
      return;
    }

    const notifications = await Notification.bulkCreate(
      users.map((user) => ({ userId: user.id, message, type, priority, sentby })),
    );

    await sendMail({
      email: emails,
      subject: `New Notification: ${type}`,
      message,
    });

    res.status(201).json({
      message: "Notification sent to all users successfully",
      notifications,
    });
  },
);

export const getAllNotification = getAll(Notification);

export const getMyNotifications = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }
    const { userId } = req.user;

    const notifications = await Notification.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      status: "success",
      results: notifications.length,
      data: notifications,
    });
  },
);
