import React from 'react';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { QueryParams } from '@/lib/models';
import { DEFAULT_FILTERS } from './DefaultFilter';
import { useExploreContext } from '../ExploreContext';
import { kFormatter } from '@/lib/utils/NumberHelpers';
import Icon, { IconSize } from '@/components/utils/Icon';

export function ExploreFilters() {
  const { query, setQuery } = useUrlSearchParams();

  const {
    bountyFetch: { count, isLoading },
    countries,
    removeCountry,
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

      <div className="flex items-center gap-6 py-1">
        <div className="flex gap-4 items-center">
          {countries?.map((country, i) => {
            return (
              <div
                className="border-[1px] rounded-full py-1 pl-3 pr-4 flex gap-2 items-center"
                key={i}
              >
                <button
                  onClick={() => removeCountry(country)}
                  className="grid place-items-center"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
                <span className="label-sm">{country}</span>
              </div>
            );
          })}
        </div>

        <span
          className={`label text-unactive ${
            isLoading ? 'invisible' : 'visible'
          }`}
        >
          {kFormatter(count || 0)} bounties
        </span>
      </div>
    </div>
  );
}

function compareQueries(q1: QueryParams, q2: QueryParams) {
  try {
    const keyIndex = 0;
    const valueIndex = 1;
    const keys1 = Object.entries(q1);
    const keys2 = Object.entries(q2);

    const biggest = keys1.length > keys2.length ? keys1 : keys2;
    const smallest = keys1.length > keys2.length ? keys2 : keys1;

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

    return same;
  } catch (error) {
    return false;
  }
}
