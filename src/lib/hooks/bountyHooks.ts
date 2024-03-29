import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { trpc } from '@/lib/trpc';

import { DeleteBountyParams } from '@/server/routes/bounties/deleteBounty';
import { EditBountyParams } from '@/server/routes/bounties/editbounty';
import {
  GetBountiesParams,
  SmallBounty,
} from '@/server/routes/bounties/getBounties';
import {
  FullBounty,
  GetFullBountyParams,
} from '@/server/routes/bounties/getFullBounty';
import { PostBountiesParams } from '@/server/routes/bounties/postBounties';

//!Get All
export const useGetBounties = (config: GetBountiesParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { error, isLoading, data, isFetching } =
    trpc.bounty.getBounties.useQuery(config, {
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

  const bounties: SmallBounty[] = data?.bounties ?? [];

  return {
    isLoading,
    bounties,
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

export const useGetFullBounty = (
  config: GetFullBountyParams,
  enabled = true
) => {
  const { error, isLoading, data } = trpc.bounty.getFullBounty.useQuery(
    config,
    { enabled }
  );

  return {
    bounties: data?.bounties ?? [],
    error,
    isLoading,
  };
};

export const useAddBounties = (events: {
  onMutate: () => void;
  onSuccess: (data: {
    targets: string;
    orgs: string;
    errors: string[];
    totalData: number;
  }) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.bounty.postBounties.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess(data);
    },
  });

  return {
    Add: async (params: PostBountiesParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useEditBounty = (events: {
  onMutate: () => void;
  onSuccess: (data: FullBounty) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.bounty.editBounty.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess(data);
    },
  });

  return {
    Edit: async (params: EditBountyParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useDeleteBounty = (events: {
  onMutate: () => void;
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.bounty.deleteBounty.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess();
    },
  });

  return {
    Delete: async (params: DeleteBountyParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
