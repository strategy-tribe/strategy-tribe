import { Organization } from '@/lib/models/organizations/organization';
import { Bounty } from '@/lib/models/bounty';
import { Submission } from '@/lib/models/submission';
import { Target } from '@/lib/models/target';
import Moralis from 'moralis/types';

export function CastSubmission(subRef: Moralis.Object<Moralis.Attributes>) {
  const data = subRef.attributes;
  const sub: Submission = {
    id: subRef.id,
    createdAt: subRef.createdAt,
    owner: data['owner'],
    state: data['state'],
    bountyId: data['bountyId'],
    answers: data['content'],
  };

  return sub;
}

export const CastBounty = (
  bountyRef: Moralis.Object<Moralis.Attributes>
): Bounty => {
  const mockBounty = bountyRef.attributes as Bounty;
  const bounty: Bounty = {
    ...mockBounty,
    id: bountyRef.id,
    createdAt: bountyRef.createdAt,
    updatedAt: bountyRef.updatedAt,
  };
  return bounty;
};

export const CastOrganization = (
  orgRef: Moralis.Object<Moralis.Attributes>
) => {
  const mockOrg = orgRef.attributes as Organization;
  const org: Organization = {
    ...mockOrg,
    id: orgRef.id,
    createdAt: orgRef.attributes.createdAt,
    updatedAt: orgRef.attributes.updatedAt,
  };
  return org;
};

export const CastOrganizations = (
  orgsRef: Moralis.Object<Moralis.Attributes>[]
): Organization[] => {
  const orgs: Organization[] = [];

  for (const orgRef of orgsRef) {
    const org = CastOrganization(orgRef);
    orgs.push(org);
  }

  return orgs;
};
