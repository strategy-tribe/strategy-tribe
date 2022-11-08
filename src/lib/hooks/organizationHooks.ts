import { Organization } from '@prisma/client';

import { trpc } from '../trpc';

export const useGetAllOrganizations = (enabled = true) => {
  const { error, isLoading, data, isFetching } = trpc.orgs.getOrgs.useQuery(
    {},
    {
      enabled,
    }
  );
  const organizations: Organization[] = data?.organizations ?? [];

  return {
    isLoading: isLoading,
    organizations: organizations,
  };
};

export const useGetOrganization = (id: string, enabled = true) => {
  const { error, isLoading, data } = trpc.orgs.getOrg.useQuery(
    {
      id,
    },
    { enabled }
  );

  return {
    isLoading: isLoading,
    organization: data?.organization,
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
