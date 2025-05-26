import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  referralCode: string;
  referredBy?: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: String, default: null },
});

export const User = mongoose.model<IUser>("User", userSchema);
