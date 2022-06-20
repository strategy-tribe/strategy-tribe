import Queries from '@/utils/Queries';
import {
  Moralis_useGetOrganization,
  Moralis_useGetOrganizationByname,
  Moralis_useGetOrganizations,
} from '@/lib/moralis/serverMethods/Moralis_Organizations';
import { useQuery } from 'react-query';

export const useGetAllOrganizations = (enabled = true) => {
  const { fetch } = Moralis_useGetOrganizations();

  const { isLoading, data } = useQuery([Queries.Organizations], () => fetch(), {
    enabled,
  });

  return {
    isLoading,
    organizations: data?.organizations
      ? data?.organizations.sort((a, b) => a.name.localeCompare(b.name))
      : [],
  };
};

export const useGetOrganization = (orgId: string, enabled = true) => {
  const { fetch } = Moralis_useGetOrganization(orgId);

  const { isLoading, data, error } = useQuery(
    [Queries.Organizations, orgId],
    () => fetch(),
    {
      enabled,
    }
  );

  return {
    isLoading,
    organization: data?.organization,
    error,
  };
};

export const useGetOrganizationByName = (orgName: string, enabled = true) => {
  const { fetch } = Moralis_useGetOrganizationByname(orgName);

  const { isLoading, data } = useQuery(
    [Queries.Organizations, orgName],
    () => fetch(),
    {
      enabled,
    }
  );

  return {
    isLoading,
    organization: data?.organization,
  };
};
