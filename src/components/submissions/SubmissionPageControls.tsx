import { useEffect, useMemo, useState } from 'react';

import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';

import { Button, ButtonStyle } from '../utils/Button';

const AMOUNT_OF_PAGES = 10;

interface SubmissionPageControlsInterface {
  numOfPages: number;
  currPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  query: any;
  setQuery: (q: any) => void;
}

export function SubmissionPageControls({
  config,
}: {
  config: SubmissionPageControlsInterface;
}) {
  const {
    query,
    setQuery,
    isLoading,
    numOfPages,
    currPage,
    hasPreviousPage,
    hasNextPage,
  } = config;

  const { width } = useWindowDimensions();
  const [pagesPerScreen, setPagesPerScreen] = useState(AMOUNT_OF_PAGES);

  useEffect(() => {
    if (width < 400) {
      setPagesPerScreen(4);
    } else setPagesPerScreen(AMOUNT_OF_PAGES);
  }, [width, setPagesPerScreen]);

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

  function nextPage() {
    if (!hasNextPage) return;
    const newLocal = { ...query, page: currPage + 1 };
    setQuery(newLocal);
  }

  function prevPage() {
    if (!hasPreviousPage) return;

    setQuery({ ...query, page: currPage - 1 });
  }

  function goToPage(page: number) {
    if (page < 0 || page > AMOUNT_OF_PAGES) throw 'wrong number!';

    setQuery({ ...query, page });
  }

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
                labelClasses: 'hidden tablet:block',
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
                labelClasses: 'hidden tablet:block',
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
              amount: parseInt(x) || 0,
              page: 0,
            });
          }}
          className="body-sm w-full border-0 border-b bg-bg focus:border-main focus:ring-0"
        />
      </div>
    </>
  );
}
