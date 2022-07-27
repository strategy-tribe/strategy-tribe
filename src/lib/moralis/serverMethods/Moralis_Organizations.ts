import { Organization } from '@/lib/models/organizations/organization';
import {
  CastOrganization,
  CastOrganizations,
} from '@/lib/moralis/utils/Helpers';
import { Moralis } from 'moralis';
import { ORG_TABLE } from './tables';

export const Moralis_useGetOrganizations = () => {
  const fetch = async () => {
    const query = new Moralis.Query(ORG_TABLE);
    query.ascending('name');
    //TODO: Paginate organizations
    query.limit(1000);
    const data = await query.find();

    const organizations: Organization[] | undefined = CastOrganizations(data);

    if (!organizations || !organizations.length)
      console.warn('No organization found');

    return {
      organizations,
    };
  };

  return {
    fetch,
  };
};

export const Moralis_useGetOrganization = (id: string) => {
  const fetch = async () => {
    const query = new Moralis.Query(ORG_TABLE);
    query.equalTo('objectId', id);
    const data = await query.first();

    if (!data) {
      return undefined;
    }

    const organization: Organization | undefined = CastOrganization(data);

    if (!organization) throw 'No organization found';

    return {
      organization,
    };
  };

  return {
    fetch,
  };
};

export const Moralis_useGetOrganizationByname = (name: string) => {
  const fetch = async () => {
    const query = new Moralis.Query(ORG_TABLE);
    query.equalTo('name', name);
    const data = await query.first();

    if (!data) {
      return undefined;
    }

    const organization: Organization | undefined = CastOrganization(data);

    if (!organization) throw 'No organization found';

    return {
      organization,
    };
  };

  return {
    fetch,
  };
};
