import { Request, Response } from "express";
import { createUser, getUserReferralCode } from "../Users/userService";
import { trackReferral } from "../referrals/referralService";

export const registeruser = async (req: Request, res: Response) => {
  const { name, email, referralCode } = req.body;

  // Basic input validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  try {
    const user = await createUser(name, email, referralCode); // ✅ updated function call

    // Track referral if user was referred
    if (user.referredBy) {
      await trackReferral(user.referredBy as string, user._id.toString());
    }

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

export const fetchReferralCode = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const code = await getUserReferralCode(userId);
  res.json({ referralCode: code });
};
