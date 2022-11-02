import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { bountyRouter } from './bounty';
import { orgRouter } from './org';
import { reviewRouter } from './review';
import { submissionRouter } from './submission';
import { tagRouter } from './tags';
import { targetRouter } from './targets';

export const appRouter = router({
  bounty: bountyRouter,
  orgs: orgRouter,
  target: targetRouter,
  tag: tagRouter,
  review: reviewRouter,
  submission: submissionRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
