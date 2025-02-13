import { Attendance } from "../model/attendanceModel.js";
import User from "../model/userModal.js";
import asyncHandler from "../utlis/catchAsync.js";
import { Op } from "sequelize";

const createAttendance = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const { userId } = req.user;

    const today = new Date().toISOString().split("T")[0];

    const existingAttendance = await Attendance.findOne({
      where: { userId, date: today },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today." });
    }

    const attendance = await Attendance.create({
      userId,
      date: today,
      status,
      is_approved: false,
    });

    res.status(201).json({ message: "Attendance marked successfully.", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

const getAttendanceByUserId = asyncHandler(async (req, res) => {
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
});

const getAllUserAttendance = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const queryDate = date || new Date().toISOString().split("T")[0];

  // Get all users
  const users = await User.findAll({
    attributes: ['id', 'username', 'email', 'user_type'],
    where: {
      user_type: 'student' // Assuming we only want to track student attendance
    }
  });

  // Get attendance records for the specified date
  const attendanceRecords = await Attendance.findAll({
    where: {
      date: queryDate
    },
    attributes: ['userId', 'status', 'is_approved']
  });

  // Create a map of attendance records for quick lookup
  const attendanceMap = attendanceRecords.reduce((acc, record) => {
    acc[record.userId] = {
      status: record.status,
      is_approved: record.is_approved
    };
    return acc;
  }, {});

  // Combine user data with attendance status
  const combinedData = users.map(user => {
    const attendance = attendanceMap[user.id] || {
      status: 'absent',
      is_approved: false
    };

    return {
      userId: user.id,
      username: user.username,
      email: user.email,
      date: queryDate,
      status: attendance.status,
      is_approved: attendance.is_approved
    };
  });

  res.status(200).json({
    date: queryDate,
    totalUsers: users.length,
    presentCount: attendanceRecords.filter(r => r.status === 'present').length,
    absentCount: users.length - attendanceRecords.filter(r => r.status === 'present').length,
    attendanceRecords: combinedData
  });
});

const updateApprovalStatus = asyncHandler(async (req, res) => {
  const { userId, date, is_approved } = req.body;

  // Check if the requesting user is an admin
  if (req.user.user_type !== 'admin') {
    return res.status(403).json({ message: "Only admins can approve attendance" });
  }

  const attendance = await Attendance.findOne({
    where: { userId, date }
  });

  if (!attendance) {
    return res.status(404).json({ message: "Attendance record not found" });
  }

  attendance.is_approved = is_approved;
  await attendance.save();

  res.status(200).json({
    message: `Attendance ${is_approved ? 'approved' : 'unapproved'} successfully`,
    attendance
  });
});

export {
  createAttendance,
  getAttendanceByUserId,
  getAllUserAttendance,
  updateApprovalStatus
};