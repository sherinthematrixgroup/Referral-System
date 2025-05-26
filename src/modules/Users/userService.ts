import { User } from "../Users/userModel";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (name: string, email: string, referredByCode?: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const referralCode = uuidv4().split("-")[0];
  let referredBy = null;

  if (referredByCode) {
    const referrer = await User.findOne({ referralCode: new RegExp(`^${referredByCode}$`, "i") });
    if (referrer) {
      referredBy = referrer.referralCode;
    } else {
      throw new Error("Referrer not found");
    }
  }

  const user = new User({ name, email, referralCode, referredBy });
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
