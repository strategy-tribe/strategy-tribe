import { SmallOrg } from '@/server/routes/organizations/getOrgs';

export type MapOfOrgs = {
  letter: string;
  orgs: SmallOrg[];
}[];
