import { useEffect, useMemo, useState } from 'react';

import { useScrollToTop } from '@/hooks/useScrollTo';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';

import { Button, ButtonStyle } from '@/components/utils/Button';

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

  const { setQuery, query } = useUrlSearchParams();

  function nextPage() {
    setQuery({ ...query, page: (query.page || 0) + 1, paginate: true });
  }

  function prevPage() {
    setQuery({ ...query, page: (query.page || 0) - 1, paginate: true });
  }

  function goToPage(page: number) {
    setQuery({ ...query, page, paginate: true });
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

  async function RunAndMoveToTop(move: (x?: any) => any) {
    await move();
    scrollToTop();
  }

  const pages: number[] = useMemo(() => {
    if (numOfPages === 0) return [];
    const moreThan = numOfPages > amountOfPages;
    const scrollPassed = -amountOfPages / 2 > 0;
    const _pages: number[] = ArrayOfNumbers(
      amountOfPages,
      moreThan && scrollPassed ? currPage - amountOfPages / 2 : 0,
      numOfPages
    );

    return _pages;
  }, [currPage, numOfPages, amountOfPages]);

  return (
    <div className="flex gap-4 flex-wrap justify-center laptop:justify-start pt-8 laptop:pt-0">
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
              className={`label p-2 bg-bg border-b-2  hover:bg-surface rounded-sm disabled:hover:bg-bg disabled:cursor-default cursor-pointer ${
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
    </div>
  );
}
