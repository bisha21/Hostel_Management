import Feedback from '../model/feedbackModel.js';
import Mess from '../model/messModel.js'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handleFactoryController.js'
export const creatMeal= createOne(Mess);
export const updateMeal= updateOne(Mess);
export const deleteMeal= deleteOne(Mess);
export const getMeal= getAll(Mess);
export const getMealById= getOne(Mess);

// Function to get all reviews for a specific Mess
export const getMessReviewById= async (req, res) => {
  const { messId } = req.params; 

  try {
    const reviews = await Feedback.findAll({
      where: {
        messId,
      },
      
    });

    // Send response
    res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);

    // Handle errors
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong while fetching reviews',
      error: error.message,
    });
  }
};
