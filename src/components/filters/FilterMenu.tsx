import {
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queries/BountyQueryParams';
import { Order } from '@/lib/models/queries/Order';
import { TargetType } from '@/lib/models/targetType';
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
        orderBy={query.orderBy}
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

      <OrgNamePicker
        orgName={query.orgName || ''}
        setOrgName={(o) => {
          const newQ: BountyQueryParams = {
            ...query,
            orgName: o,
          };
          setQuery(newQ);
        }}
      />
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
        className="bg-black border-0 focus:border-b-2 focus:border-purpleDark focus:ring-0 w-full border-b-2 border-dark text-base placeholder:text-base pl-0"
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
      <FilterLabel label="Bounty (ETH)" />

      <div className="flex items-center gap-4">
        <div className="flex w-full justify-between items-center gap-4">
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
            className="bg-black border-0 focus:border-b-2 focus:border-purpleDark focus:ring-0 w-full border-b-2 border-dark text-base placeholder:text-base pl-0 placeholder:text-unactive"
          />
          {/* <span className="label">ETH</span> */}
        </div>

        <span className="label-lg text-unactive">To</span>

        <div className="flex w-full justify-between items-center gap-4">
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
            className="bg-black border-0 focus:border-b-2 focus:ring-0 w-full border-b-2 border-dark focus:border-purpleDark pl-0 placeholder:text-unactive"
          />
          {/* <span className="label">ETH</span> */}
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
    <div className="flex gap-2 flex-col">
      <FilterLabel label="Type" />
      <select
        name="targetType"
        className="bg-black p-0 border-0 w-full focus:ring-0 cursor-pointer hover:underline"
        value={targetType}
        onChange={(e) => {
          const text = e.target.value === 'All' ? undefined : e.target.value;
          setTargetType(text as TargetType);
        }}
      >
        <option value={undefined}>All</option>
        <option value={TargetType.Individual}>{TargetType.Individual}s</option>
        <option value={TargetType.Organization}>
          {TargetType.Organization}s
        </option>
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
    <div className="flex-col flex gap-1">
      <FilterLabel label="Order" />
      <button
        className="flex items-center gap-2 group w-fit"
        onClick={() => setOrder(order === Order.Asc ? Order.Desc : Order.Asc)}
      >
        <span className="group-hover:underline first-letter:capitalize text-base">
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
        className="bg-black p-0 border-0 focus:ring-0 w-full cursor-pointer hover:underline"
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
  return <h6 className="label-lg text-unactive">{label}</h6>;
}
