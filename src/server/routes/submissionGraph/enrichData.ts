import { RequirementType } from '@prisma/client';
import { z } from 'zod';

import { enrichOsintIndustries } from '@/server/dataFetch/utils';
import { staffOnlyProcedure } from '@/server/procedures';

/** Schema used to post BountySubGraph */
const EnrichDataSchema = z.object({
  dataPoints: z
    .object({
      type: z.enum([RequirementType.Email, RequirementType.PhoneNumber]),
      value: z.string(),
    })
    .array(),
});

export type EnrichDataParams = z.infer<typeof EnrichDataSchema>;

export const getEnrichedData = async (
  input: EnrichDataParams
): Promise<any> => {
  try {
    const { dataPoints } = input;
    let enrichedData = {};
    for (const dataPoint of dataPoints) {
      const enriched = await enrichOsintIndustries(dataPoint.value);
      if (enriched.length > 0) {
        enrichedData = {
          ...enrichedData,
          [dataPoint.value]: formatEnrichedData(enriched),
        };
      }
    }
    return enrichedData;
  } catch (e: any) {
    throw new Error(e.response.data.error);
  }
};

const formatEnrichedData = (enriched: any) => {
  let eData = {};
  enriched.forEach((data: any) => {
    eData = {
      ...eData,
      [data.module]: data.data,
    };
  });
  return eData;
};

export const enrichData = staffOnlyProcedure
  .input(EnrichDataSchema)
  .mutation(async ({ input }) => {
    const enrichedData = await getEnrichedData(input);
    return enrichedData;
  });
