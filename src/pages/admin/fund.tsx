import { BountyState } from '@prisma/client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToBountyPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Button, ButtonStyle } from '@/components/utils/Button';

import { SmallBounty } from '@/server/routes/bounties/getBounties';

import { NextPageWithLayout } from '../_app';

const columns: ColumnDef<SmallBounty>[] = [
  {
    id: 'Bounties waiting for funds',
    columns: [
      {
        header: 'Title',
        accessorKey: 'title',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Closes in',
        accessorKey: 'closesAt',
        cell: (info) => {
          const date = info.getValue();
          if (date as Date) return `${GetDateInString(date as Date)}`;
        },
      },
      {
        header: 'Wallet',
        accessorKey: 'wallet.address',
        cell: (info) => `${(info.getValue() as string).slice(0, 15)}...`,
      },
      {
        header: 'Funds (MATIC)',
        accessorKey: 'wallet.balance',
        cell: (info) => info.getValue(),
      },
    ],
  },
];

const BountiesToFundPage: NextPageWithLayout = () => {
  const [size, setSize] = useState(10);

  const [page, setPage] = useState(0);

  function nextPage() {
    if (hasNextPage) setPage(page + 1);
  }

  function prevPage() {
    if (hasPreviousPage) setPage(page - 1);
  }

  const { bounties, hasNextPage, hasPreviousPage } = useGetBounties({
    amount: size,
    order: Order.Asc,
    orderBy: BountyOrderBy.CreatedAt,
    states: [BountyState.WaitingForFunds],
    page,
  });

  const table = useReactTable({
    data: bounties || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>ST | Fund</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto min-h-screen max-w-5xl space-y-8">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup, i) => {
              if (!i) return <></>;
              return (
                <tr key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="p-4 text-xs uppercase"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody className="overflow-hidden bg-surface-dark">
            {table.getRowModel().rows.map((row) => {
              const bounty = row.original;
              return (
                <tr
                  key={row.id}
                  className="w-full cursor-pointer hover:bg-surface"
                  onClick={() => router.push(GoToBountyPage(bounty.slug))}
                >
                  {row.getVisibleCells().map((cell, i) => {
                    const align = i === 0 ? 'text-left' : 'text-center';
                    const font = i === 0 ? 'body' : 'body-sm';

                    return (
                      <td key={cell.id} className={`p-4 ${align} ${font}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex w-full justify-center gap-8 bg-surface">
          <Button
            info={{
              label: 'Prev',
              icon: 'arrow_back',
              style: ButtonStyle.TextPurple,
              onClick: prevPage,
              disabled: !hasPreviousPage,
            }}
          />
          <Button
            info={{
              label: 'Next',
              icon: 'arrow_forward',
              style: ButtonStyle.TextPurple,
              onClick: nextPage,
              disabled: !hasNextPage,
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pagesize" className="label-sm">
            Page size
          </label>
          <input
            name="pagesize"
            id="pagesize"
            type="number"
            className="body-sm w-fit border-0 border-b-2 border-surface bg-bg text-on-surface-p1 placeholder:text-on-surface-unactive focus:border-main focus:ring-0"
            placeholder="Page size"
            value={size}
            step={1}
            onChange={(e) => setSize(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default BountiesToFundPage;
BountiesToFundPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
