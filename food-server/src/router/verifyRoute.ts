import { Router } from "express";
import { sendEmailToUser, verifyOtp } from "../controller/verifyController";

const router = Router();

router.route("/send-email").post(sendEmailToUser);
router.route("/otp").post(verifyOtp);

export default router;
