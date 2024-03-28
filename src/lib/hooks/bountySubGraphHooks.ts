import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { trpc } from '@/lib/trpc';

import { EnrichDataParams } from '@/server/routes/submissionGraph/enrichData';
import {
  GetSubmissionGraphsParams,
  SmallSubmissionGraph,
} from '@/server/routes/submissionGraph/getBountySubGraphs';
import { PostBountySubGraphParams } from '@/server/routes/submissionGraph/postBountySubGraph';

//!Get one
export const useGetSubmissionGraph = (slug: string, enabled = true) => {
  const { error, isLoading, data } = trpc.bounty.getBountySubGraph.useQuery(
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

//!Get All
export const useGetSubmissionGraphs = (
  config: GetSubmissionGraphsParams,
  enabled = true
) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { error, isLoading, data, isFetching } =
    trpc.bounty.getBountySubGraphs.useQuery(config, {
      enabled: enabled,
    });

  const count = data?.count;

  useEffect(() => {
    if (data && count && config.amount) {
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage(_numOfPages - 1 > (config?.page ?? _numOfPages));
      setHasPreviousPage((config?.page ?? 0) != 0);
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, count]);

  const submissionGraphs: SmallSubmissionGraph[] = data?.submissionGraphs ?? [];

  return {
    isLoading,
    submissionGraphs,
    isFetching: isFetching,
    page,
    numOfPages,
    count: count ?? 10,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};

export const useSubmitSubmissionGraph = (events: {
  onMutate: () => void;
  onSuccess: (submissionGraphId: string) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.bounty.postBountySubGraph.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess(data.submissionGraph);
    },
  });

  return {
    SubmitSubmissionGraph: async (params: PostBountySubGraphParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useEnrichDataPoints = (events: {
  onMutate: () => void;
  onSuccess: (enrichData: any) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.bounty.enrichData.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess(data);
    },
  });

  return {
    Enrich: async (params: EnrichDataParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
