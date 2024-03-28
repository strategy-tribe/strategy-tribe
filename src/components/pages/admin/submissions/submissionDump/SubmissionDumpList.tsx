import { RequirementType } from '@prisma/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useGetSubmissionDump } from '@/lib/hooks/submission/useGetSubmissions';
import { Order } from '@/lib/models/Order';

import { FilterSelector } from '@/components/pages/explore/filters/utils/FilterSelector';
import {
  ActiveOptions,
  FilterSearchBox,
} from '@/components/pages/explore/filters/utils/SearchBox';
import {
  SearchResult,
  SearchResultType,
} from '@/components/pages/explore/filters/utils/types';
import { Section } from '@/components/pages/landing/Section';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { HasLabel } from '@/components/utils/Dropdown';
import Icon, { IconSize, IconWithTooltip } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { Overlay } from '@/components/utils/Overlay';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { GetSubmissionDumpParams } from '@/server/routes/submission/submissionDump/getSubmissionDump';

import { SubmissionDumpCard } from './SubmissionDumpCard';

export enum SubmissionDumpStatus {
  NotStarted = 'Not Started',
  Completed = 'Completed',
  Incomplete = 'Incomplete',
}

export function SubmissionDumpList() {
  const [query, setQuery] = useState<GetSubmissionDumpParams>({
    order: Order.Asc,
    amount: 16,
    page: 0,
  });

  const {
    submissionDump,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetSubmissionDump(query);

  const { submissionDump: AllSubs, isLoading: isAllSubsLoading } =
    useGetSubmissionDump({
      ...query,
      amount: undefined,
      page: undefined,
      includeEnriched: true,
    });

  const clearFilters = () =>
    setQuery({
      order: Order.Asc,
      amount: 16,
      page: 0,
    });

  return (
    <section className="w-full space-y-6">
      <div className="flex items-center justify-between border-b-2 border-main pb-2">
        {!submissionDump ? (
          <Title
            title="Submission Data will show up here"
            useBorder={false}
            big={true}
          />
        ) : (
          <Title
            title={`Submission Data (${submissionDump.length}/${count})`}
            useBorder={false}
            big={true}
          />
        )}

        {!isAllSubsLoading && AllSubs && (
          <div className="flex items-center space-x-4">
            <span className="font-semibold">Download All:</span>
            <a
              href={window.URL.createObjectURL(
                new Blob(
                  [
                    JSON.stringify(
                      AllSubs.map((s) => ({
                        ...s,
                        'Enriched Data': undefined,
                      })),
                      null,
                      4
                    ),
                  ],
                  {
                    type: 'application/json',
                  }
                )
              )}
              className="label mb-2 flex items-center gap-x-1 rounded bg-main p-2 hover:bg-main-light hover:bg-main hover:text-surface"
              download={`Full Submissions_${new Date().toLocaleDateString()}`}
            >
              <Icon size={IconSize.Small} icon="download" />
              Submission Data
            </a>
            <a
              href={window.URL.createObjectURL(
                new Blob(
                  [
                    JSON.stringify(
                      AllSubs.filter((s) => s['Enriched Data']).map((s) => ({
                        name: s.Target,
                        enrichedData: s['Enriched Data'],
                      })),
                      null,
                      4
                    ),
                  ],
                  {
                    type: 'application/json',
                  }
                )
              )}
              className="label mb-2 flex items-center gap-x-1 rounded bg-main p-2 hover:bg-main-light hover:bg-main hover:text-surface"
              download={`Enriched Data_${new Date().toLocaleDateString()}`}
            >
              <Icon size={IconSize.Small} icon="download" />
              Enriched Data
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-b-1 border-surface pb-2">
        <div className="flex space-x-4">
          <SubmissionDumpSearchBar query={query} setQuery={setQuery} />
          <TagsFilter query={query} setQuery={setQuery} />
          <TypeFilterMenu
            label="Type Filter"
            labelClass={`border-2 p-2 rounded-md ${
              query.types ? 'border-main' : 'border-surface'
            }`}
          >
            <div className="elevation-1 absolute right-0 z-50 overflow-hidden rounded bg-surface-dark py-3 pl-4 pr-8">
              <FilterSelector<{ label: RequirementType }>
                selected={query.types ?? []}
                select={(opt) => {
                  const type = opt?.label;
                  if (query.types?.includes(type)) return;
                  const types = [type].concat(query.types ?? []);
                  setQuery({ ...query, types });
                }}
                remove={(opt) => {
                  const type = opt?.label;
                  const types = query.types?.filter((t) => t !== type) ?? [];
                  setQuery({
                    ...query,
                    types: types.length > 0 ? types : undefined,
                  });
                }}
                options={Object.values(RequirementType).map((v) => ({
                  label: v,
                }))}
              />
            </div>
          </TypeFilterMenu>
          <Button
            info={{
              style: ButtonStyle.Text,
              label:
                query.order === Order.Asc ? 'Old ones first' : 'New ones first',
              icon: 'date_range',
              removeMinWidth: true,
              iconSize: IconSize.Small,
              removePadding: true,
              onClick: () => {
                setQuery({
                  ...query,
                  order: query.order === Order.Asc ? Order.Desc : Order.Asc,
                  page: 0,
                });
              },
            }}
          />
        </div>

        <button
          className="label-sm w-fit rounded-md border border-bg bg-surface p-2 text-center text-on-color hover:bg-main"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {submissionDump && submissionDump.length > 0 && (
        <Section className="grid grid-cols-1 gap-x-8 gap-y-8 py-2 tablet:grid-cols-2 tablet:gap-x-8 bt:grid-cols-4">
          {submissionDump?.map((submission) => {
            return (
              <SubmissionDumpCard
                key={submission.Slug}
                submission={submission}
              />
            );
          })}
        </Section>
      )}

      {!isLoading && submissionDump && submissionDump.length === 0 && (
        <Section className="grid place-items-center space-y-2">
          <p className="label text-center">No results</p>
          <Button
            info={{
              label: 'Try resetting the filters',
              style: ButtonStyle.TextPurple,
              removePadding: true,
              onClick: clearFilters,
            }}
          />
        </Section>
      )}

      {isLoading && <Loading small />}

      {!isLoading && submissionDump && submissionDump.length > 0 && (
        <PageControls
          config={{
            query,
            setQuery,
            numOfPages,
            currPage,
            hasNextPage,
            hasPreviousPage,
            isLoading,
          }}
        />
      )}
    </section>
  );
}

function TagsFilter({
  query,
  setQuery,
}: {
  query: GetSubmissionDumpParams;
  setQuery: Dispatch<SetStateAction<GetSubmissionDumpParams>>;
}) {
  const [selectedResults, setSelected] = useState<SearchResult[]>([]);

  /** Converts the results to the filter format */
  function resultsToFilter(results: SearchResult[]) {
    const orgs = results
      .filter((p) => p.type === SearchResultType.Organization)
      .map((p) => p.name);
    const tags = results
      .filter((p) => p.type === SearchResultType.Tag)
      .map((p) => p.name);
    const targets = results
      .filter((p) => p.type === SearchResultType.Person)
      .map((p) => p.name);
    const countries = results
      .filter((p) => p.type === SearchResultType.Country)
      .map((p) => p.name);

    setQuery({
      ...query,
      orgNames: orgs.length > 0 ? orgs : undefined,
      tags: tags.length > 0 ? tags : undefined,
      targetNames: targets.length > 0 ? targets : undefined,
      countries: countries.length > 0 ? countries : undefined,
    });
  }

  useEffect(() => {
    if (
      !query.tags &&
      !query.orgNames &&
      !query.targetNames &&
      !query.countries
    ) {
      setSelected([]);
    }
  }, [query]);

  return (
    <div
      className={`flex items-end space-x-2 border-2 bg-bg px-2 pb-1 ${
        query.tags ? 'border-main' : 'border-surface'
      } rounded-md`}
    >
      <FilterSearchBox
        showActive={false}
        selectedResults={selectedResults}
        setSelected={(newResults) => {
          setSelected(newResults);
          resultsToFilter(newResults);
        }}
        remove={(name) => {
          setSelected((p) => p.filter((result) => result.name !== name));
        }}
      />
      <IconWithTooltip
        icon="info"
        className="text-on-surface-p1"
        size={IconSize.Small}
        tooltip="Countries, organizations, or names"
      />
      <TypeFilterMenu label="Selected Tags">
        <div className="elevation-1 absolute right-0 z-20 w-max min-w-[8rem] max-w-[20rem] overflow-hidden rounded bg-surface-dark pb-6 pl-4 pr-8">
          <ActiveOptions
            open={false}
            removeResult={(name) => {
              const selected = selectedResults.filter(
                (result) => result.name !== name
              );
              setSelected(selected);
              resultsToFilter(selected);
            }}
            results={selectedResults}
          />
        </div>
      </TypeFilterMenu>
    </div>
  );
}

export function TypeFilterMenu<T extends HasLabel>({
  children,
  label,
  labelClass = 'title',
  className = '',
}: {
  children?: React.ReactNode;
  label: string;
  labelClass?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`relative ${open ? 'z-50' : ''} ${className}`}>
        <button
          className={`group flex items-center gap-x-[0.1rem] ${labelClass}`}
          onClick={() => setOpen(!open)}
        >
          <p
            className={`label first-letter:capitalize hover:text-main-light ${
              !open && 'group-hover:text-primary'
            }`}
          >
            {label}
          </p>
          <Icon icon="arrow_drop_down" />
        </button>

        {open && children}
      </div>

      <Overlay hide={() => setOpen(false)} showOverlay={open} />
    </>
  );
}

export function SubmissionDumpSearchBar({
  query,
  setQuery,
}: {
  query: GetSubmissionDumpParams;
  setQuery: Dispatch<SetStateAction<GetSubmissionDumpParams>>;
}) {
  const [title, setTitle] = useState('');

  function hitSearch() {
    setTitle('');
    setQuery({
      ...query,
      search: title === '' ? undefined : title,
    });
  }

  function clearTitle() {
    setTitle('');
    setQuery({ ...query, search: undefined });
  }

  return (
    <div className="grow-[10] pt-2">
      <div className="flex space-x-4">
        {query.search && (
          <button
            className="group flex items-center gap-2 rounded-full border px-4 py-2"
            onClick={() => clearTitle()}
          >
            <Icon
              icon="close"
              size={IconSize.Small}
              className="group-hover:text-error-light"
            />
            <div className="body-sm flex items-center gap-1">
              <span className="text-left ">Title</span>

              <span className="group-hover:text-error-light">
                {query.search}
              </span>
            </div>
          </button>
        )}
      </div>

      {!query.search && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="body-sm ml-2 w-full min-w-[12rem] border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                hitSearch();
              }
            }}
          />
          <button
            className="label-sm shrink-0 grow rounded-full border border-bg bg-main p-2 pb-1 text-center text-on-color"
            onClick={() => hitSearch()}
          >
            <Icon size={IconSize.Small} icon="search" className="" />
          </button>
        </div>
      )}
    </div>
  );
}
