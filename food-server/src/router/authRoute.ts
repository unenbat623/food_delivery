import { Router } from "express";
import { signup, login } from "../controller/authController";

const router = Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

export default router;
