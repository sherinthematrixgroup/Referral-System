import { Request, Response } from "express";
import { createUser, getUserByEmail, getUserReferralCode } from "../Users/userService";
import { trackReferral } from "../referrals/referralService";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./userModel";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, referralCode } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required." });
  }

  try {
    const user = await createUser(username, email, password, referralCode);

    if (user.referredBy) {
      await trackReferral(user.referredBy.toString(), user._id.toString());
    }

    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json(userObj);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

//Login User || sign in
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      message: "Login successful",
      user: userObj,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Refresh token
export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "15m" });

    const newRefreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });

    user.accessToken = newAccessToken;
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(403).json({ error: "Token invalid or expired" });
  }
};

//LogoutUser
export const logoutUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required to logout" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.refreshToken = "";
    user.accessToken = "";
    await user.save();

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Server error during logout" });
  }
};

export const fetchReferralCode = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const code = await getUserReferralCode(userId);
    if (!code) {
      return res.status(404).json({ error: "User or referral code not found." });
    }
    res.json({ referralCode: code });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
};
