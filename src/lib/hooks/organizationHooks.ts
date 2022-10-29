import { trpc } from '../trpc';
import { FullOrganization } from '../types';

export const useGetAllOrganizations = (enabled = true) => {
  const { error, isLoading, data, isFetching } =
    trpc.orgs.getOrgs.useQuery(
      {
      },
      {
        enabled
      }
    );
  const organizations: FullOrganization[] = data?.organizations ?? [];

  return {
    isLoading: isLoading,
    organizations: organizations,
  };
};

export const useGetOrganization = (where: {id?:string, name?:string}, enabled = true) => {
  const { error, isLoading, data } = trpc.orgs.getOrg.useQuery(
    where,
    { enabled }
  );

  return {
    isLoading: isLoading,
    organization: data?.organization ?? [],
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
