import { BountyQueryParams } from '@/lib/models/BountyQueryParams';
import { trpc } from '@/lib/trpc';
import { Requirement, Target } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FullBounty } from '../types';



//!Get All
export const useGetBounties = (config: BountyQueryParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);

  const { error, isLoading, data, isFetching } =
    trpc.bounty.getBounties.useQuery(
      config, {
        enabled: true
      }
    );

  useEffect(() => {
    if (data && config.amount && config.paginate) {
      // const { count } = data;
      const count = 10;
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);

      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config]);

  const bounties: FullBounty[] = data?.bounties ?? [];

  return {
    isLoading,
    bounties,
    isFetching: isFetching,
    page,
    numOfPages,
    count: 10,
    hasNextPage: false,
    hasPreviousPage: false,
    isPreviousData: false,
    error,
  };
};

//!Get one
export const useGetBounty = (slug: string, enabled = true) => {
  const { error, isLoading, data } = trpc.bounty.getBounty.useQuery(
    {
      slug,
    },
    { enabled }
  );

  return {
    bounty: data?.bounty ?? undefined,
    error,
    isLoading,
  };
};

//!Put one
export const useSaveBounty = (
  title: string,
  target: Target,
  requirements: Requirement[],
  staffCreatorId: string,
  closesAt?: Date
) => {
  // const q = useQueryClient();
  // const router = useRouter();

  // const { save } = Moralis_useSaveBounty(
  //   title,
  //   target,
  //   requirements,
  //   staffCreatorId,
  //   closesAt
  // );

  // const { mutate, isLoading, error } = useMutation(() => save(), {
  //   onSuccess: (bountyId) => {
  //     router.push(GoToBountyPage(bountyId));
  //     q.invalidateQueries();
  //   },
  // });

  return {
    Save: () => {
      //
    },
    isLoading: true,
    error: undefined,
  };
};
