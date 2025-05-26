import { Referral } from "../referrals/referralModel";
import { User } from "../Users/userModel";

export const trackReferral = async (referrerId: string, referredId: string) => {
  const referral = new Referral({ referrer: referrerId, referred: referredId });
  await referral.save();
  await User.findByIdAndUpdate(referrerId, { $inc: { points: 10 } });
  await User.findByIdAndUpdate(referredId, { $inc: { points: 5 } });
  return referral;
};
