import { BountyState, RequirementType } from '@prisma/client';
import { useState } from 'react';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';

import { useAuth } from '@/auth/AuthContext';
import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

import { FilterColumn } from './utils/FilterColumnHeader';
import { FilterSelector } from './utils/FilterSelector';
import { FilterSearchBox } from './utils/SearchBox';
import { SearchResult, SearchResultType } from './utils/types';

export function OrderByFilter({
  orderBy,
  select,
  remove,
}: {
  orderBy: BountyOrderBy | undefined;
  select: (_: BountyOrderBy) => void;
  remove: (_: BountyOrderBy) => void;
}) {
  return (
    <FilterColumn
      name="Order by"
      tooltip="Pick which field to give priority to"
    >
      <FilterSelector<{ label: BountyOrderBy }>
        selected={orderBy}
        select={(opt) => {
          select(opt?.label);
        }}
        remove={(opt) => {
          remove(opt?.label);
        }}
        options={Object.values(BountyOrderBy).map((v) => ({ label: v }))}
      />
    </FilterColumn>
  );
}

export function TypeFilter({
  types,
  select,
  remove,
}: {
  types: RequirementType[];
  select: (_: RequirementType) => void;
  remove: (_: RequirementType) => void;
}) {
  return (
    <FilterColumn name="Types" tooltip="Pick which field to give priority to">
      <FilterSelector<{ label: RequirementType }>
        selected={types}
        select={(opt) => {
          select(opt?.label);
        }}
        remove={(opt) => {
          remove(opt?.label);
        }}
        options={Object.values(RequirementType).map((v) => ({ label: v }))}
      />
    </FilterColumn>
  );
}

export function StateFilter({
  states,
  select,
  remove,
}: {
  states: BountyState[];
  select: (_: BountyState) => void;
  remove: (_: BountyState) => void;
}) {
  const { isAdmin, isStaff, isAssociate } = useAuth();

  return (
    <FilterColumn name="State" tooltip="Pick which states to give priority to">
      <FilterSelector<{ label: BountyState }>
        selected={states}
        select={(opt) => {
          select(opt?.label);
        }}
        remove={(opt) => {
          remove(opt?.label);
        }}
        options={Object.values(BountyState)
          .filter(
            (v) => v !== BountyState.Closed || isAdmin || isStaff || isAssociate
          )
          .map((v) => ({ label: v }))}
      />
    </FilterColumn>
  );
}

export function TagsFilter({
  filters,
  setFilters,
}: {
  filters: GetBountiesParams;
  setFilters: (_: Partial<GetBountiesParams>) => void;
}) {
  /** Internal state for the search results */
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

    setFilters({
      orgName: orgs.length > 0 ? orgs : undefined,
      tags: tags.length > 0 ? tags : undefined,
      targetNames: targets.length > 0 ? targets : undefined,
      countries: countries.length > 0 ? countries : undefined,
    });
  }

  return (
    <>
      <FilterColumn name="Tags" tooltip="Countries, organizations, or names">
        <FilterSearchBox
          selectedResults={selectedResults}
          setSelected={(newResults) => {
            setSelected(newResults);
            resultsToFilter(newResults);
          }}
          remove={(name) => {
            setSelected((p) => p.filter((result) => result.name !== name));
          }}
        />
      </FilterColumn>
    </>
  );
}

export function RewardsFilter() {
  return (
    <FilterColumn name="Rewards" tooltip="How much the bounty rewards">
      to do
    </FilterColumn>
  );
}
