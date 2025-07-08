import { User, IUser } from "./userModel";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const createUser = async (username: string, email: string, password: string, referredByCode?: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const referralCode = uuidv4().split("-")[0].toUpperCase();
  let referredBy: mongoose.Types.ObjectId | undefined;

  if (referredByCode) {
    const referrer = (await User.findOne({
      referralCode: new RegExp(`^${referredByCode}$`, "i"),
    }).exec()) as IUser | null;

    if (!referrer) {
      throw new Error("Referrer not found");
    }

    referredBy = referrer._id;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword, referralCode, referredBy });
  await user.save();
  return user;
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const getUserReferralCode = async (userId: string) => {
  const user = await User.findById(userId);
  return user?.referralCode;
};

export const getUserById = async (userId: string) => {
  return await User.findById(userId).select("-password -refreshToken").exec();
};
