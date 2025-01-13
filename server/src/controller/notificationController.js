import Notification from "../model/notificationModel.js";
import { sendMail } from "../utlis/emai.js";

export const createNotification = async (req, res) => {
  const { message, type, priority, sentby } = req.body;
  const {userId,email}=req.user;

  try {
    // Validate input
    if ( !message || !type || !priority) {
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
