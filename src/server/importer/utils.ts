import { RequirementType } from '@prisma/client';

export const ORG_PREFIX = 'org_';
export const IND_PREFIX = 'ind_';

export function LOG(msg: string) {
  // eslint-disable-next-line no-console
  console.log(msg);
}

export function WARN(msg: string) {
  console.warn('\x1b[43m', `! -> ${msg}`);
  // eslint-disable-next-line no-console
  console.log('\x1b[0m');
}

export function ERROR(msg: string, throwIt = true) {
  console.error('\x1b[41m', `X -> ${msg}`);
  if (throwIt) {
    throw new Error(msg);
  }
  // eslint-disable-next-line no-console
  console.log('\x1b[0m');
}

export type Row = string[];

export type TargetData = {
  name: string;
  organizationName: string;
  alsoKnownAs: string[] | undefined;
  tags: string[] | undefined;
  bio: string | undefined;
  types: RequirementType[];
  incrementConfig: string | undefined;
};

export type OrgData = {
  name: string;
  alsoKnownAs: string[] | undefined;
  tags: string[] | undefined;
  countries: string[];
  bio: string | undefined;
  why: string | undefined;
  links: string[] | undefined;
  types: RequirementType[];
  incrementConfig: string | undefined;
};

/** To be used if no types are defined for a organization */
export const DEFAULT_TYPES_FOR_BOUNTIES = [
  RequirementType.Email,
  RequirementType.Domain,
  RequirementType.Wallet,
];
