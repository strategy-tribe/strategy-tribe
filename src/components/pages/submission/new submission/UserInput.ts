import { Requirement } from '@/lib/models/requirement';

export type UserInput = {
  requirement: Requirement;
  input: string | File[];
};
