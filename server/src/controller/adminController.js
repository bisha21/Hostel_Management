import Admin from "../model/adminModel.js";
import { createOne, deleteOne, getAll, updateOne } from "./handleFactoryController.js";

export const createAdmin=  createOne(Admin);
export const getAllAdmin= getAll(Admin);
export const updateAdmin= updateOne(Admin);
export const deleteAdmin= deleteOne(Admin);