('@/components/utils/Title');
import { InvoiceStatus } from '@prisma/client';
import Head from 'next/head';
import { useMemo, useState } from 'react';

import { useGetInvoices } from '@/lib/hooks/invoiceHooks';

import { InvoiceListEntry } from '@/components/invoices/InvoiceListEntry';
import AppLayout from '@/components/layouts/AppLayout';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';
import { Title } from '@/components/utils/Title';

import { useAuth } from '@/auth/AuthContext';

import { NextPageWithLayout } from '../_app';

const InvoicesPage: NextPageWithLayout = () => {
  const { isAdmin, isFetchingUserInfo } = useAuth();
  const [query, setQuery] = useState<any>({
    amount: 10,
    paginate: true,
    page: 0,
    statuses: [InvoiceStatus.Unpaid],
  });
  const {
    invoices,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetInvoices(query, isAdmin && !isFetchingUserInfo);

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(InvoiceStatus)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>ST | Invoices</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto min-h-screen max-w-5xl space-y-8 p-4">
        <div className="space-y-4">
          <Title title="Invoices" useBorder={true} big={true} />
          <div className="flex items-center justify-between rounded-md border-b-1 border-surface pb-4">
            {!isAdmin || !invoices ? (
              <span className="body-sm text-sm text-on-surface-unactive">
                Invoices will show up here
              </span>
            ) : (
              <span className="body-sm body translate-x-0.5 text-sm font-bold text-on-surface-unactive">
                {invoices.length}{' '}
                {invoices.length === 1 ? 'Invoice' : 'Invoices'}
              </span>
            )}
            <Dropdown
              defaultOptionIndex={2}
              labelClass="border-2 p-2 border-main rounded-md"
              options={options}
              onSelect={({ label: newState }) => {
                setQuery({
                  ...query,
                  statuses:
                    newState === 'All'
                      ? undefined
                      : [newState as InvoiceStatus],
                  page: 0,
                });
              }}
            />
          </div>
          {isLoading && <Loading small />}
          <div className="space-y-7">
            {invoices?.map((invoice, i) => {
              return (
                <div key={i} className="flex -translate-x-3 items-center gap-6">
                  <span className="label translate-y-1 text-on-surface-disabled">
                    {i + 1}
                  </span>
                  <InvoiceListEntry invoice={invoice} />
                </div>
              );
            })}
          </div>

          {!isLoading && invoices && invoices.length > 0 && (
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
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
InvoicesPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
