import { bountyRouter } from './bounty';
import { donationRouter } from './donation';
import { fileRouter } from './files';
import { invoiceRouter } from './invoice';
import { mapRouter } from './map';
import { notificationRouter } from './notification';
import { orgRouter } from './org';
import { referralRouter } from './referral';
import { reviewRouter } from './review';
import { statisticsRouter } from './statistics';
import { submissionRouter } from './submission';
import { subscriptionRouter } from './subscription';
import { tagRouter } from './tags';
import { targetRouter } from './targets';
import { userRouter } from './user';
import { walletRouter } from './wallet';
import { router } from '../procedures';

export const appRouter = router({
  bounty: bountyRouter,
  orgs: orgRouter,
  target: targetRouter,
  tag: tagRouter,
  review: reviewRouter,
  submission: submissionRouter,
  invoice: invoiceRouter,
  wallet: walletRouter,
  map: mapRouter,
  notification: notificationRouter,
  file: fileRouter,
  user: userRouter,
  donation: donationRouter,
  statistics: statisticsRouter,
  referral: referralRouter,
  subscriptionRouter: subscriptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
