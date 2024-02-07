import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} from "../controller/categoryController";
import { upload } from "../utils/multer";
import { authenticate } from "../middleware/auth";

const router = Router();

router
  .route("/")
  .get(authenticate, getAllCategory)
  .post(upload.single("image"), createCategory);

router
  .route("/:categoryId")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
