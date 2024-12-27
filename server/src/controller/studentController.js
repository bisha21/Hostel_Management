import Student from "../model/StudentModel.js";
import { Visitor } from "../model/visitorModel.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handleFactoryController.js";
export const getAllStudent = getAll(Student);
export const getStudentById = getOne(Student);
export const updateStudent = updateOne(Student);
export const createStudent = createOne(Student);
export const deleteStudent = deleteOne(Student);
export const getVisitorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const Visitors = await Visitor.findAll({
      where: {
        studentId: id,
      },
    });

    if (!Visitors) {
      throw new AppError('No visitors found with the given ID', 404);
    }

    // Send response
    res.status(200).json({
      status: 'success',
      data: Visitors,
    });
  } catch (error) {
    throw error;
  }
});