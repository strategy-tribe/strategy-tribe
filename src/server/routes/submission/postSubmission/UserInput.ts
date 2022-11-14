import { RequirementType } from '@prisma/client';
import { z } from 'zod';

export const UserInputSchema = z.object({
  input: z.union([z.string(), z.string().array(), z.any().refine(val => val.length >0, "File is required").array()]),
  requirement: z.object({
    id: z.string(),
    title: z.string(),
    type: z.nativeEnum(RequirementType),
    optional: z.boolean(),
    bountySlug: z.string().nullable(),
  }),
});

/** Defines the user input for a singular requirement */
export type UserInput = z.infer<typeof UserInputSchema>;
