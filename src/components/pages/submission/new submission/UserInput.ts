import { Requirement } from '@prisma/client';

export type UserInput = {
  requirement: Requirement;
  input: string | File[];
};
