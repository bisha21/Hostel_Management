import express from "express";
import { 
  createMeal, 
  updateMeal, 
  deleteMeal, 
  getAllMeals, 
  getMealsByDay, 
  getWeeklySchedule 
} from "../controller/diningController.js";
import { protectedRoutes } from '../middleware/protectRoute.js';
import { restrictTo } from "../middleware/restriction.js";

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllMeals);
router.route("/weekly-schedule").get(getWeeklySchedule);
router.route("/:day").get(getMealsByDay);

router.use(protectedRoutes); 

router.route("/").post(restrictTo("student"), createMeal);
router.route("/:day/:mealType")
  .put(restrictTo("student"), updateMeal)
  .delete(restrictTo("student"), deleteMeal);

export default router;
