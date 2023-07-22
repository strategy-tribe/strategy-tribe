import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useGetSolutions } from '@/lib/hooks/solutionHooks';
import { GoToNewSolutionPage } from '@/lib/utils/Routes';

import { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { useAuth } from '@/auth/AuthContext';

import { SolutionListItem } from './SolutionListItem';

export function SolutionList() {
  const { isAdmin, isStaff } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState<any>({
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    solutions,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetSolutions(query);

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
        {!solutions ? (
          <Title
            title="Solutions will show up here"
            useBorder={false}
            big={true}
          />
        ) : (
          <Title
            title={`Solutions (${solutions.length}/${count})`}
            useBorder={false}
            big={true}
          />
        )}

        {(isAdmin || isStaff) && (
          <div className="flex space-x-8">
            <button
              onClick={() => router.push(GoToNewSolutionPage())}
              className="label rounded bg-surface py-2 px-5 hover:bg-main"
            >
              Add New
            </button>
            {/* <Dropdown
              defaultOptionIndex={0}
              labelClass="border-2 p-2 border-main rounded-md"
              options={options}
              onSelect={({ label: newState }) => {
                setQuery({
                  ...query,
                  publish: getStatus(newState),
                });
              }}
            /> */}
          </div>
        )}
      </div>

      <div className="grid-cols- gap-8 tablet:grid">
        {solutions &&
          solutions?.map((solution) => {
            return <SolutionListItem key={solution.id} solution={solution} />;
          })}
      </div>
      {isLoading && <Loading small />}

      {!isLoading && solutions && solutions.length > 0 && (
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
