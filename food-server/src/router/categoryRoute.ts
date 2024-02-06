import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controller/categoryController";

const router = Router();

router.route("/").get(getAllCategory).post(createCategory);
router
  .route("/:categoryid")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
