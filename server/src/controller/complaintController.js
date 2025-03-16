import { Complaint } from "../model/complaintModel.js";
import User from "../model/userModal.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { senComplaintdMail } from "../utlis/complaintEmail.js";
import { sendMail } from "../utlis/emai.js";

export const createComplaint = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { roomId } = req.params;
  const { description, category, feedback } = req.body;
  if (!userId || !roomId || !description || !category || !feedback) {
    return next(new AppError('All fields are required', 400));
  }

  const newComplaint = await Complaint.create({
    userId,
    roomId,
    description,
    category,
    feedback,
  });
  const emailOptions = {
    email: req.user.email,
    subject: 'New Complaint Submitted',
    message: `
      A new complaint has been submitted by user ${userId}.
      Room ID: ${roomId}
      Description: ${description}
      Category: ${category}
      Feedback: ${feedback}
    `,
  };

  // Send email to admin after creating the complaint
  await senComplaintdMail(emailOptions);

  res.status(201).json({
    status: 'success',
    data: newComplaint.dataValues,
  });
});

export const getComplaintbyRoomID = asyncHandler(async (req, res, next) => {
  const complaints = await Complaint.findAll({
    where: {
      roomId: req.params.roomId,
    },
  });
  if (complaints.length === 0) {
    res.status(200).json({
      status: "sucess",
      message: "No complain yet all"
    })
  }
  if (!complaints) {
    return next(new AppError('No complaints found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: complaints,
  });
});

export const getAllComplaints = asyncHandler(async (req, res, next) => {
  const complaints = await Complaint.findAll();
  if (!complaints) {
    return next(new AppError('No complaints found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: complaints,
  });
})

export const updateComplaints = asyncHandler(async (req, res, next) => {
  const complaint = await Complaint.findByPk(req.params.complaintId);
  const user = await User.findByPk(complaint.userId);
  if (!complaint) {
    return next(new AppError("No complaints found", 404));
  }

  const { status } = req.body;
  if (status) complaint.status = status;
  
  

  await complaint.save();
  const emailOptions = {
    email: user.email,
    subject: `Complaint Resolved: ${complaint.status}`,
    message:`
      Your complaint has been resolved.
      Complaint ID: ${complaint.id}
      Status: ${complaint.status}
      Feedback: ${complaint.feedback}
    `,
  };

  await sendMail(emailOptions);
  res.status(200).json({
    status: "success",
    data: {
      id: complaint.id,
      userId: complaint.userId,
      roomId: complaint.roomId,
      description: complaint.description,
      status: complaint.status,
      feedback: complaint.feedback,
      category: complaint.category,
    },
  });
});
