import type { NextFunction, Request, Response } from "express";
import { DiningSchedule } from "../models/index.js";
import type { Day, MealType } from "../models/index.js";
import { AppError } from "../errors/index.js";
import { asyncHandler } from "../utils/catchAsync.js";
import type { CreateMealInput, DayMealTypeParam, DayParam, UpdateMealInput } from "../schemas/dining.schema.js";

export const createMeal = asyncHandler(
  async (req: Request<object, unknown, CreateMealInput>, res: Response, next: NextFunction) => {
    const { day, mealType, items, startTime, endTime } = req.body;

    const existingMeal = await DiningSchedule.findOne({ where: { day, mealType } });
    if (existingMeal) {
      next(new AppError(`Meal for ${day} ${mealType} already exists. Use update instead.`, 400));
      return;
    }

    const meal = await DiningSchedule.create({ day, mealType, items, startTime, endTime });

    res.status(201).json({
      status: "success",
      data: meal,
    });
  },
);

export const getAllMeals = asyncHandler(async (_req: Request, res: Response) => {
  const meals = await DiningSchedule.findAll({
    order: [
      ["day", "ASC"],
      ["mealType", "ASC"],
    ],
  });

  res.status(200).json({
    status: "success",
    results: meals.length,
    data: meals,
  });
});

export const getMealsByDay = asyncHandler(
  async (req: Request<DayParam>, res: Response, next: NextFunction) => {
    const { day } = req.params;

    const meals = await DiningSchedule.findAll({
      where: { day },
      order: [["mealType", "ASC"]],
    });

    if (meals.length === 0) {
      next(new AppError(`No meals found for ${day}.`, 404));
      return;
    }

    res.status(200).json({
      status: "success",
      results: meals.length,
      data: meals,
    });
  },
);

export const updateMeal = asyncHandler(
  async (
    req: Request<DayMealTypeParam, unknown, UpdateMealInput>,
    res: Response,
    next: NextFunction,
  ) => {
    const { day, mealType } = req.params;

    const meal = await DiningSchedule.findOne({ where: { day, mealType } });
    if (!meal) {
      next(new AppError(`Meal not found for ${day} ${mealType}.`, 404));
      return;
    }

    const updatedMeal = await meal.update(req.body);

    res.status(200).json({
      status: "success",
      data: updatedMeal,
    });
  },
);

export const deleteMeal = asyncHandler(
  async (req: Request<DayMealTypeParam>, res: Response, next: NextFunction) => {
    const { day, mealType } = req.params;

    const result = await DiningSchedule.destroy({ where: { day, mealType } });
    if (result === 0) {
      next(new AppError(`Meal not found for ${day} ${mealType}.`, 404));
      return;
    }

    res.status(200).json({
      status: "success",
      message: `Meal for ${day} ${mealType} was deleted successfully!`,
    });
  },
);

type WeeklySchedule = Record<Day, Record<MealType, DiningSchedule | null>>;

export const getWeeklySchedule = asyncHandler(async (_req: Request, res: Response) => {
  const allMeals = await DiningSchedule.findAll({
    order: [
      ["day", "ASC"],
      ["mealType", "ASC"],
    ],
  });

  const weeklySchedule: WeeklySchedule = {
    monday: { breakfast: null, lunch: null, snacks: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, snacks: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, snacks: null, dinner: null },
    thursday: { breakfast: null, lunch: null, snacks: null, dinner: null },
    friday: { breakfast: null, lunch: null, snacks: null, dinner: null },
    saturday: { breakfast: null, lunch: null, snacks: null, dinner: null },
    sunday: { breakfast: null, lunch: null, snacks: null, dinner: null },
  };

  allMeals.forEach((meal) => {
    weeklySchedule[meal.day][meal.mealType] = meal;
  });

  res.status(200).json({
    status: "success",
    data: weeklySchedule,
  });
});
