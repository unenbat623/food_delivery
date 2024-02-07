import { Router } from "express";
import {
  createFood,
  deleteFood,
  getAllFood,
  getFood,
  updateFood,
} from "../controller/foodController";

const router = Router();

router.route("/").get(getAllFood).post(createFood);
router.route("/:foodId").get(getFood).put(updateFood).delete(deleteFood);

export default router;
