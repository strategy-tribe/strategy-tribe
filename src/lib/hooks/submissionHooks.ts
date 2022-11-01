import { UserInput } from '@/components/pages/submission/new submission/UserInput';
import { useQueryClient } from 'react-query';
import { trpc } from '../trpc';

export const useSaveSubmission = (
  address: string,
  content: UserInput[],
  bountyId: string,
  events: {
    onMutate: () => void;
    onSuccess: (id?: string) => void;
    onError: (e: any) => void;
  }
) => {
  const { onError, onMutate, onSuccess } = events;

  const q = useQueryClient();

  const mutation = trpc.submission.post.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      q.invalidateQueries();
      onSuccess(data.submissionId);
    },
  })

  return {
    Save: async ()=>{
      mutation.mutate({
        slug: bountyId,
        address,
        answers: content
      })
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useGetSubmission = (id: string, enabled = true, retries = 1) => {
  // const { find } = Moralis_useGetSubmission(id);

  // const {
  //   data: submission,
  //   isLoading,
  //   error,
  // } = useQuery([Queries.OneSubmision, id], () => find(), {
  //   enabled,
  //   retry: retries,
  // });

  return {
    submission: undefined,
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useGetSubmissionsFromBounty = (
  userId: string | undefined,
  bountyId: string,
  enabled?: boolean
) => {
  // const { find } = Moralis_useGetSubmissionsFromBounty(bountyId, userId);
  // const {
  //   data: submissions,
  //   isLoading,
  //   error,
  // } = useQuery([Queries.BountySubmissions, bountyId], () => find(), {
  //   enabled,
  // });
  return {
    submissions: [],
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useGetUserSubmissions = (userId: string, enabled?: boolean) => {
  // const { find } = Moralis_useGetUserSubmissions(userId);
  // const {
  //   data: submissions,
  //   isLoading,
  //   error,
  // } = useQuery([Queries.BountySubmissions, userId], () => find(), {
  //   enabled,
  // });
  return {
    submissions: [],
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useCanUserSubmit = (
  userId: string,
  bountyId: string,
  enabled = true
) => {
  // const { data, isLoading, error } = useQuery(
  //   ['Can user submit', userId, bountyId],
  //   () => Moralis_canSubmit(userId, bountyId),
  //   { enabled }
  // );

  return {
    data: false,
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useSubmitterInfo = (
  submitterId: string,
  bountyId: string,
  enabled = true
) => {
  // const { data, isLoading, error } = useQuery(
  //   ['submitterInfo', submitterId, bountyId],
  //   () => Moralis_submitterInfo(submitterId, bountyId),
  //   { enabled }
  // );

  return {
    data: undefined,
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useGetSubmissions = (config: any, enabled = true) => {
  // const { isInitialized } = useMoralis();
  // const page = config.page || 0;
  // const { fetch } = Moralis_useGetSubmissions(config);

  // const [numOfPages, setNumOfPages] = useState(0);

  // const queryId = [Queries.AllSubmissions, config, config.page];

  // const { error, isLoading, data, isFetching, isPreviousData } = useQuery(
  //   queryId,
  //   () => {
  //     return fetch();
  //   },
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
    submissions: [],
    isFetching: false,
    page: 0,
    numOfPages: 0,
    count: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isPreviousData: false,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};
