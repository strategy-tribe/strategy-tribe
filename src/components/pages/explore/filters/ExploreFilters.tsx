import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { kFormatter } from '@/lib/utils/NumberHelpers';

import Icon, { IconSize } from '@/components/utils/Icon';

import { Searchbar } from '../../search/Searchbar';
import { useExploreContext } from '../ExploreContext';
import { DEFAULT_FILTERS } from './DefaultFilter';

export function ExploreFilters() {
  const { urlFilter, setUrlFilter: setUrlFilter } = useUrlSearchParams();

  const { bountyFetch, countries, removeCountry } = useExploreContext();

  const isLoading = bountyFetch?.isLoading ?? true;
  const count = bountyFetch?.count ?? 0;

  function setSearch(s: string) {
    setUrlFilter({ search: s, page: 0 });
  }

  function resetOrgFromQuery() {
    setUrlFilter({ relatedTo: [] });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Searchbar
          searchTerm={urlFilter.query.searchTerm || ''}
          search={(s) => {
            setSearch(s);
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-6">
        <ul className="flex gap-6">
          {DEFAULT_FILTERS.map((filter, i) => {
            const opacity =
              urlFilter.type === filter.type
                ? ''
                : 'opacity-50 hover:opacity-90';
            return (
              <li key={i} className={`${opacity}`}>
                <button onClick={() => setUrlFilter({ type: filter.type })}>
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
                <button
                  onClick={() => removeCountry(country)}
                  className="border rounded-full py-1 pl-3 pr-4 flex gap-2 items-center group"
                  key={i}
                >
                  <div className="grid place-items-center group-hover:text-error-light">
                    <Icon icon="close" size={IconSize.Small} />
                  </div>
                  <span className="label-sm">{country}</span>
                </button>
              );
            })}

            {urlFilter.query.searchTerm && (
              <div className="border-[1px] rounded-full py-1 pl-3 pr-4 flex gap-2 items-center">
                <button
                  onClick={() => setSearch('')}
                  className="grid place-items-center"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
                <span className="label-sm">{urlFilter.query.searchTerm}</span>
              </div>
            )}

            {urlFilter.query.orgName && (
              <div className="border-[1px] rounded-full py-1 pl-3 pr-4 flex gap-2 items-center">
                <button
                  onClick={resetOrgFromQuery}
                  className="grid place-items-center"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
                <span className="label-sm">{urlFilter.query.orgName}</span>
              </div>
            )}
          </div>

          <span
            className={`label text-on-surface-unactive ${
              isLoading ? 'invisible' : 'visible'
            }`}
          >
            {kFormatter(count || 0)} bounties
          </span>
        </div>
      </div>
    </div>
  );
}
