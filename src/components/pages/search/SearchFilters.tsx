import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { useEffect } from 'react';
import { BountyQueryParams } from '@/lib/models/queries/BountyQueryParams';
import { FilterMenu } from '@/components/filters/FilterMenu';
import Icon from '@/components/utils/Icon';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export function SearchFilters({
  className,
  query,
  setQuery,
  search,
  showFilters,
  setshowFilters,
}: {
  className?: string;
  search: string;
  query: BountyQueryParams;
  setQuery: (q: BountyQueryParams) => void;
  showFilters: boolean;
  setshowFilters: (s: boolean) => void;
}) {
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 1200) {
      setshowFilters(true);
    } else setshowFilters(false);
  }, [width]);

  function manageNewQuery(newQ: BountyQueryParams) {
    const newQ2 = { ...newQ, searchTerm: search };
    setQuery(newQ2);
  }

  return (
    <>
      {showFilters && (
        <div className="z-50 bg-black p-8 laptop:p-0 rounded-2xl laptop:rounded-none overflow-hidden max-w-lg mx-auto border-2 border-purpleDark laptop:border-0">
          <button
            className="flex laptop:hidden items-center justify-between w-full"
            onClick={() => setshowFilters(!showFilters)}
          >
            <span className="label">Filters</span>
            <Icon icon="close" />
          </button>
          <div
            className={`${
              !showFilters && 'hidden'
            } space-y-4 ${className} pb-8 mb-8  laptop:pb-0 laptop:mb-0 laptop:border-0`}
          >
            <div className="hidden laptop:block">
              <Title title="Filters" />
            </div>
            <FilterMenu query={query} setQuery={manageNewQuery} />
          </div>
        </div>
      )}
    </>
  );
}
