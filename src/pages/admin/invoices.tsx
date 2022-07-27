('@/components/utils/Title');
import AppLayout from '@/components/layouts/AppLayout';
import Head from 'next/head';

import { InvoiceListEntry } from '@/components/invoices/InvoiceListEntry';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';
import { useGetInvoices } from '@/lib/hooks/useGetInvoices';
import { InvoiceStatus } from '@/lib/models/invoice';
import { useAuth } from 'auth/AuthContext';
import { NextPageWithLayout } from '../_app';

const InvoicesPage: NextPageWithLayout = () => {
  const { isAdmin, isFetchingUserInfo } = useAuth();
  const { invoices, isLoading } = useGetInvoices(
    { statuses: [InvoiceStatus.Unpaid, InvoiceStatus.Error] },
    isAdmin && !isFetchingUserInfo
  );

  return (
    <div className="text-on-surface-p1 space-y-8">
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
      <div className="mx-auto max-w-5xl min-h-screen space-y-8">
        {isLoading && <Loading small />}

        <div className="space-y-4">
          <Title title="Unpaid invoices" useBorder={false} />
          <div className="space-y-7">
            {invoices?.map((invoice, i) => {
              return (
                <div key={invoice.id} className="flex gap-4">
                  <span className="label translate-y-1 text-on-surface-disabled">
                    {i + 1}
                  </span>
                  <InvoiceListEntry invoice={invoice} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
InvoicesPage.getLayout = function getLayout(page) {
  return (
    <ProtectedLayout>
      <AppLayout>{page}</AppLayout>
    </ProtectedLayout>
  );
};
