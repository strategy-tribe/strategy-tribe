import { TargetType } from '@prisma/client';

import {
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';

import Icon from '../utils/Icon';

export function FilterMenu({
  query,
  setQuery,
}: {
  query: BountyQueryParams;
  setQuery: (q: BountyQueryParams) => void;
}) {
  return (
    <div className="flex flex-col gap-8 ">
      <OrderPicker
        setOrder={(o) => {
          const newQ: BountyQueryParams = {
            ...query,
            order: o,
          };
          setQuery(newQ);
        }}
        order={query.order}
      />

      <OrderByPicker
        orderBy={query.orderBy ?? BountyOrderBy.Bounty}
        setOrderBy={(o) => {
          const newQ: BountyQueryParams = {
            ...query,
            orderBy: o,
          };
          setQuery(newQ);
        }}
      />

      <TargetTypePicker
        targetType={query.targetType}
        setTargetType={(o) => {
          const newQ: BountyQueryParams = {
            ...query,
            targetType: o,
          };
          setQuery(newQ);
        }}
      />

      <BountyPicker
        bounty={{ max: query.maxBounty, min: query.minBounty }}
        setBounty={(o) => {
          const newQ: BountyQueryParams = {
            ...query,
            minBounty: o.min || 0,
            maxBounty: o.max || 0,
          };
          setQuery(newQ);
        }}
      />

      {/* <OrgNamePicker
        orgName={query. || ''}
        setOrgName={(o) => {
          const newQ: BountyQueryParams = {
            ...query,
            orgName: o,
          };
          setQuery(newQ);
        }}
      /> */}
    </div>
  );
}

function OrgNamePicker({
  orgName,
  setOrgName,
}: {
  orgName: string;
  setOrgName: (s: string) => void;
}) {
  return (
    <div>
      <FilterLabel label="Affiliated with" />
      <input
        value={orgName}
        onChange={(e) => {
          const text = e.target.value;
          setOrgName(text);
        }}
        type="text"
        placeholder="Name"
        className="w-full border-0 border-b-2 border-surface bg-bg pl-0 text-base placeholder:text-base focus:border-b-2 focus:border-main focus:ring-0"
      />
    </div>
  );
}

function BountyPicker({
  bounty,
  setBounty,
}: {
  bounty: { min?: number; max?: number };
  setBounty: (s: { min?: number; max?: number }) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <FilterLabel label="Bounty (MATIC)" />

      <div className="flex items-center gap-4">
        <div className="flex w-full items-center justify-between gap-4">
          {/* <label htmlFor="min">Min</label> */}
          <input
            value={bounty.min?.toString()}
            onChange={(e) => {
              const newMin = parseFloat(e.target.value);
              setBounty({ ...bounty, min: newMin });
            }}
            type="number"
            step={0.0001}
            name="min"
            min={0}
            placeholder="Min"
            className="w-full border-0 border-b-2 border-surface bg-bg pl-0 text-base placeholder:text-base placeholder:text-on-surface-unactive focus:border-b-2 focus:border-main focus:ring-0"
          />
          {/* <span className="label">MATIC</span> */}
        </div>

        <span className="label-lg text-on-surface-unactive">To</span>

        <div className="flex w-full items-center justify-between gap-4">
          {/* <label htmlFor="max">Max</label> */}
          <input
            value={bounty.max?.toString()}
            onChange={(e) => {
              const newMax = parseFloat(e.target.value);
              setBounty({ ...bounty, max: newMax });
            }}
            type="number"
            step={0.0001}
            name="max"
            min={0}
            placeholder="Max"
            className="w-full border-0 border-b-2 border-surface bg-bg pl-0 placeholder:text-on-surface-unactive focus:border-b-2 focus:border-main focus:ring-0"
          />
          {/* <span className="label">MATIC</span> */}
        </div>
      </div>
    </div>
  );
}

function TargetTypePicker({
  targetType,
  setTargetType,
}: {
  targetType: TargetType | undefined;
  setTargetType: (s: TargetType) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <FilterLabel label="Type" />
      <select
        name="targetType"
        className="w-full cursor-pointer border-0 bg-bg p-0 hover:underline focus:ring-0"
        value={targetType}
        onChange={(e) => {
          const text = e.target.value === 'All' ? undefined : e.target.value;
          setTargetType(text as TargetType);
        }}
      >
        <option value={undefined}>All</option>
        <option value="INDIVIDUAL">INDIVIDUAL</option>
        <option value="ORG">ORG</option>
      </select>
    </div>
  );
}

function OrderPicker({
  setOrder,
  order,
}: {
  order: Order;
  setOrder: (s: Order) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <FilterLabel label="Order" />
      <button
        className="group flex w-fit items-center gap-2"
        onClick={() => setOrder(order === Order.Asc ? Order.Desc : Order.Asc)}
      >
        <span className="text-base first-letter:capitalize group-hover:underline">
          {order}ending
        </span>
        <Icon icon={order === Order.Asc ? 'arrow_upward' : 'arrow_downward'} />
      </button>
    </div>
  );
}

function OrderByPicker({
  orderBy,
  setOrderBy,
}: {
  orderBy: BountyOrderBy;
  setOrderBy: (s: BountyOrderBy) => void;
}) {
  return (
    <div className="space-y-1">
      <FilterLabel label="Order by" />
      <select
        name="orderBy"
        className="w-full cursor-pointer border-0 bg-bg p-0 hover:underline focus:ring-0"
        value={orderBy}
        onChange={(e) => setOrderBy(e.target.value as unknown as BountyOrderBy)}
      >
        <option value="createdAT">Created at</option>
        <option value="submissions">Submissions</option>
        <option value="funds">Bounty</option>
        <option value="closesAt">Closes at</option>
      </select>
    </div>
  );
}

function FilterLabel({ label }: { label: string }) {
  return <h6 className="label-lg text-on-surface-unactive">{label}</h6>;
}
