import { Requirement } from '@prisma/client';

/** Defines the user input for a singular requirement */
export type UserInput = {
  requirement: Requirement;
  input: string | Buffer[]; //a string or an array of images
};
