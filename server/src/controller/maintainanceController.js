// import Feedback from '../model/feedbackModel.js';
import Maintenance from '../model/maintainanceModel.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from './handleFactoryController.js'
export const creatMaintainance= createOne(Maintenance);
export const updateMaintainance= updateOne(Maintenance);
export const deleteMaintainance= deleteOne(Maintenance);
export const getMaintainance= getAll(Maintenance);
export const getMaintainanceById= getOne(Maintenance);

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
