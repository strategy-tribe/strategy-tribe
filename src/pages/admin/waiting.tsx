('@/components/utils/Title');
import Head from 'next/head';
import React, { useState } from 'react';
import AppLayout from '@/components/layouts/AppLayout';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Bounty, BountyState } from '@/lib/models';
import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyOrderBy, Order } from '@/lib/models/queryParams';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { Section } from '@/components/pages/landing/Section';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { useRouter } from 'next/router';
import { GoToBountyPage } from '@/lib/utils/Routes';
import { NextPageWithLayout } from '../_app';

const columns: ColumnDef<Bounty>[] = [
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
        accessorKey: 'state',
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
        accessorKey: 'wallet',
        cell: (info) => `${(info.getValue() as string).slice(0, 15)}...`,
      },
      {
        header: 'Funds (ETH)',
        accessorKey: 'funds',
        cell: (info) => info.getValue(),
      },
    ],
  },
];

const AdminPage: NextPageWithLayout = () => {
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
    paginate: true,
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
    <div className="text-text space-y-8">
      <Head>
        <title>ST | Admin</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section className="space-y-8">
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
                        className="text-xs p-4 uppercase"
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

          <tbody className="bg-darker overflow-hidden">
            {table.getRowModel().rows.map((row) => {
              const bounty = row.original;
              return (
                <tr
                  key={row.id}
                  className="hover:bg-dark w-full cursor-pointer"
                  onClick={() => router.push(GoToBountyPage(bounty.id!))}
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

        <div className="w-full bg-dark flex justify-center gap-8">
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
            className="border-0 border-b-2 border-dark bg-black body-sm w-fit placeholder:text-unactive text-text focus:ring-0 focus:border-purpleDark"
            placeholder="Page size"
            value={size}
            step={1}
            onChange={(e) => setSize(parseFloat(e.target.value))}
          />
        </div>
      </Section>
    </div>
  );
};

export default AdminPage;
AdminPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
