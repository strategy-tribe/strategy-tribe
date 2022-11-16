import { GetOrgParams } from '@/server/routes/organizations/getOrg';

import { trpc } from '../trpc';

export const useGetAllOrganizations = (enabled = true) => {
  const { error, isLoading, data } = trpc.orgs.getOrgs.useQuery(
    {},
    {
      enabled,
    }
  );

  return {
    ...data,
    isLoading: isLoading,
    error,
  };
};

export const useGetOrganization = (
  params: GetOrgParams,
  config?: { enabled?: boolean }
) => {
  const { error, isLoading, data } = trpc.orgs.getOrg.useQuery(params, {
    ...config,
  });

  return {
    ...data,
    isLoading: isLoading,
    error: error,
  };
};

// export const useGetOrganizationByName = (name: string, enabled = true) => {
//   const { error, isLoading, data } = trpc.orgs.getOrg.useQuery(
//     {
//       name,
//     },
//     { enabled }
//   );

//   return {
//     error,
//     isLoading,
//     organization: data?.organization,
//   };
// };
