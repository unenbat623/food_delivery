import { Router } from "express";
import { authenticate } from "../middleware/auth";
import {
  addToBasketByUserId,
  deleteFromBasketByUser,
  getFromBasketByUser,
} from "../controller/basketController";

const router = Router();

router
  .route("/")
  .post(authenticate, addToBasketByUserId)
  .get(authenticate, getFromBasketByUser);

router.route("/:foodId").delete(authenticate, deleteFromBasketByUser);

export default router;
