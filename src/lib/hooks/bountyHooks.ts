import { Requirement, Target } from '@prisma/client';

import { BountyQueryParams } from '@/lib/models/BountyQueryParams';

//!Get All
export const useGetBounties = (config: BountyQueryParams, enabled = true) => {
  // const { isInitialized } = useMoralis();
  // const page = config.page || 0;
  // const { fetch } = Moralis_useGetBounties(config);

  // const [numOfPages, setNumOfPages] = useState(0);

  // const queryId = [Queries.AllBounties, config, config.page];

  // const { error, isLoading, data, isFetching, isPreviousData } = useQuery(
  //   queryId,
  //   () => fetch(),
  //   {
  //     getPreviousPageParam: (lastPackage) => {
  //       const { hasLess, page } = lastPackage;
  //       if (hasLess) return page - 1;
  //       else return false;
  //     },
  //     getNextPageParam: (lastPackage) => {
  //       const { hasMore, page } = lastPackage;
  //       if (hasMore) return page + 1;
  //       else return false;
  //     },
  //     enabled: isInitialized && enabled,
  //     keepPreviousData: config.paginate,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // useEffect(() => {
  //   if (data && config.amount && config.paginate) {
  //     const { count } = data;
  //     const _numOfPages = Math.floor((count - 1) / config.amount + 1);

  //     setNumOfPages(_numOfPages);
  //   } else {
  //     setNumOfPages(0);
  //   }
  // }, [data, config]);

  return {
    isLoading: true,
    bounties: [],
    isFetching: true,
    page: 0,
    numOfPages: 0,
    count: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isPreviousData: false,
    error: undefined,
  };
};

//!Get one
export const useGetBounty = (id: string, enabled = true) => {
  // const { fetch } = Moralis_useGetBounty(id);
  // const { isInitialized } = useMoralis();

  // const { data, isLoading, error } = useQuery(
  //   [Queries.OneBounty, id],
  //   () => fetch(),
  //   {
  //     enabled: isInitialized && enabled,
  //   }
  // );

  return { bounty: undefined, isLoading: true, error: undefined };
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
