import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';

import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { kFormatter } from '@/lib/utils/NumberHelpers';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon, { IconSize } from '@/components/utils/Icon';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

import { Searchbar } from '../../search/Searchbar';
import { useExploreContext } from '../ExploreContext';
import { DEFAULT_FILTERS } from './DefaultFilter';
import { OrderByFilter, StateFilter, TagsFilter, TypeFilter } from './Filters';

export function ExploreFilters() {
  const { urlFilter, setUrlFilter } = useUrlSearchParams();

  const { bountyFetch, countries, removeCountry } = useExploreContext();

  const isLoading = bountyFetch?.isLoading ?? true;
  const count = bountyFetch?.count ?? 0;

  function setSearch(s: string) {
    setUrlFilter({ search: s, page: 0 });
  }

  function resetOrgFromQuery() {
    setUrlFilter({ targetNames: [] });
  }

  const [showFilters, setShowFilters] = useState(false);

  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent} className="space-y-4">
      <div className="flex justify-end">
        <Searchbar
          searchTerm={urlFilter.query.search || ''}
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
                <button onClick={() => setUrlFilter({}, { type: filter.type })}>
                  {filter.type}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-6 py-1">
          <div className="flex items-center gap-4">
            {countries?.map((country, i) => {
              return (
                <button
                  onClick={() => removeCountry(country)}
                  className="group flex items-center gap-2 rounded-full border py-1 pl-3 pr-4"
                  key={i}
                >
                  <div className="grid place-items-center group-hover:text-error-light">
                    <Icon icon="close" size={IconSize.Small} />
                  </div>
                  <span className="label-sm">{country}</span>
                </button>
              );
            })}

            {urlFilter.query.search && (
              <div className="flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4">
                <button
                  onClick={() => setSearch('')}
                  className="grid place-items-center"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
                <span className="label-sm">{urlFilter.query.search}</span>
              </div>
            )}

            {urlFilter.query.orgName && (
              <div className="flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4">
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

          <button
            className="label flex min-w-[7rem] items-center justify-end gap-2 text-right text-on-surface-p1 hover:text-main-light"
            onClick={() => setShowFilters((p) => !p)}
          >
            <Icon icon="tune" size={IconSize.Small} />
            {showFilters ? 'Hide filters' : 'Show filters'}
          </button>
        </div>
      </div>

      {showFilters && <Filters />}
    </div>
  );
}

function Filters() {
  const [state, setState] = useState<GetBountiesParams>({});
  //apply filters
  function changeState(newState: Partial<GetBountiesParams>) {
    setState((p) => ({ ...p, ...newState }));
  }

  // console.log(state);
  return (
    <div className="max-h-[35rem w-full rounded bg-surface-dark px-4 py-6">
      <div className="flex gap-16">
        <OrderByFilter
          orderBy={state.orderBy}
          select={(orderBy) => {
            changeState({ orderBy });
          }}
          remove={() => {
            changeState({ orderBy: undefined });
          }}
        />
        <TypeFilter
          types={state.types ?? []}
          select={(type) => {
            if (state.types?.includes(type)) return;
            const types = (state.types ?? []).concat(type);
            changeState({ types });
          }}
          remove={(type) => {
            const types = state.types?.filter((t) => t !== type);
            changeState({ types });
          }}
        />
        <StateFilter
          states={state.states ?? []}
          select={(s) => {
            if (state.states?.includes(s)) return;
            const states = (state.states ?? []).concat(s);
            changeState({ states });
          }}
          remove={(s) => {
            const states = state.states?.filter((t) => t === s);
            changeState({ states });
          }}
        />
        <TagsFilter filters={state} setFilters={changeState} />
        {/* <RewardsFilter /> */}
      </div>
      <pre className="label-sm">{JSON.stringify(state, null, 2)}</pre>
      <div className="flex w-full items-end justify-end">
        <Button
          info={{
            style: ButtonStyle.Filled,
            label: 'Apply filters',
            icon: 'arrow_forward',
          }}
        />
      </div>
    </div>
  );
}
