import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  referred: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  rewardGiven: { type: Boolean, default: false },
});

export const Referral = mongoose.model("Referral", referralSchema);
export const createReferral = async (referrerId: string, referredId: string) => {
  const referral = new Referral({
    referrer: referrerId,
    referred: referredId,
  });
  await referral.save();
  return referral;
};
