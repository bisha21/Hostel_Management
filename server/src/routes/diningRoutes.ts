import express from "express";
import {
  createMeal,
  deleteMeal,
  getAllMeals,
  getMealsByDay,
  getWeeklySchedule,
  updateMeal,
} from "../controllers/diningController.js";
import { protectedRoutes } from "../middleware/protectRoute.js";
import { restrictTo } from "../middleware/restriction.js";
import { validateBody, validateParams } from "../validators/validateRequest.js";
import {
  createMealSchema,
  dayMealTypeParamSchema,
  dayParamSchema,
  updateMealSchema,
} from "../schemas/dining.schema.js";

const router = express.Router({ mergeParams: true });

router.route("/meals").get(getAllMeals);
router.route("/meals/weekly-schedule").get(getWeeklySchedule);
router.route("/meals/:day").get(validateParams(dayParamSchema), getMealsByDay);

router.use(protectedRoutes);

router.route("/meals").post(validateBody(createMealSchema), createMeal);
router
  .route("/meals/:day/:mealType")
  .put(restrictTo("student"), validateParams(dayMealTypeParamSchema), validateBody(updateMealSchema), updateMeal)
  .delete(restrictTo("student"), validateParams(dayMealTypeParamSchema), deleteMeal);

export default router;
