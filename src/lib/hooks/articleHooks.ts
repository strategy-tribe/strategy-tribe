import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { GetArticlesSchemaParams } from '@/server/routes/articles/getArticles';
import { PostArticleParams } from '@/server/routes/articles/postArticle';

import { trpc } from '../trpc';

export const useSubmitArticle = (events: {
  onMutate: () => void;
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.article.post.useMutation({
    onMutate,
    onError,
    onSuccess: () => {
      qc.invalidateQueries();
      onSuccess();
    },
  });

  return {
    SubmitArticle: async (params: PostArticleParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useGetArticles = (
  config: GetArticlesSchemaParams,
  enabled = true
) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.article.getArticles.useQuery(config, {
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
    ...data,
    isLoading,
    isFetching,
    page,
    numOfPages,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};

//!Get one
export const useGetArticle = (slug: string, enabled = true) => {
  const { error, isLoading, data } = trpc.article.getArticle.useQuery(
    {
      slug,
    },
    { enabled }
  );

  return {
    article: data?.article ?? undefined,
    error,
    isLoading,
  };
};
