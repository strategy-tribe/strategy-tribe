import React from 'react';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { QueryParams } from '@/lib/models';
import { DEFAULT_FILTERS } from './DefaultFilter';
import { useExploreContext } from '../ExploreContext';
import { kFormatter } from '@/lib/utils/NumberHelpers';

export function ExploreFilters() {
  const { query, setQuery } = useUrlSearchParams();
  const {
    bountyFetch: { count },
  } = useExploreContext();

  return (
    <div className="flex items-center justify-between gap-6">
      <ul className="flex gap-6">
        {DEFAULT_FILTERS.map((filter, i) => {
          const opacity = compareQueries(query, filter.query)
            ? ''
            : 'opacity-50 hover:opacity-90';
          return (
            <li key={i} className={`${opacity}`}>
              <button onClick={() => setQuery(filter.query)}>
                {filter.type}
              </button>
            </li>
          );
        })}
      </ul>

      <span className="label text-unactive">
        {kFormatter(count || 0)} bounties
      </span>
    </div>
  );
}

function compareQueries(q1: QueryParams, q2: QueryParams) {
  const keyIndex = 0;
  const valueIndex = 1;
  const keys1 = Object.entries(q1);
  const keys2 = Object.entries(q2);

  const biggest = keys1.length > keys2.length ? keys1 : keys2;
  const smallest = keys1.length < keys2.length ? keys1 : keys2;
  let same = true;
  biggest.forEach((pair) => {
    if (!same) return;
    const key = pair.at(keyIndex) as string;
    const value = pair.at(valueIndex);

    const otherEntries = smallest.find((entry) => entry.at(keyIndex) === key);
    if (otherEntries) {
      const otherValue = otherEntries?.at(valueIndex);
      same = otherValue === value;
    }
  });

  console.log(q1.orderBy, q2.orderBy, same);
  return same;
}
