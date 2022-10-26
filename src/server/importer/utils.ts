export const ORG_PREFIX = 'org_';
export const IND_PREFIX = 'ind_';

export function LOG(msg: string) {
  // eslint-disable-next-line no-console
  // console.log(msg);
}

export function ERROR(msg: string, throwIt = true) {
  console.error(msg);
  if (throwIt) {
    throw new Error(msg);
  }
}

export type Row = string[];

export type TargetData = {
  name: string;
  organizationName: string;
  alsoKnownAs: string[] | undefined;
  tags: string[] | undefined;
};

export type OrgData = {
  name: string;
  alsoKnownAs: string[] | undefined;
  tags: string[] | undefined;
  countries: string[];
  bio: string | undefined;
  why: string | undefined;
  links: string[] | undefined;
};
