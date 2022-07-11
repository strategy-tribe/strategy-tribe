import { BOUNTIES_TABLE, TARGETS_TABLE } from './tables';
import { Moralis } from 'moralis';
import { CastBounty } from '../utils/Helpers';
import { Bounty } from '@/lib/models/bounty';
import { BountyState } from '@/lib/models/status';
import { BountyQueryParams } from '@/lib/models/queryParams';
import { Requirement } from '@/lib/models/requirement';
import { Target } from '@/lib/models/target';

export const Moralis_useGetBounties = (
  config: BountyQueryParams,
  moralis = Moralis
) => {
  const fetch = async () => {
    const {
      amount,
      orgName,
      order,
      orderBy,
      paginate,
      states,
      targetType,
      searchTerm,
      maxBounty,
      minBounty,
      specificityOfOrgName,
      countries,
      page,
    } = config;

    const query = new moralis.Query(BOUNTIES_TABLE);

    if (targetType) {
      query.equalTo('type', targetType);
    }

    if (maxBounty) {
      query.lessThanOrEqualTo('funds', maxBounty);
    }
    if (minBounty) {
      query.greaterThanOrEqualTo('funds', minBounty);
    }

    if (searchTerm) {
      query.fullText('title', searchTerm, {
        caseSensitive: false,
        diacriticSensitive: true,
      });
    }

    if (countries && countries.length) {
      query.containsAll('countries', countries);
    }

    switch (orderBy) {
      case 'submissions':
        if (order === 'asc') {
          query.ascending('submissions');
        } else {
          query.descending('submissions');
        }
        break;
      case 'closesAt':
        if (order === 'asc') {
          query.ascending('closesAt');
        } else {
          query.descending('closesAt');
        }
        query.exists('closesAt');
        break;
      case 'funds':
        if (order === 'asc') {
          query.ascending('funds');
        } else {
          query.descending('funds');
        }
        break;
      default:
        if (order === 'asc') {
          query.ascending('createdAt');
        } else {
          query.descending('createdAt');
        }
    }

    if (orgName) {
      if (specificityOfOrgName === 'Exact') {
        query.equalTo('organizationName', orgName);
      } else {
        query.fullText('organizationName', orgName);
      }
    }
    if (states) {
      states.forEach((s) => {
        query.equalTo('state', s);
      });
    }

    let skipped = 0;
    if (paginate && page && amount) {
      skipped = page * amount;
      query.skip(skipped);
    }

    if (amount) {
      query.limit(amount);
    }

    const promises = [query.find(), query.count()];

    const results = await Promise.all(promises);

    const data = results[0] as Moralis.Object<Moralis.Attributes>[];
    const count = results[1] as number;

    const bounties: Bounty[] | undefined = castMultipleBounties(data);

    const hasLess = skipped > 0;
    const hasMore = config.amount
      ? count - config.amount * (page || 0) > config.amount
      : false;

    return {
      bounties,
      hasMore,
      hasLess,
      page: page || 0,
      count,
    };
  };

  return {
    fetch,
  };
};

export const Moralis_useGetBounty = (
  id: string,
  moralis = Moralis
): { fetch: () => Promise<Bounty | undefined> } => {
  const fetch = async () => {
    const query = new moralis.Query(BOUNTIES_TABLE);
    query.include('target');
    query.equalTo('objectId', id);

    try {
      const firstDoc = await query.first();

      if (!firstDoc) {
        throw `No bounties found for ${id}`;
      }

      const bounty: Bounty = CastBounty(firstDoc);
      return bounty;
    } catch (error) {
      console.error(
        `Could not find the bounty of id: ${id}. Inner error: ${error}`
      );
      return undefined;
    }
  };

  return {
    fetch,
  };
};

export const Moralis_useSaveBounty = (
  title: string,
  target: Target,
  requirements: Requirement[],
  staffCreatorId: string,
  closesAt?: Date
): {
  save: () => Promise<string>;
} => {
  const save = async () => {
    //target
    const targetRef = new Moralis.Object(TARGETS_TABLE);
    targetRef.set('name', target.name);
    targetRef.set('organizationName', target.organizationName);
    targetRef.set('description', target.description);
    targetRef.set('type', target.type);
    const targetACL = new Moralis.ACL();
    targetACL.setPublicReadAccess(true);
    targetACL.setPublicWriteAccess(false);
    targetACL.setRoleWriteAccess('staff', true);
    targetACL.setRoleReadAccess('staff', true);
    targetRef.setACL(targetACL);

    //bounty
    const bountyRef = new Moralis.Object(BOUNTIES_TABLE);

    bountyRef.set('state', BountyState.WaitingForFunds);
    bountyRef.set('title', title);

    bountyRef.set('name', target.name);
    bountyRef.set('alsoKnownAs', target.alsoKnownAs);
    bountyRef.set('description', target.description);
    bountyRef.set('type', target.type);
    bountyRef.set('organizationName', target.organizationName);
    bountyRef.set('tags', target.tags);

    const lowerCaseCountries = target.countries?.map((c) =>
      c.toUpperCase().trim()
    );
    bountyRef.set('countries', lowerCaseCountries);

    bountyRef.set('requirements', requirements);
    bountyRef.set('staffCreatorId', staffCreatorId);
    bountyRef.set('submissions', 0);
    bountyRef.set('funds', 0);
    bountyRef.set('wallet', '');
    bountyRef.set('closesAt', closesAt);

    const propClass = Moralis.Object.extend(BOUNTIES_TABLE);
    const bounty = new propClass(bountyRef.attributes);

    const context = { isNew: true };
    const response = await bounty.save(null, { context: context });

    return response.id;
  };

  return {
    save,
  };
};

const castMultipleBounties = (data: Moralis.Object<Moralis.Attributes>[]) => {
  const bounties: Bounty[] = [];
  for (const d of data) {
    const p = CastBounty(d);
    bounties.push(p);
  }

  return bounties;
};
