import { router } from '../procedures';
import { bountyRouter } from './bounty';
import { invoiceRouter } from './invoice';
import { orgRouter } from './org';
import { reviewRouter } from './review';
import { submissionRouter } from './submission';
import { tagRouter } from './tags';
import { targetRouter } from './targets';
import { walletRouter } from './wallet';

export const appRouter = router({
  bounty: bountyRouter,
  orgs: orgRouter,
  target: targetRouter,
  tag: tagRouter,
  review: reviewRouter,
  submission: submissionRouter,
  invoice: invoiceRouter,
  wallet: walletRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
