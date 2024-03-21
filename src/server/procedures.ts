import { initTRPC, TRPCError } from '@trpc/server';

import prisma from '@/server/prisma/prismaClient';

import { TRPC_Context } from './context';
import { Custom_tRPC_Transformer } from './transformer';

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.
const t = initTRPC
  .context<TRPC_Context>()
  .create({ transformer: Custom_tRPC_Transformer });

// Base router and procedure helpers
export const router = t.router;

/**
 * Checks if the user has a session
 **/
const passesPrisma = t.middleware(({ next, ctx }) => {
  const newCtx = { ...ctx, prisma };

  return next({
    ctx: newCtx,
  });
});

/**
 * Checks if the user has a session
 **/
const isRegularUser = t.middleware(({ next, ctx }) => {
  const session = ctx.session;

  if (!session || (!session?.user && session?.user.rol !== 'REGULAR')) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: { ...ctx, session, prisma },
  });
});

/**
 * Checks if the user is a staff or  admin or dataDumpUser
 **/
const isDataDumpUser = t.middleware(({ next, ctx }) => {
  const session = ctx.session;

  if (
    !session ||
    !session?.user ||
    (session.user.rol !== 'DATADUMPUSER' &&
      session.user.rol !== 'STAFF' &&
      session.user.rol !== 'ADMIN')
  ) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: { ...ctx, session, prisma },
  });
});

/**
 * Checks if the user is a staff or  admin
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
    ctx: { ...ctx, session, prisma },
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

  const newCtx = {
    ...ctx,
    session,
    prisma,
  };

  return next({
    ctx: newCtx,
  });
});

/** It allows all requests to pass through. It passes a prisma instance*/
export const publicProcedure = t.procedure.use(passesPrisma);

/** Protects a route. It only allows signed in users */
export const signedInOnlyProcedure = t.procedure.use(isRegularUser);

/** Protects a route. It only allows admins */
export const adminOnlyProcedure = t.procedure.use(isAdmin);

/** Protects a route. It only allows staff or admins */
export const staffOnlyProcedure = t.procedure.use(isStaff);

/** Protects a route. It only allows staff or admins or dataDumpUser*/
export const dataDumpUserProcedure = t.procedure.use(isDataDumpUser);
