import express from "express";
import {
  getReferrals,
  getReferralUserIds,
  getReferralHistory,
  getTotalEarnings,
  getReferralEarnings,
  getReferralTransactions,
  getTransactionDetail,
} from "./referralController";

const router = express.Router();

function asyncHandler(
  fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>,
): express.RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get("/:userId/referrals", asyncHandler(getReferrals));
router.get("/:userId/referred-ids", getReferralUserIds);
router.get("/:userId/history", asyncHandler(getReferralHistory));
router.get("/:userId/earnings", asyncHandler(getTotalEarnings));
router.get("/:userId/earnings/:referralId", asyncHandler(getReferralEarnings));
router.get("/:userId/earnings/:referralId/transactions", asyncHandler(getReferralTransactions));
router.get("/:userId/earnings/:referralId/transactions/:transactionId", asyncHandler(getTransactionDetail));

router.get("/ping", (req, res) => {
  res.send("Referral route is active!");
});
export { router as referralRoutes };
// This code defines the referral routes for the application. It includes routes for fetching referral history, earnings, and transactions related to referrals. The routes are defined using Express.js and are exported for use in the main application file.
