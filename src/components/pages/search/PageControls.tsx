import { useEffect, useMemo, useState } from 'react';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { useScrollToTop } from '@/hooks/useScrollTo';
import { ArrayOfNumbers } from '@/utils/ArrayHelpers';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export function PageControls({
  numOfPages,
  currPage,
  goToPage,
  prevPage,
  nextPage,
  isFetching,
  hasPreviousPage,
  hasNextPage,
  isLoading,
}: {
  numOfPages: number;
  currPage: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  isFetching: boolean;
  isLoading: boolean;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
}) {
  //*num of numbers in screen
  const { width } = useWindowDimensions();
  const [amountOfPages, setAmountOfPages] = useState(10);

  useEffect(() => {
    if (width < 400) {
      setAmountOfPages(8);
    } else setAmountOfPages(10);
  }, [width, setAmountOfPages]);

  const scrollToTop = useScrollToTop();

  async function RunAndMoveToTop(move: (x?: any) => any) {
    await move();
    scrollToTop();
  }

  const pages: number[] = useMemo(() => {
    const moreThan = numOfPages > amountOfPages;
    const scrollPassed = currPage - amountOfPages / 2 > 0;
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
              className={`label p-2 bg-black border-b-2  hover:bg-dark rounded-sm disabled:hover:bg-black disabled:cursor-default cursor-pointer ${
                isTheCurrentPage ? 'border-purpleDark' : 'border-black'
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
