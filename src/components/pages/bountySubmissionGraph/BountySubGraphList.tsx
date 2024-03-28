import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { useGetSubmissionGraphs } from '@/lib/hooks/bountySubGraphHooks';
import { Order } from '@/lib/models/Order';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { GetSubmissionGraphsParams } from '@/server/routes/submissionGraph/getBountySubGraphs';

import { SubmissionGraphCard } from './BountySubGraphCard';
import { TypeFilterMenu } from '../admin/submissions/submissionDump/SubmissionDumpList';
import { FilterSelector } from '../explore/filters/utils/FilterSelector';
import { Section } from '../landing/Section';

export enum SubmissionGraphStatus {
  NotStarted = 'Not Started',
  Completed = 'Completed',
  WIP = 'In Progress',
}

export enum SubmissionGraphWIP {
  GraphCompleted = 'Graph Completed',
  GraphNotCompleted = 'Graph Not Completed',
  DatapointsCompleted = 'Datapoints Completed',
  DatapointsNotCompleted = 'Datapoints Not Completed',
  EnrichmentCompleted = 'Enrichment Completed',
  EnrichmentNotCompleted = 'Enrichment Not Completed',
}

export function SubmissionGraphList() {
  const [query, setQuery] = useState<GetSubmissionGraphsParams>({
    order: Order.Asc,
    amount: 12,
    paginate: true,
    page: 0,
    status: SubmissionGraphStatus.NotStarted,
  });

  const {
    submissionGraphs,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
    count,
  } = useGetSubmissionGraphs(query);

  const options = useMemo(() => {
    return [...Object.entries(SubmissionGraphStatus)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  const clearFilters = () =>
    setQuery({
      order: Order.Asc,
      amount: 12,
      paginate: true,
      page: 0,
      status: SubmissionGraphStatus.NotStarted,
    });

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between border-b-1 border-main pb-4">
        {!submissionGraphs ? (
          <Title
            title="Submission Graphs will show up here"
            useBorder={false}
            big={true}
          />
        ) : (
          <Title
            title={`Submission Graphs (${submissionGraphs.length}/${count})`}
            useBorder={false}
            big={true}
          />
        )}

        <div className="flex space-x-8">
          <SubmissionGraphsSearchBar query={query} setQuery={setQuery} />
          <Dropdown
            defaultOptionIndex={0}
            labelClass="border-2 p-2 border-main rounded-md"
            options={options}
            label={query.status}
            onSelect={({ label: newState }) => {
              setQuery({
                ...query,
                status: newState as SubmissionGraphStatus,
              });
            }}
          />
          {query.status === SubmissionGraphStatus.WIP && (
            <TypeFilterMenu
              label="WIP Status"
              labelClass={`border-2 p-2 rounded-md ${
                query.progress ? 'border-main' : 'border-surface'
              }`}
            >
              <div className="elevation-1 absolute right-0 z-50 min-w-[16rem] overflow-hidden rounded bg-surface-dark py-3 pl-4 pr-8">
                <FilterSelector<{ label: SubmissionGraphWIP }>
                  selected={query.progress ?? []}
                  select={(opt) => {
                    const type = opt?.label;
                    if (query.progress?.includes(type)) return;
                    const types = [type].concat(query.progress ?? []);
                    setQuery({ ...query, progress: types });
                  }}
                  remove={(opt) => {
                    const type = opt?.label;
                    const types =
                      query.progress?.filter((t) => t !== type) ?? [];
                    setQuery({
                      ...query,
                      progress: types.length > 0 ? types : undefined,
                    });
                  }}
                  options={Object.values(SubmissionGraphWIP).map((v) => ({
                    label: v,
                  }))}
                />
              </div>
            </TypeFilterMenu>
          )}
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
          <button
            className="label-sm w-fit rounded-md border border-bg bg-surface p-2 text-center text-on-color hover:bg-main"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {submissionGraphs && submissionGraphs.length > 0 && (
        <Section className="grid grid-cols-1 gap-x-10 gap-y-10 tablet:grid-cols-2 tablet:gap-x-16 bt:grid-cols-3">
          {submissionGraphs?.map((submissionGraph) => {
            return (
              <SubmissionGraphCard
                key={submissionGraph.slug}
                submissionGraph={submissionGraph}
              />
            );
          })}
        </Section>
      )}

      {!isLoading && submissionGraphs && submissionGraphs.length === 0 && (
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

      {!isLoading && submissionGraphs && submissionGraphs.length > 0 && (
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

export function SubmissionGraphsSearchBar({
  query,
  setQuery,
}: {
  query: GetSubmissionGraphsParams;
  setQuery: Dispatch<SetStateAction<GetSubmissionGraphsParams>>;
}) {
  const [title, setTitle] = useState('');

  function hitSearch() {
    setTitle('');
    setQuery({
      ...query,
      bountyTitle: title === '' ? undefined : title,
    });
  }

  function clearTitle() {
    setTitle('');
    setQuery({ ...query, bountyTitle: undefined });
  }

  return (
    <div className="grow-[10]">
      <div className="flex space-x-4">
        {query.bountyTitle && (
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
                {query.bountyTitle}
              </span>
            </div>
          </button>
        )}
      </div>

      {!query.bountyTitle && (
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="body-sm ml-2  w-full min-w-[12rem] border-0 border-b bg-bg font-medium focus:border-main focus:ring-0"
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
            className="label-sm shrink-0 grow rounded-full border border-bg bg-main px-8 py-2 text-center text-on-color"
            onClick={() => hitSearch()}
          >
            Search
          </button>
        </div>
      )}
    </div>
  );
}
