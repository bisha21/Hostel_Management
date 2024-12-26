import Mess from '../model/messModel.js'
import { createOne, deleteOne, getAll, getOne, updateOne } from './handleFactoryController.js'
export const creatMeal= createOne(Mess);
export const updateMeal= updateOne(Mess);
export const deleteMeal= deleteOne(Mess);
export const getMeal= getAll(Mess);
export const getMealById= getOne(Mess);