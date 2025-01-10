import Student from "../model/StudentModel.js";
import AppError from "../utlis/appError.js";
import asyncHandler from "../utlis/catchAsync.js";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handleFactoryController.js";
export const getAllStudent = getAll(Student);
export const getStudentById = getOne(Student);
export const updateStudent = updateOne(Student);
export const createStudent = createOne(Student);
export const deleteStudent = deleteOne(Student);
