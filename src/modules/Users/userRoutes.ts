import express from "express";
import { registerUser, fetchReferralCode, loginUser, logoutUser, refreshToken } from "./userController";
import { authenticateToken } from "../../middlewares/Authentication-Token";
import { User } from "./userModel";

const router = express.Router();

router.post("/register", (req, res, next) => {
  Promise.resolve(registerUser(req, res)).catch(next);
});

router.post("/login", (req, res, next) => {
  Promise.resolve(loginUser(req, res)).catch(next);
});

router.get("/:userId/referral-code", (req, res, next) => {
  Promise.resolve(fetchReferralCode(req, res)).catch(next);
});

router.get("/profile", authenticateToken, async (req, res) => {
  const userId = (req as any).user.userId;
  const user = await User.findById(userId).select("-password -refreshToken");

  res.json({ user });
});
router.post("/refresh-token", (req, res, next) => {
  Promise.resolve(refreshToken(req, res)).catch(next);
});

router.post("/logout", (req, res, next) => {
  Promise.resolve(logoutUser(req, res)).catch(next);
});

export { router as userRoutes };
