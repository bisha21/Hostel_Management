import { Complaint } from "../model/complaintModel.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";

export const createComplaint = asyncHandler(async (req, res, next) => {
  const { userId } = req.user;
  const { roomId } = req.params;
  const { description, status, category, feedback } = req.body;
  if(!userId||!roomId||!description||!status||!category||!feedback){
    return next(new AppError('All fields are required', 400));
  }

  const newComplaint = await Complaint.create({
    userId,
    roomId,
    description,
    status,
    category,
    feedback,
  });

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
  if(complaints.length===0)
  {
    res.status(200).json({
        status:"sucess",
        message:"No complain yet all"
    })
  }
  if(!complaints){
    return next(new AppError('No complaints found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: complaints,
  });
});

export const updateComplaints = asyncHandler(async (req, res, next) => {
    const { userId } = req.user;
    console.log("hi i am",userId);
   
  
    // Find complaint by ID
    const complaint = await Complaint.findByPk(req.params.roomId);
    if (!complaint) {
      return next(new AppError("No complaints found", 404));
    }
    console.log(complaint.userId);
    console.log(userId);
  
    // Check ownership
    if (userId !== complaint.userId) {
        
      return next(new AppError("You are not the owner of this complaint", 403));
    }
  
    // Allow updates for specific fields
    const { status, feedback, description } = req.body;
    if (status) complaint.status = status;
    if (feedback) complaint.feedback = feedback;
    if (description) complaint.description = description;
  
    // Save updated complaint
    await complaint.save();
  
    // Return updated data
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
  