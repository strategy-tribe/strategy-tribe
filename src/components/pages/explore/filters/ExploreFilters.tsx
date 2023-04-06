import { useAutoAnimate } from '@formkit/auto-animate/react';
import router from 'next/router';
import { useMemo, useState } from 'react';

import { kFormatter } from '@/lib/utils/NumberHelpers';
import { GoToBountiesPage } from '@/lib/utils/Routes';

import { useExploreUrl } from '@/components/pages/explore/useExploreUrl';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon, { IconSize } from '@/components/utils/Icon';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

import { useExploreContext } from '../ExploreContext';
import { OrderByFilter, StateFilter, TagsFilter, TypeFilter } from './Filters';
import { BountiesFilter, DEFAULT_FILTERS } from './utils/DefaultFilter';
import { Searchbar as SearchBar } from './utils/Searchbar';

export function ExploreFilters({
  urlFilter,
  setUrlFilter,
  filters = DEFAULT_FILTERS,
  totalCount,
  countries,
  removeCountry,
}: {
  urlFilter?: BountiesFilter;
  setUrlFilter?: any;
  filters?: BountiesFilter[];
  totalCount?: number;
  countries?: string[];
  removeCountry?: (country: string) => void;
}) {
  const urlFilterConfig = useExploreUrl();
  if (!urlFilter || !setUrlFilter) {
    urlFilter = urlFilterConfig.urlFilter;
    setUrlFilter = urlFilterConfig.setUrlFilter;
  }

  const context = useExploreContext();

  if (!countries || !removeCountry) {
    countries = context.countries;
    removeCountry = context.removeCountry;
  }

  const isLoading = totalCount ? false : context.bountyFetch?.isLoading ?? true;
  const count = totalCount ?? context.bountyFetch?.count ?? 0;

  function setSearch(s: string | undefined) {
    setUrlFilter({ search: s, page: 0 });
  }

  function resetOrgFromQuery(removedOrg: string) {
    const orgNames = urlFilter?.query.orgName?.filter((o) => o !== removedOrg);
    setUrlFilter({
      orgName: orgNames && orgNames.length === 0 ? undefined : orgNames,
      page: 0,
    });
  }

  function resetTagFromQuery(removedTag: string) {
    const tags = urlFilter?.query.tags?.filter((o) => o !== removedTag);
    setUrlFilter({
      tags: tags && tags.length === 0 ? undefined : tags,
      page: 0,
    });
  }

  function resetTargetFromQuery(removedTarget: string) {
    const targets = urlFilter?.query.targetNames?.filter(
      (o) => o !== removedTarget
    );
    setUrlFilter({
      targetNames: targets && targets.length === 0 ? undefined : targets,
      page: 0,
    });
  }

  const [showFilters, setShowFilters] = useState(false);

  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <div ref={parent} className="space-y-4">
      <div className="flex justify-end">
        <SearchBar
          searchTerm={urlFilter.query.search || ''}
          search={(s) => {
            setSearch(s);
          }}
        />
      </div>

      <div className="max-w-full items-center justify-between gap-6 bt:flex">
        <ul className="flex gap-6 border-b-2 border-surface pb-2 bt:border-b-0 bt:pb-0">
          {filters.map((filter, i) => {
            const opacity =
              urlFilter?.type === filter.type
                ? ''
                : 'opacity-50 hover:opacity-90';
            return (
              <li key={i} className={`${opacity}`}>
                <button
                  onClick={() =>
                    setUrlFilter(filter.query, { type: filter.type })
                  }
                >
                  {filter.type}
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="mb-4 flex flex-wrap items-center gap-x-2 border-b-2
          border-surface bt:mb-0 bt:gap-x-4 bt:gap-y-2 bt:border-b-0"
        >
          {countries?.map((country, i) => {
            return (
              <div
                key={`${country}_${i}`}
                className="my-2 flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4 bt:my-0"
              >
                <Icon
                  size={IconSize.Small}
                  icon="place"
                  className=" text-on-surface-disabled"
                />
                <span className="label-sm">{country}</span>
                <button
                  onClick={() => {
                    if (removeCountry) removeCountry(country);
                  }}
                  className="grid place-items-center hover:text-error-light"
                  key={i}
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
              </div>
            );
          })}

          {urlFilter.query.search && (
            <div className="my-2 flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4 bt:my-0">
              <span className="label-sm">{urlFilter.query.search}</span>
              <button
                onClick={() => setSearch(undefined)}
                className="grid place-items-center hover:text-error-light"
              >
                <Icon icon="close" size={IconSize.Small} />
              </button>
            </div>
          )}

          {urlFilter.query.orgName &&
            urlFilter.query.orgName.map((o, i) => (
              <div
                key={`${o}_${i}`}
                className="my-2 flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4 bt:my-0"
              >
                <Icon
                  size={IconSize.Small}
                  icon="corporate_fare"
                  className=" text-on-surface-disabled"
                />
                <span className="label-sm">{o}</span>
                <button
                  onClick={() => resetOrgFromQuery(o)}
                  className="grid place-items-center hover:text-error-light"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
              </div>
            ))}

          {urlFilter.query.tags &&
            urlFilter.query.tags.map((t, i) => (
              <div
                key={`${t}_${i}`}
                className="my-2 flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4 bt:my-0"
              >
                <Icon
                  size={IconSize.Small}
                  icon="label"
                  className=" text-on-surface-disabled"
                />
                <span className="label-sm">{t}</span>
                <button
                  onClick={() => resetTagFromQuery(t)}
                  className="grid place-items-center hover:text-error-light"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
              </div>
            ))}

          {urlFilter.query.targetNames &&
            urlFilter.query.targetNames.map((tg, i) => (
              <div
                key={`${tg}_${i}`}
                className="my-2 flex items-center gap-2 rounded-full border-[1px] py-1 pl-3 pr-4 bt:my-0"
              >
                <Icon
                  size={IconSize.Small}
                  icon="person"
                  className=" text-on-surface-disabled"
                />
                <span className="label-sm">{tg}</span>
                <button
                  onClick={() => resetTargetFromQuery(tg)}
                  className="grid place-items-center hover:text-error-light"
                >
                  <Icon icon="close" size={IconSize.Small} />
                </button>
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <span
            className={`label text-on-surface-unactive ${
              isLoading ? 'invisible' : 'visible'
            }`}
          >
            {kFormatter(count || 0)} {count === 1 ? 'bounty' : 'bounties'}
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

      {showFilters && (
        <Filters
          hide={() => setShowFilters(false)}
          setUrlFilter={setUrlFilter}
          urlFilter={urlFilter}
        />
      )}
    </div>
  );
}

function Filters({
  hide,
  setUrlFilter,
  urlFilter,
}: {
  hide: () => void;
  urlFilter: BountiesFilter;
  setUrlFilter: any;
}) {
  const [state, setState] = useState<GetBountiesParams>(urlFilter.query);
  //apply filters
  function changeState(newState: Partial<GetBountiesParams>) {
    setState((p) => ({ ...p, ...newState }));
  }

  const amountOfFilters = useMemo(() => {
    const x = Object.values({
      ...state,
      order: undefined,
      page: undefined,
      amount: undefined,
      filterType: undefined,
    }).filter((val) => !!val);
    return x.length;
  }, [state]);

  const label = amountOfFilters === 1 ? 'filter' : 'filters';
  return (
    <div className="max-h-[35rem w-full rounded bg-surface-dark px-4 py-6">
      <div className="flex flex-wrap gap-16">
        <OrderByFilter
          orderBy={state.orderBy}
          select={(orderBy) => {
            changeState({ orderBy });
          }}
          remove={() => {
            changeState({ orderBy: undefined });
          }}
        />
        <StateFilter
          states={
            typeof state.states === 'string'
              ? [state.states]
              : state.states ?? []
          }
          select={(s) => {
            if (state.states?.includes(s)) return;
            const states = (state.states ?? []).concat(s);
            changeState({ states });
          }}
          remove={(s) => {
            const states = state.states?.filter((t) => t !== s) ?? [];
            changeState({ states: states.length > 0 ? states : undefined });
          }}
        />
        <TypeFilter
          types={
            typeof state.types === 'string' ? [state.types] : state.types ?? []
          }
          select={(type) => {
            if (state.types?.includes(type)) return;
            const types = [type].concat(state.types ?? []);
            changeState({ types });
          }}
          remove={(type) => {
            const types = state.types?.filter((t) => t !== type) ?? [];
            changeState({ types: types.length > 0 ? types : undefined });
          }}
        />
        <TagsFilter filters={state} setFilters={changeState} />
        {/* <RewardsFilter /> */}
      </div>
      <div className="flex w-full items-center justify-end gap-6">
        <span className="label">
          {amountOfFilters} {label}
        </span>
        {amountOfFilters > 1 && (
          <Button
            info={{
              label: 'Clear all filters',
              style: ButtonStyle.TextPurple,
              removePadding: true,
              disabled: amountOfFilters < 1,
              onClick: () => {
                // hide();
                router.push(GoToBountiesPage());
              },
            }}
          />
        )}
        <Button
          info={{
            style: ButtonStyle.Filled,
            label: `Apply ${label}`,
            icon: 'arrow_forward',
            onClick: () => {
              setUrlFilter({ ...state, page: 0 });
              hide();
            },
            disabled:
              amountOfFilters === 0 ||
              JSON.stringify(state) === JSON.stringify(urlFilter.query),
          }}
        />
      </div>
    </div>
  );
}
