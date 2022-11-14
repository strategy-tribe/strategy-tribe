import { useEffect, useMemo, useState } from 'react';

import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';

import { useExploreUrl } from '@/components/pages/explore/useExploreUrl';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { IconSize } from '@/components/utils/Icon';

import { useExploreContext } from './ExploreContext';

export function PageControls() {
  const { bountyFetch } = useExploreContext();

  const numOfPages = bountyFetch?.numOfPages ?? 0;
  const currPage = bountyFetch?.page ?? 0;
  const hasPreviousPage = bountyFetch?.hasPreviousPage ?? false;
  const isFetching = bountyFetch?.isFetching ?? true;

  const isLoading = bountyFetch?.isLoading ?? true;
  const hasNextPage = bountyFetch?.hasNextPage ?? false;

  const { setUrlFilter, urlFilter } = useExploreUrl();

  function nextPage() {
    setUrlFilter(
      {
        page: urlFilter.query.page ? urlFilter.query.page + 1 : 0,
      },
      { scroll: true }
    );
  }

  function firstPage() {
    setUrlFilter(
      {
        page: 0,
      },
      { scroll: true }
    );
  }

  function lastPage() {
    setUrlFilter(
      {
        page: numOfPages - 1,
      },
      { scroll: true }
    );
  }

  function prevPage() {
    setUrlFilter(
      { page: urlFilter.query.page ? urlFilter.query.page - 1 : 0 },
      { scroll: true }
    );
  }

  function goToPage(page: number) {
    setUrlFilter({ page }, { scroll: true });
  }

  //*num of numbers in screen
  const { width } = useWindowDimensions();
  const [amountOfPages, setAmountOfPages] = useState(10);

  useEffect(() => {
    if (width < 400) {
      setAmountOfPages(8);
    } else setAmountOfPages(10);
  }, [width, setAmountOfPages]);

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
    <div className="flex flex-wrap justify-between gap-5 pt-0">
      {currPage === 0 ? (
        <span></span>
      ) : (
        <Button
          info={{
            onClick: () => firstPage(),
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
            onClick: () => prevPage(),
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

      {hasNextPage && (
        <Button
          info={{
            onClick: () => nextPage(),
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
            onClick: () => lastPage(),
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
