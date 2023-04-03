import { bountyRouter } from './bounty';
import { donationRouter } from './donation';
import { fileRouter } from './files';
import { fingerprintRouter } from './fingerprint';
import { invoiceRouter } from './invoice';
import { mapRouter } from './map';
import { notificationRouter } from './notification';
import { orgRouter } from './org';
import { reviewRouter } from './review';
import { statisticsRouter } from './statistics';
import { submissionRouter } from './submission';
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
  fingerprint: fingerprintRouter,
  user: userRouter,
  donation: donationRouter,
  statistics: statisticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
