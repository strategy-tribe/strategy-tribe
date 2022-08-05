import { useEffect, useMemo, useState } from 'react';

import { useScrollToTop } from '@/hooks/useScrollTo';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';

import { Button, ButtonStyle } from '@/components/utils/Button';
import { IconSize } from '@/components/utils/Icon';

import { ArrayOfNumbers } from '@/utils/ArrayHelpers';

import { useExploreContext } from '../explore/ExploreContext';

export function PageControls() {
  const { bountyFetch } = useExploreContext();

  const numOfPages = bountyFetch?.numOfPages ?? 0;
  const currPage = bountyFetch?.page ?? 0;
  const hasPreviousPage = bountyFetch?.hasPreviousPage ?? false;
  const isFetching = bountyFetch?.isFetching ?? true;

  const isLoading = bountyFetch?.isLoading ?? true;
  const hasNextPage = bountyFetch?.hasNextPage ?? false;

  const { setUrlFilter, urlFilter } = useUrlSearchParams();

  function nextPage() {
    setUrlFilter({
      page: urlFilter.query.page ? urlFilter.query.page + 1 : 0,
    });
  }

  function firstPage() {
    setUrlFilter({
      page: 0,
    });
  }

  function lastPage() {
    setUrlFilter({
      page: numOfPages,
    });
  }

  function prevPage() {
    setUrlFilter({ page: urlFilter.query.page ? urlFilter.query.page - 1 : 0 });
  }

  function goToPage(page: number) {
    setUrlFilter({ page });
  }

  //*num of numbers in screen
  const { width } = useWindowDimensions();
  const [amountOfPages, setAmountOfPages] = useState(10);

  useEffect(() => {
    if (width < 400) {
      setAmountOfPages(8);
    } else setAmountOfPages(10);
  }, [width, setAmountOfPages]);

  const scrollToTop = useScrollToTop(500);

  async function RunAndMoveToTop(move: () => void) {
    move();
    scrollToTop();
  }

  const pages: number[] = useMemo(() => {
    if (numOfPages === 0) return [];

    const dontFit = numOfPages > amountOfPages;
    const scrollPassed = amountOfPages / 2 > 0;

    const length = amountOfPages;
    const starts = dontFit && scrollPassed ? currPage - amountOfPages / 2 : 0;
    const maxNum = numOfPages;

    const _pages: number[] = ArrayOfNumbers(length, starts, maxNum);

    return _pages;
  }, [currPage, numOfPages, amountOfPages]);

  return (
    <div className="flex gap-5 flex-wrap justify-between pt-0">
      {currPage === 0 ? (
        <span></span>
      ) : (
        <Button
          info={{
            onClick: () => RunAndMoveToTop(firstPage),
            style: ButtonStyle.Text,
            iconSize: IconSize.Small,
            icon: 'first_page',
            removeMinWidth: true,
            removePadding: true,
            disabled: isFetching,
          }}
        />
      )}
      {hasPreviousPage && (
        <Button
          info={{
            onClick: () => RunAndMoveToTop(prevPage),
            style: ButtonStyle.Text,
            icon: 'chevron_left',
            removeMinWidth: true,
            removePadding: true,
            disabled: isFetching,
          }}
        />
      )}

      {!isLoading &&
        pages.map((page, i) => {
          const isTheCurrentPage = currPage === page;
          return (
            <button
              key={i}
              className={`shrink-0 label p-2 bg-bg border-b-2  hover:bg-surface rounded-sm disabled:hover:bg-bg disabled:cursor-default cursor-pointer ${
                isTheCurrentPage ? 'border-main' : 'border-bg'
              }`}
              onClick={() => RunAndMoveToTop(() => goToPage(page))}
              disabled={isTheCurrentPage}
            >
              {page + 1}
            </button>
          );
        })}

      {hasNextPage && (
        <Button
          info={{
            onClick: () => RunAndMoveToTop(nextPage),
            style: ButtonStyle.Text,
            icon: 'chevron_right',
            removeMinWidth: true,
            removePadding: true,
            disabled: isFetching,
          }}
        />
      )}
      {currPage === numOfPages ? (
        <> </>
      ) : (
        <Button
          info={{
            onClick: () => RunAndMoveToTop(lastPage),
            style: ButtonStyle.Text,
            icon: 'last_page',
            iconSize: IconSize.Small,
            removeMinWidth: true,
            removePadding: true,
            disabled: isFetching,
          }}
        />
      )}
    </div>
  );
}
