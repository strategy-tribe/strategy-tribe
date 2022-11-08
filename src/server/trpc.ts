import { initTRPC, TRPCError } from '@trpc/server';

import { TRPC_Context } from './context';

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.
const t = initTRPC.context<TRPC_Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Checks if the user has a session
 **/
const isRegularUser = t.middleware(({ next, ctx }) => {
  const session = ctx.session;

  if (!session || (!session?.user && session?.user.rol !== 'REGULAR')) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  const newCtx = { ...ctx, session };

  return next({
    ctx: newCtx,
  });
});

/**
 * Checks if the user is an admin
 **/
const isStaff = t.middleware(({ next, ctx }) => {
  const session = ctx.session;

  if (
    !session ||
    !session?.user ||
    (session.user.rol !== 'STAFF' && session.user.rol !== 'ADMIN')
  ) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: { ...ctx, session },
  });
});

/**
 * Checks if the user is an admin
 **/
const isAdmin = t.middleware(({ next, ctx }) => {
  const session = ctx.session;
  if (!session || !session?.user || session.user.rol !== 'ADMIN') {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const newCtx = { ...ctx, session };

  return next({
    ctx: newCtx,
  });
});

/** Protects a route. It only allows signed in users */
export const signedInOnlyProcedure = t.procedure.use(isRegularUser);

/** Protects a route. It only allows admins */
export const adminOnlyProcedure = t.procedure.use(isAdmin);

/** Protects a route. It only allows staff or admins */
export const staffOnlyProcedure = t.procedure.use(isStaff);
