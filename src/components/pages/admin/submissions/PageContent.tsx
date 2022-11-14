import { SubmissionState } from '@prisma/client';
import { useMemo, useState } from 'react';

import { Order } from '@/lib/models/Order';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';

import { useAdminReview } from '@/components/pages/admin/submissions/ReviewContext';
import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';

export function ReviewDashboardHeader() {
  const { submissionFetch } = useAdminReview();

  return (
    <header className="space-y-1">
      <Title
        title={`Submissions (${submissionFetch.count})`}
        extraInfo="Submissions waiting to be reviewed"
      />
    </header>
  );
}

export function ReviewDashboardFilters() {
  const {
    query,
    setQuery,
    submissionFetch: { count },
  } = useAdminReview();

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(SubmissionState)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);
  return (
    <div className="sticky top-0 z-20 flex items-center gap-8 border-b-2 border-surface bg-bg py-4">
      <div className="label-sm rounded-full text-center text-main-light">
        {count} {count === 1 ? 'result' : 'results'}
      </div>

      <Button
        info={{
          style: ButtonStyle.Text,
          label:
            query.order === Order.Asc ? 'Old ones first' : 'New ones first',
          icon: 'date_range',
          removeMinWidth: true,
          iconSize: IconSize.Small,
          removePadding: true,
          onClick: () => {
            setQuery({
              ...query,
              order: query.order === Order.Asc ? Order.Desc : Order.Asc,
              page: 0,
            });
          },
        }}
      />

      <Dropdown
        defaultOptionIndex={1}
        options={options}
        onSelect={({ label: newState }) => {
          setQuery({
            ...query,
            state: newState as SubmissionState,
            page: 0,
          });
        }}
      />

      <ReviewDashboardSearchbar />
    </div>
  );
}

export function ReviewDashboardSearchbar() {
  const { query, setQuery } = useAdminReview();

  const [search, setSearch] = useState('');
  function hitSearch(clean = false) {
    setSearch('');
    const values = clean ? undefined : [search];
    setQuery({ ...query, owners: values });
  }

  return (
    <div className="grow-[10]">
      {query.owners && query.owners.at(0) && (
        <>
          <button
            className="group flex items-center gap-2 rounded-full border px-4 py-2"
            onClick={() => {
              setSearch('');
              hitSearch(true);
            }}
          >
            <Icon
              icon="close"
              size={IconSize.Small}
              className="group-hover:text-error-light"
            />
            <div className="body-sm flex items-center gap-1">
              <span className="text-left ">User ID:</span>

              <span className="group-hover:text-error-light">
                {query.owners.at(0)}
              </span>
            </div>
          </button>
        </>
      )}

      {(!query.owners || !query?.owners?.at(0)) && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="body-sm w-full border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
            placeholder="Search by user id"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                hitSearch();
              }
            }}
          />
          <button
            className="label-sm shrink-0 grow rounded-full border border-bg bg-main px-8 py-2 text-center text-on-color"
            onClick={() => hitSearch(false)}
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}

export function ReviewDashboardSubmissions() {
  const {
    submissionFetch: { submissions, page },
    query,
    isLoading,
  } = useAdminReview();

  return (
    <div className="min-h-screen space-y-10">
      <>
        {isLoading && <Loading small />}
        {submissions &&
          submissions.length > 0 &&
          submissions?.map((s, i) => {
            return (
              <div key={i} className="flex -translate-x-5 items-center gap-4">
                <span className="label text-on-surface-disabled">
                  {i + 1 + (page > 0 ? page : 0) * (query?.amount ?? 10)}
                </span>
                <SubmissionListEntry submission={s} />
              </div>
            );
          })}
      </>

      <>
        {submissions && submissions.length === 0 && (
          <div className="label text-on-surface-unactive">
            No submissions matches your filters
            <div className="mt-4 rounded border border-on-surface-disabled p-4">
              <span>query:</span>
              <pre className="pt-2">{JSON.stringify(query, null, 2)}</pre>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export function ReviewDashboardPageControls() {
  const {
    submissionFetch: {
      numOfPages,
      page: currPage,
      hasNextPage,
      hasPreviousPage,
      isLoading,
    },
    query,
    prevPage,
    nextPage,
    goToPage,
    amountOfPages: pagesPerScreen,
    setQuery,
  } = useAdminReview();

  const pages: number[] = useMemo(() => {
    if (numOfPages === 0) return [];

    const dontFit = numOfPages > pagesPerScreen;
    const scrollPassed = pagesPerScreen / 2 > 0;

    const length = pagesPerScreen;
    const starts = dontFit && scrollPassed ? currPage - pagesPerScreen / 2 : 0;
    const maxNum = numOfPages;

    const _pages: number[] = ArrayOfNumbers(length, starts, maxNum);

    return _pages;
  }, [currPage, numOfPages, pagesPerScreen]);

  return (
    <>
      <div className="sticky bottom-0 border-t border-surface-dark bg-bg pt-2 pb-2">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="flex items-center justify-between gap-8">
            {/* Prev */}
            <Button
              info={{
                onClick: prevPage,
                label: 'Prev page',
                icon: 'arrow_back',
                style: ButtonStyle.Text,
                removeMinWidth: true,
                removePadding: true,
                disabled: !hasPreviousPage,
              }}
            />

            <div className="flex grow items-center justify-center gap-4">
              {!isLoading &&
                pages.map((page, i) => {
                  const isTheCurrentPage = currPage === page;
                  return (
                    <button
                      key={i}
                      className={`label shrink-0 cursor-pointer rounded-sm border-b-2  bg-bg p-2 hover:bg-surface disabled:cursor-default disabled:hover:bg-bg ${
                        isTheCurrentPage ? 'border-main' : 'border-bg'
                      }`}
                      onClick={() => goToPage(page)}
                      disabled={isTheCurrentPage}
                    >
                      {page + 1}
                    </button>
                  );
                })}
            </div>

            {/* Next */}
            <Button
              info={{
                onClick: nextPage,
                label: 'Next page',
                icon: 'arrow_forward',
                style: ButtonStyle.Text,
                removeMinWidth: true,
                removePadding: true,
                disabled: !hasNextPage,
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-on-surface-unactive ">
        <label htmlFor="pagesize" className="body-sm">
          Page size
        </label>
        <input
          name="pagesize"
          id="pagesize"
          type="number"
          placeholder="page Size"
          value={query.amount}
          onChange={(e) => {
            const x = e.target.value;
            setQuery({
              ...query,
              amount: parseInt(x) ?? 0,
              page: 0,
            });
          }}
          className="body-sm w-full border-0 border-b bg-bg focus:border-main focus:ring-0"
        />
      </div>
    </>
  );
}
