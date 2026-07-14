import type { NextFunction, Request, Response } from "express";
import { Complaint, User } from "../models/index.js";
import { AuthenticationError, NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import { sendComplaintMail, sendMail } from "../services/emailService.js";
import type { CreateComplaintInput, UpdateComplaintInput } from "../schemas/complaint.schema.js";
import type { ComplaintIdParam, RoomIdParam } from "../schemas/common.schema.js";

export const createComplaint = asyncHandler(
  async (req: Request<RoomIdParam, unknown, CreateComplaintInput>, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }
    const { userId, email } = req.user;
    const { roomId } = req.params;
    const { description, category, feedback } = req.body;

    const newComplaint = await Complaint.create({
      userId,
      roomId,
      description,
      category,
      feedback,
    });

    await sendComplaintMail({
      email,
      subject: "New Complaint Submitted",
      message: `
      A new complaint has been submitted by user ${userId}.
      Room ID: ${roomId}
      Description: ${description}
      Category: ${category}
      Feedback: ${feedback}
    `,
    });

    res.status(201).json({
      status: "success",
      data: newComplaint.dataValues,
    });
  },
);

export const getComplaintbyRoomID = asyncHandler(
  async (req: Request<RoomIdParam>, res: Response) => {
    const complaints = await Complaint.findAll({
      where: { roomId: req.params.roomId },
    });

    if (complaints.length === 0) {
      res.status(200).json({
        status: "sucess",
        message: "No complain yet all",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: complaints,
    });
  },
);

export const getAllComplaints = asyncHandler(async (_req: Request, res: Response) => {
  const complaints = await Complaint.findAll();
  res.status(200).json({
    status: "success",
    data: complaints,
  });
});

export const updateComplaints = asyncHandler(
  async (
    req: Request<ComplaintIdParam, unknown, UpdateComplaintInput>,
    res: Response,
    next: NextFunction,
  ) => {
    const complaint = await Complaint.findByPk(req.params.complaintId);
    if (!complaint) {
      next(new NotFoundError("No complaints found"));
      return;
    }

    const user = await User.findByPk(complaint.userId);
    if (!user) {
      next(new NotFoundError("User not found"));
      return;
    }

    const { status } = req.body;
    complaint.status = status;
    await complaint.save();

    await sendMail({
      email: user.email,
      subject: `Complaint Resolved: ${complaint.status}`,
      message: `
      Your complaint has been resolved.
      Complaint ID: ${complaint.id}
      Status: ${complaint.status}
      Feedback: ${complaint.feedback}
    `,
    });

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
  },
);
