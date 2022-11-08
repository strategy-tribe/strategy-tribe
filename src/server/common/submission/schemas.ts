import { SubmissionState } from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

export type iGetSubmissionsSchema = z.infer<typeof GetSubmissionsSchema>;

/** Schema used to query for submissions */
export const GetSubmissionsSchema = z.object({
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  state: z.nativeEnum(SubmissionState).optional(),
  reviewed: z.boolean().optional(),
  owners: z.string().array().optional(),
  page: z.number().optional(),
  bounties: z.string().array().optional(),
});
