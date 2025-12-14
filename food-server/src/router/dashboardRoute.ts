
import { Router } from "express";
import { getDashboardStats } from "../controller/dashboardController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.route("/").get(authenticate, getDashboardStats);

export default router;
