import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useGetArticles } from '@/lib/hooks/articleHooks';
import { GoToNewArticlePage } from '@/lib/utils/Routes';

import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { useAuth } from '@/auth/AuthContext';

import { ArticleListItem } from './ArticleListItem';

export function ArticleList() {
  const { isAdmin, isStaff } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState<any>({
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    articles,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetArticles(query);

  // TODO: Add filter options
  const options = useMemo(() => {
    return ['All', 'Published', 'Unpublished'].map((entry) => {
      return { label: entry } as HasLabel;
    });
  }, []);

  const getStatus = (newState: string) => {
    switch (newState) {
      case 'All':
        return undefined;
      case 'Published':
        return true;
      case 'Unpublished':
        return false;
      default:
        break;
    }
  };

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between border-b-1 border-surface pb-4">
        {!articles ? (
          <Title
            title="Articles will show up here"
            useBorder={false}
            big={true}
          />
        ) : (
          <Title
            title={`Articles (${articles.length}/${count})`}
            useBorder={false}
            big={true}
          />
        )}

        {(isAdmin || isStaff) && (
          <div className="flex space-x-8">
            <button
              onClick={() => router.push(GoToNewArticlePage())}
              className="label rounded bg-surface py-2 px-5 hover:bg-main"
            >
              Add New
            </button>
            <Dropdown
              defaultOptionIndex={0}
              labelClass="border-2 p-2 border-main rounded-md"
              options={options}
              onSelect={({ label: newState }) => {
                setQuery({
                  ...query,
                  statuses: getStatus(newState),
                });
              }}
            />
          </div>
        )}
      </div>

      <div className="space-y-10">
        {articles &&
          articles?.map((article) => {
            return (
              <ArticleListItem
                key={article.slug}
                article={article}
              ></ArticleListItem>
            );
          })}
      </div>
      {isLoading && <Loading small />}

      {!isLoading && articles && articles.length > 0 && (
        <PageControls
          config={{
            query,
            setQuery,
            numOfPages,
            currPage,
            hasNextPage,
            hasPreviousPage,
            isLoading,
          }}
        />
      )}
    </section>
  );
}
