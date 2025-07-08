import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  referralCode: string;
  referredBy?: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  accessToken: { type: String },
  refreshToken: { type: String },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const User = mongoose.model<IUser>("User", userSchema);
