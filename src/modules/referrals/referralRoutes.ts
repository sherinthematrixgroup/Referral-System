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

export { router as referralRoutes };
