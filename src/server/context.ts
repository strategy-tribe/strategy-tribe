import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

interface CustomContextOptions
  extends Partial<trpcNext.CreateNextContextOptions> {
  session?: Session | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts?: CustomContextOptions) {
  return {
    ...opts,
  };
}

export type CustomTRPCContext = trpc.inferAsyncReturnType<
  typeof createContextInner
>;

export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<CustomTRPCContext> {
  // for API-response caching see https://trpc.io/docs/caching
  if (opts.req) {
    console.error(opts.req.headers);
    console.error(
      opts.req.headers['x-vercel-ip-country']?.toString() as string
    );
    console.error(opts.req.headers['x-vercel-ip-city']?.toString() as string);
    const session = await getSession({ req: opts.req });
    return await createContextInner({ ...opts, session });
  }
  return await createContextInner({ ...opts });
}

export type TRPC_Context = trpc.inferAsyncReturnType<typeof createContext>;
