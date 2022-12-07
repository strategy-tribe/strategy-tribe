import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { MapDataWithFeatures } from '@/lib/models/MapData';

import { publicProcedure, router } from '../procedures';
import { ThenArg } from '../routes/utils/helperTypes';

const getMapDataSchema = z.object({}).optional();

export type GetMapParams = z.infer<typeof getMapDataSchema>;
export const mapRouter = router({
  getMapData: publicProcedure
    .input(getMapDataSchema)
    .query(async ({ ctx, input }) => {
      const mapData = await getMapData(ctx.prisma);
      return { mapData, ...input };
    }),
});

export async function GetMap(prisma: PrismaClient) {
  const mapData = await prisma.countriesData.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      countries: {
        include: {
          CountriesData: true,
          country: {
            select: {
              code: true,
              name: true,
              _count: true,
            },
          },
        },
      },
      _count: true,
    },
  });
  return mapData;
}

async function getFeatures() {
  try {
    const featuresUrl = process.env.FEATURES_URL as string;

    if (!featuresUrl) {
      throw new Error('Undefined features url');
    }

    const featuresRes = await fetch(featuresUrl);
    const features = (await featuresRes.json()).features;

    return features;
  } catch (error) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to fetch features.json',
      cause: JSON.stringify(error, null, 2),
    });
  }
}

export const getMapData = async (
  prisma: PrismaClient
): Promise<MapDataWithFeatures> => {
  const getEndpoint = `${process.env.DOMAIN}/static/data/features.json`;
  const featuresRes = await fetch(getEndpoint);
  const features = (await featuresRes.json()).features;

  const mapData = await GetMap(prisma);

  if (!mapData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query map data',
    });
  }

  const data: MapDataWithFeatures = {
    features,
    mapData,
  };
  return data;
};

export type FullCountriesData = NonNullable<ThenArg<ReturnType<typeof GetMap>>>;
