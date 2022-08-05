import { useMemo, useState } from 'react';

import { SubmissionState } from '@/lib/models';
import { Order } from '@/lib/models/queries/Order';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';

import { useAdminReview } from '@/components/pages/admin/submissions/ReviewContext';
import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown from '@/components/utils/Dropdown';
import Icon, { IconSize } from '@/components/utils/Icon';
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

  return (
    <div className="flex items-center gap-8 py-4 border-b-2 border-surface sticky top-16 bg-bg z-20">
      <div className="text-center  text-main-light rounded-full label-sm">
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
        options={[['All', 'All'], ...Object.entries(SubmissionState)].map(
          (entry) => {
            return { label: entry[1] };
          }
        )}
        onSelect={({ label: newState }) => {
          const isAState = Object.entries(SubmissionState).find(
            (entry) => entry[1] === newState
          );
          if (isAState) {
            setQuery({
              ...query,
              states: [newState as SubmissionState],
              page: 0,
            });
          } else {
            setQuery({
              ...query,
              states: [],
              page: 0,
            });
          }
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
            className="flex items-center gap-2 border rounded-full py-2 px-4 group"
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
            <div className="body-sm flex gap-1 items-center">
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
            className="body-sm font-medium w-full bg-bg border-0 focus:ring-0 border-b focus:border-main"
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
            className="grow shrink-0 text-center border bg-main border-bg text-on-color py-2 px-8 rounded-full label-sm"
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
  } = useAdminReview();

  return (
    <div className="space-y-10 min-h-screen">
      <>
        {submissions.length > 0 &&
          submissions.map((s, i) => {
            return (
              <div key={i} className="flex items-center gap-4 -translate-x-5">
                <span className="label text-on-surface-disabled">
                  {(i + 1) * (page > 0 ? page : 1)}
                </span>
                <SubmissionListEntry submission={s} />
              </div>
            );
          })}
      </>

      <>
        {submissions.length === 0 && (
          <div className="label text-on-surface-unactive">
            No submissions matches your filters
            <div className="mt-4 border border-on-surface-disabled rounded p-4">
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
      <div className="bg-bg sticky bottom-0 pt-2 pb-2 border-t border-surface-dark">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="flex items-center gap-8 justify-between">
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

            <div className="flex grow items-center gap-4 justify-center">
              {!isLoading &&
                pages.map((page, i) => {
                  const isTheCurrentPage = currPage === page;
                  return (
                    <button
                      key={i}
                      className={`shrink-0 label p-2 bg-bg border-b-2  hover:bg-surface rounded-sm disabled:hover:bg-bg disabled:cursor-default cursor-pointer ${
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
          className="body-sm w-full bg-bg border-0 focus:ring-0 border-b focus:border-main"
        />
      </div>
    </>
  );
}
