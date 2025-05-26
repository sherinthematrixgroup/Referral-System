import express from "express";
import { registeruser, fetchReferralCode } from "./userController";

const router = express.Router();

router.post("/register", (req, res, next) => {
  Promise.resolve(registeruser(req, res)).catch(next);
});
router.get("/:userId/referral-code", fetchReferralCode);

router.get("/ping", (req, res) => {
  res.send("User route is active!");
});

export { router as userRoutes };
