import Notification from "../model/notificationModel.js";
import User from "../model/userModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { sendMail } from "../utlis/emai.js";
import { getAll } from "./handleFactoryController.js";

export const createNotification = async (req, res) => {
  const { message, type, priority, sentby, username, email } = req.body;
  const { userId } = req.user;

  try {
    // Validate input
    if (!message || !type || !priority || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save notification to the database
    const notification = await Notification.create({
      userId,
      message,
      type,
      priority,
      sentby,
    });

    // Send email notification
    const emailOptions = {
      email,
      subject: `New Notification: ${type}`,
      message,
    };

    await sendMail(emailOptions);

    res.status(201).json({
      message: 'Notification created and email sent successfully',
      notification
    });
  } catch (error) {
    console.error('Error creating notification:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const createNotificationForAll = async (req, res) => {
  const { message, type, priority, sentby } = req.body;

  try {
    if (!message || !type || !priority) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const users = await User.findAll({ attributes: ["id", "email"] });

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    // Extract emails and filter out empty ones
    const emails = users
      .map((user) => user.email)
      .filter((email) => email && email.trim() !== "");

    if (emails.length === 0) {
      return res.status(400).json({ error: "No valid email addresses found" });
    }

    // Save notifications for all users
    const notifications = await Notification.bulkCreate(
      users.map((user) => ({
        userId: user.id,
        message,
        type,
        priority,
        sentby,
      }))
    );

    // Send email to all users
    const emailOptions = {
      email: emails, // Now guaranteed to have valid emails
      subject: `New Notification: ${type}`,
      message,
    };

    await sendMail(emailOptions);

    res.status(201).json({
      message: "Notification sent to all users successfully",
      notifications,
    });
  } catch (error) {
    console.error("Error sending notifications:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllNotification = getAll(Notification);

export const getMyNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  if (!userId) {
    return next(new AppError('User not found', 404));
  }
  const notifications = await Notification.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });

  if(!notifications) {
    return next(new AppError("No notifications found", 404));
  }

  res.status(200).json({
    status: 'success',
    results: notifications.length,
    data: notifications,
  });
})