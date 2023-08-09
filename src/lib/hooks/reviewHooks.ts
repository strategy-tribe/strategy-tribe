import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { GetReviewsParams } from '@/server/routes/review/getReviews';
import {
  PostReviewParams,
  PostReviewResponse,
} from '@/server/routes/review/postReview';

import { trpc } from '../trpc';

export const useSubmitReview = (events: {
  onMutate: () => void;
  onSuccess: (data: PostReviewResponse) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.review.post.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess(data);
    },
  });

  return {
    SubmitReview: async (params: PostReviewParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useGetReviews = (config: GetReviewsParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.review.getReviews.useQuery(config, {
      enabled,
    });

  useEffect(() => {
    if (data && data.count && config.amount) {
      const count = data.count;
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage(_numOfPages - 1 > (config?.page ?? _numOfPages));
      setHasPreviousPage((config?.page ?? 0) != 0);
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, data?.count]);

  return {
    isLoading,
    reviews: data?.reviews,
    isFetching,
    page,
    numOfPages,
    count: data?.count,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};
