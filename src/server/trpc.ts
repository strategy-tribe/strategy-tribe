import { initTRPC } from '@trpc/server';

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that checks if users are authenticated.
 * @note Example only, yours may vary depending on how your auth is setup
 **/
const isAuthed = t.middleware(({ next, ctx }) => {
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: 'hey, this is the session',
    },
  });
});

// Protected procedures for logged in users only
export const protectedProcedure = t.procedure.use(isAuthed);
