import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { NextApiRequest } from 'next';
import { isArray } from 'util';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

const ConnectBountySchema = z.object({
  slug: z.string(),
  fingerprint: z.string(),
  account: z.string().optional(),
});

/** Params necessary to call `connectBounty`  */
export type ConnectBountyParams = z.infer<typeof ConnectBountySchema>;

/** Response to connecting fingerprint to bounty */
export type ConnectBountyResponse = NonNullable<
  ThenArg<ReturnType<typeof connectBounty>>
>;

const connectToBounty = async (
  slug: string,
  fingerprint: string,
  prisma: PrismaClient
) => {
  await prisma.bounty.update({
    where: {
      slug: slug,
    },
    data: {
      fingerprints: {
        connectOrCreate: {
          where: {
            fingerprint: fingerprint,
          },
          create: {
            fingerprint: fingerprint,
          },
        },
      },
    },
  });
};

const connectToUser = async (
  account: string | undefined,
  fingerprint: string,
  prisma: PrismaClient
) => {
  if (account) {
    await prisma.fingerprint.update({
      where: {
        fingerprint: fingerprint,
      },
      data: {
        users: {
          connect: {
            address: account,
          },
        },
      },
    });
  }
};

const connectToIP = async (
  req: NextApiRequest | undefined,
  fingerprint: string,
  prisma: PrismaClient
) => {
  const ip = req?.headers['x-forwarded-for'];
  const countryCode = req?.headers['x-vercel-ip-country'];
  const city = req?.headers['x-vercel-ip-city'];
  if (ip) {
    await prisma.fingerprint.update({
      where: {
        fingerprint: fingerprint,
      },
      data: {
        ipDetails: {
          connectOrCreate: {
            where: {
              ip: isArray(ip) ? ip[0] : ip ?? 'unknown',
            },
            create: {
              ip: isArray(ip) ? ip[0] : ip ?? 'unknown',
              city: isArray(city) ? city[0] : city ?? 'unknown',
              countyrCode: isArray(countryCode)
                ? countryCode[0]
                : countryCode ?? 'unknown',
            },
          },
        },
      },
    });
  }
};

export const connectBounty = publicProcedure
  .input(ConnectBountySchema)
  .mutation(async ({ input, ctx }) => {
    const { slug, fingerprint, account } = input;
    const { prisma, req } = ctx;
    await connectToBounty(slug, fingerprint, prisma);
    await connectToUser(account, fingerprint, prisma);
    await connectToIP(req, fingerprint, prisma);
  });
