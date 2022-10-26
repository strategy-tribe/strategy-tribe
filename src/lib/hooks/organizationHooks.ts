import { trpc } from '../trpc';

export const useGetAllOrganizations = (enabled = true) => {
  // const { fetch } = Moralis_useGetOrganizations();

  // const { isLoading, data } = useQuery([Queries.Organizations], () => fetch(), {
  //   enabled,
  // });

  return {
    isLoading: true,
    organizations: [],
  };
};

export const useGetOrganization = (orgId: string, enabled = true) => {
  // const { fetch } = Moralis_useGetOrganization(orgId);

  // const { isLoading, data, error } = useQuery(
  //   [Queries.Organizations, orgId],
  //   () => fetch(),
  //   {
  //     enabled,
  //   }
  // );

  return {
    isLoading: true,
    organization: undefined,
    error: undefined,
  };
};

export const useGetOrganizationByName = (name: string, enabled = true) => {
  const { error, isLoading, data } = trpc.orgs.getOrg.useQuery(
    {
      name,
    },
    { enabled }
  );

  return {
    error,
    isLoading,
    organization: data?.organization,
  };
};
