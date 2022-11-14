import { BountyState, RequirementType } from '@prisma/client';
import { useState } from 'react';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';

import { FilterColumn } from './utils/FilterColumnHeader';
import { FilterSelector } from './utils/FilterSelector';
import { FilterSearchBox } from './utils/SearchBox';

export function OrderByFilter() {
  const [selected, setSelected] = useState<BountyOrderBy>();
  return (
    <FilterColumn
      name="Order by"
      tooltip="Pick which field to give priority to"
    >
      <FilterSelector<{ label: BountyOrderBy }>
        selected={selected}
        onSelect={(opt) => {
          setSelected(opt?.label);
        }}
        options={Object.values(BountyOrderBy).map((v) => ({ label: v }))}
      />
    </FilterColumn>
  );
}

export function TypeFilter() {
  const [selected, setSelected] = useState<RequirementType>();
  return (
    <FilterColumn
      name="Order by"
      tooltip="Pick which field to give priority to"
    >
      <FilterSelector<{ label: RequirementType }>
        selected={selected}
        onSelect={(opt) => {
          setSelected(opt?.label);
        }}
        options={Object.values(RequirementType).map((v) => ({ label: v }))}
      />
    </FilterColumn>
  );
}

export function StateFilter() {
  const [selected, setSelected] = useState<BountyState>();
  return (
    <FilterColumn
      name="Order by"
      tooltip="Pick which field to give priority to"
    >
      <FilterSelector<{ label: BountyState }>
        selected={selected}
        onSelect={(opt) => {
          setSelected(opt?.label);
        }}
        options={Object.values(BountyState).map((v) => ({ label: v }))}
      />
    </FilterColumn>
  );
}

export function TagsFilter() {
  return (
    <>
      <FilterColumn name="Tags" tooltip="Countries, organizations, or names">
        <FilterSearchBox />
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
