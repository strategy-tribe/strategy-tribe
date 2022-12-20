import { InvoiceStatus } from '@prisma/client';
import { useMemo, useState } from 'react';

import { useGetInvoices } from '@/lib/hooks/invoiceHooks';

import { InvoiceListEntry } from '@/components/invoices/InvoiceListEntry';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';

export function AccountRewards() {
  const { userId } = useAuth();
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
  } = useGetInvoices(query, !!userId);

  const options = useMemo(() => {
    return ['All', 'Paid', 'In progress', 'Contact Us'].map((entry) => {
      return { label: entry } as HasLabel;
    });
  }, []);

  const getStatus = (newState: string) => {
    switch (newState) {
      case 'All':
        return undefined;
      case 'In progress':
        return [InvoiceStatus.Unpaid];
      case 'Paid':
        return [InvoiceStatus.Paid];
      case 'Contact Us':
        return [InvoiceStatus.Error];
      default:
        break;
    }
  };

  return (
    <section className="w-full space-y-4">
      <div className="flex items-center justify-between border-b-1 border-surface pb-4">
        {!userId || !invoices ? (
          <span className="body-sm text-sm text-on-surface-unactive">
            Your rewards will show up here
          </span>
        ) : (
          <span className="body-sm text-sm  font-bold text-on-surface-unactive">
            {invoices?.length} {invoices?.length === 1 ? 'Reward' : 'Rewards'}
          </span>
        )}
        <Dropdown
          defaultOptionIndex={0}
          labelClass="border-2 p-2 border-main rounded-md"
          options={options}
          onSelect={({ label: newState }) => {
            setQuery({
              ...query,
              statuses: getStatus(newState),
            });
          }}
        />
      </div>

      <div className="space-y-10">
        {invoices &&
          invoices?.map((invoice) => {
            return (
              <InvoiceListEntry invoice={invoice} key={invoice.submission.id} />
            );
          })}
      </div>
      {isLoading && <Loading small />}

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
    </section>
  );
}

export function InvoiceStatusShower({ status }: { status: InvoiceStatus }) {
  const { isAdmin, isStaff } = useAuth();

  const color = () => {
    switch (status) {
      case 'Paid':
        return 'border-success text-success';
      case 'Error':
        return 'border-error-light text-error-light';
      default:
        return 'border-waiting text-waiting';
    }
  };

  const label = () => {
    switch (status) {
      case 'Unpaid':
        return isAdmin || isStaff ? 'Unpaid' : 'In progress';
      case 'Error':
        return isAdmin || isStaff ? 'Error' : 'Contact us';
      case 'Paid':
        return 'Paid';
      default:
        break;
    }
  };

  return (
    <div
      className={`${color()} label-sm w-fit whitespace-nowrap rounded-full border-2 py-2 px-6 first-letter:capitalize`}
    >
      {label()}
    </div>
  );
}
