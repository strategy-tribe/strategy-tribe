import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  Moralis_getReviews,
  Moralis_useSaveReview,
  ReviewsQueryParams,
} from '@/lib/moralis/serverMethods/Moralis_Reviews';

import { Submission, SubmissionState } from '@/models/index';

import Queries from '../utils/Queries';

export const useSubmitReview = (
  grade: SubmissionState.Accepted | SubmissionState.Rejected,
  submission: Submission,
  reviewerId: string,
  reviewerComment?: string,
  onSuccess?: () => void,
  onError?: (e: any) => void
) => {
  const q = useQueryClient();
  const { save } = Moralis_useSaveReview(
    grade,
    submission,
    reviewerId,
    reviewerComment
  );

  const { mutate } = useMutation(() => save(), {
    onSuccess: () => {
      q.invalidateQueries();
      if (onSuccess) onSuccess();
    },
    onError,
  });

  return {
    SubmitReview: mutate,
  };
};
export const useGetReviews = (config: ReviewsQueryParams, enabled = true) => {
  const { isInitialized } = useMoralis();
  const page = config.page || 0;
  const { fetch } = Moralis_getReviews(config);

  const [numOfPages, setNumOfPages] = useState(0);

  const queryId = [Queries.Reviews, config, config.page];

  const { error, isLoading, data, isFetching, isPreviousData } = useQuery(
    queryId,
    () => fetch(),
    {
      getPreviousPageParam: (lastPackage) => {
        const { hasLess, page } = lastPackage;
        if (hasLess) return page - 1;
        else return false;
      },
      getNextPageParam: (lastPackage) => {
        const { hasMore, page } = lastPackage;
        if (hasMore) return page + 1;
        else return false;
      },
      enabled: isInitialized && enabled,
      keepPreviousData: config.paginate,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data && config.pageSize && config.paginate) {
      const { count } = data;
      const _numOfPages = Math.floor((count - 1) / config.pageSize + 1);

      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config]);

  return {
    isLoading,
    reviews: data?.reviews || [],
    isFetching,
    page,
    numOfPages,
    count: data?.count,
    hasNextPage: data?.hasMore,
    hasPreviousPage: data?.hasLess,
    isPreviousData,
    error,
  };
};
