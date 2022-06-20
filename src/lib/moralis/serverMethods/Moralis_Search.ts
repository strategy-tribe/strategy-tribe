import { CastOrganization, CastBounty } from '@/lib/moralis/utils/Helpers';
import { Moralis } from 'moralis';
import { ORG_TABLE, BOUNTIES_TABLE } from './tables';

export async function Moralis_UseSearch(search: string) {
  //TODO: do in parallel
  let bounties = await SearchBounties(search);
  const organizations = await SearchOrganizations(search);

  return { bounties, organizations };

  //TODO:submissions for staff
}

export async function Moralis_UseSearchBounties(search: string) {
  //TODO: do in parallel
  let bounties = await SearchBounties(search);

  return { bounties };

  //TODO:submissions for staff
}

async function SearchBounties(search: string) {
  const bountiesQuery = new Moralis.Query(BOUNTIES_TABLE);
  bountiesQuery.fullText('title', search);
  bountiesQuery.include('target');
  const bountyResults = await bountiesQuery.find();
  if (!bountyResults) return [];
  else return bountyResults.map((pref) => CastBounty(pref));
}

async function SearchOrganizations(search: string) {
  const orgQuery = new Moralis.Query(ORG_TABLE);
  orgQuery.fullText('name', search, {
    caseSensitive: false,
    diacriticSensitive: false,
  });
  const bountyResults = await orgQuery.find();
  if (!bountyResults) {
    return [];
  } else return bountyResults.map((pref) => CastOrganization(pref));
}
