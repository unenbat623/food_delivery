import { Router } from "express";
import {
  resetPass,
  sendEmailToUser,
  verifyOtp,
  verifyUser,
} from "../controller/verifyController";

const router = Router();

router.route("/send-email").post(sendEmailToUser);
router.route("/otp").post(verifyOtp);
router.route("/user").get(verifyUser);
router.route("/resetPass").put(resetPass);

export default router;
