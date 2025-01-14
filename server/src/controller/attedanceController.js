import { Attendance } from "../model/attendanceModel.js";
import asyncHandler from "../utlis/catchAsync.js";

const createAttendance = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const {userId} = req.user;

    // Get today's date
    const today = new Date().toISOString().split("T")[0]; 

    // Check if attendance already exists for the user today
    const existingAttendance = await Attendance.findOne({
      where: { userId, date: today },
    });

    if (existingAttendance) {
      return res.status(400).json({ message: "Attendance already marked for today." });
    }

    // Create attendance record
    const attendance = await Attendance.create({
      userId,
      date: today,
      status,
      is_approved: false, // Set to false by default, awaiting approval
    });

    res.status(201).json({ message: "Attendance marked successfully.", attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message 

     });
  }
});

const getAttendanceByUserId = asyncHandler(
  async (req, res) => {
    const { userId } = req.user;
  
    
      const attendanceRecords = await Attendance.findAll({
        where: { userId },
        attributes: ["date", "status"], // Fetch only date and status
        order: [["date", "ASC"]], // Order by date ascending
      });
  
      const formattedRecords = attendanceRecords.map((record, index) => ({
        date: record.date,
        status: record.status,
      }));
  
      res.status(200).json(formattedRecords);
    
  });
  const getAllUserAttendance = asyncHandler(async (req, res) => {
    const attendanceRecords = await Attendance.findAll({
      attributes: ["userId", "date", "status"], // Fetch userId, date, and status
      order: [["userId", "ASC"], ["date", "ASC"]], // Order by userId and then by date
    });
  
    // Group attendance by userId
    const groupedRecords = attendanceRecords.reduce((acc, record) => {
      const userId = record.userId;
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push({
        date: record.date,
        status: record.status,
      });
      return acc;
    }, {});
  
    res.status(200).json(groupedRecords);
  });
  


export {createAttendance,getAttendanceByUserId,getAllUserAttendance};