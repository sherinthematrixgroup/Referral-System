import mongoose from "mongoose";
import { Request, Response } from "express";
import { Referral } from "../referrals/referralModel";

export const getReferrals = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const referrals = await Referral.find({ referrer: userId }).populate("referred");
  res.json(referrals);
};

export const getReferralUserIds = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const referrals = await Referral.find({
      referrer: new mongoose.Types.ObjectId(userId),
    }).select("referred");

    const referralUserIds = referrals.map((ref) => ref.referred);
    res.json({ referralUserIds });
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral user IDs", error });
  }
};

export const getReferralHistory = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const referrals = await Referral.find({ referrer: userId }).populate("referred");
  res.json(referrals);
};

export const getTotalEarnings = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const referrals = await Referral.find({ referrer: userId });
  const totalPoints = referrals.length * 10; // assuming 10 points per referral
  res.json({ totalPoints });
};

export const getReferralEarnings = async (req: Request, res: Response) => {
  const { userId, referralId } = req.params;
  const referral = await Referral.findOne({ referrer: userId, referred: referralId });
  if (!referral) return res.status(404).json({ message: "Referral not found" });
  res.json({ rewardGiven: referral.rewardGiven });
};

export const getReferralTransactions = async (req: Request, res: Response) => {
  const { userId, referralId } = req.params;
  const transactions = await Referral.find({ referrer: userId, referred: referralId });
  res.json(transactions);
};

export const getTransactionDetail = async (req: Request, res: Response) => {
  const { userId, referralId, transactionId } = req.params;
  const transaction = await Referral.findOne({
    _id: transactionId,
    referrer: userId,
    referred: referralId,
  });
  if (!transaction) return res.status(404).json({ message: "Transaction not found" });
  res.json(transaction);
};
