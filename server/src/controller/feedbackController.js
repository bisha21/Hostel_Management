import Feedback from "../model/feedbackModel.js";
import asyncHandler from "../utlis/catchAsync.js";

export const createFeedback = asyncHandler(async (req, res, next) => {
  const { userId}= req.user;
  const messId = req.params.id;
  const { rating, review } = req.body;

  try {
    const feedback = await Feedback.create({
      userId,
      messId,
      rating,
      review
    
    });
    

    res.status(201).json({
      status: "success",
      data: feedback,
    });
  } catch (err) {
    next(err);
  }
});