import type { NextFunction, Request, Response } from "express";
import { Attendance, User } from "../models/index.js";
import type { AttendanceStatus } from "../models/index.js";
import { AuthenticationError, NotFoundError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import type {
  AttendanceQuery,
  CreateAttendanceInput,
  UpdateApprovalStatusInput,
} from "../schemas/attendance.schema.js";

export const createAttendance = asyncHandler(
  async (req: Request<object, unknown, CreateAttendanceInput>, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }
    const { status } = req.body;
    const { userId } = req.user;

    const today = new Date().toISOString().split("T")[0] as string;

    const existingAttendance = await Attendance.findOne({ where: { userId, date: today } });
    if (existingAttendance) {
      res.status(400).json({ message: "Attendance already marked for today." });
      return;
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      status,
      is_approved: false,
    });

    res.status(201).json({ message: "Attendance marked successfully.", attendance });
  },
);

export const getAttendanceByUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AuthenticationError("Authentication required"));
      return;
    }
    const { userId } = req.user;

    const attendanceRecords = await Attendance.findAll({
      where: { userId },
      attributes: ["date", "status"],
      order: [["date", "ASC"]],
    });

    const formattedRecords = attendanceRecords.map((record) => ({
      date: record.date,
      status: record.status,
    }));

    res.status(200).json(formattedRecords);
  },
);

export const getAllUserAttendance = asyncHandler(
  async (req: Request<object, unknown, unknown, AttendanceQuery>, res: Response) => {
    const { date } = req.query;
    const queryDate = date ?? (new Date().toISOString().split("T")[0] as string);

    const users = await User.findAll({
      attributes: ["id", "username", "email", "user_type"],
      where: { user_type: "student" },
    });

    const attendanceRecords = await Attendance.findAll({
      where: { date: queryDate },
      attributes: ["userId", "status", "is_approved"],
    });

    const attendanceMap = attendanceRecords.reduce<
      Record<number, { status: AttendanceStatus; is_approved: boolean | null }>
    >((acc, record) => {
      acc[record.userId] = { status: record.status, is_approved: record.is_approved };
      return acc;
    }, {});

    const combinedData = users.map((user) => {
      const attendance = attendanceMap[user.id] ?? { status: "absent" as const, is_approved: false };
      return {
        userId: user.id,
        username: user.username,
        email: user.email,
        date: queryDate,
        status: attendance.status,
        is_approved: attendance.is_approved,
      };
    });

    res.status(200).json({
      date: queryDate,
      totalUsers: users.length,
      presentCount: attendanceRecords.filter((r) => r.status === "present").length,
      absentCount: users.length - attendanceRecords.filter((r) => r.status === "present").length,
      attendanceRecords: combinedData,
    });
  },
);

export const updateApprovalStatus = asyncHandler(
  async (
    req: Request<object, unknown, UpdateApprovalStatusInput>,
    res: Response,
    next: NextFunction,
  ) => {
    const { userId, date, is_approved } = req.body;

    if (req.user?.user_type !== "admin") {
      res.status(403).json({ message: "Only admins can approve attendance" });
      return;
    }

    const attendance = await Attendance.findOne({ where: { userId, date } });
    if (!attendance) {
      next(new NotFoundError("Attendance record not found"));
      return;
    }

    attendance.is_approved = is_approved;
    await attendance.save();

    res.status(200).json({
      message: `Attendance ${is_approved ? "approved" : "unapproved"} successfully`,
      attendance,
    });
  },
);
