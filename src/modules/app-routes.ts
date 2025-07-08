import { Router } from "express";
import { userRoutes } from "./Users/userRoutes";
import { referralRoutes } from "./referrals/referralRoutes";

export const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/referrals", referralRoutes);
