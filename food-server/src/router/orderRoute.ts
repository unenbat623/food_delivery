import { Router } from "express";
import { createOrder, getAllOrders, updateOrder } from "../controller/orderController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/").post(authenticate, createOrder).get(getAllOrders);
router.route("/:orderId").put(authenticate, updateOrder);

export default router;
