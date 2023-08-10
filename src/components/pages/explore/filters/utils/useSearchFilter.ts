import { useEffect, useState } from 'react';

import { trpc } from '@/lib/trpc';

export function useSearchFilter(search: string) {
  const debouncedSearchTerm = useDebounce(search, 500);

  const { data, isLoading, error } = trpc.bounty.getFilterTags.useQuery(
    {
      search: debouncedSearchTerm,
    },
    {
      enabled: !!debouncedSearchTerm && !!search,
    }
  );

  return {
    results: data?.results ?? [],
    isLoading,
    error,
  };
}

/**  @param delay milliseconds of delay  */
function useDebounce<TVal>(value: TVal, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<TVal>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
