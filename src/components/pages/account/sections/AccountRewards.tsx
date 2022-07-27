import Loading from '@/components/utils/Loading';
import { useGetInvoices } from '@/lib/hooks/useGetInvoices';
import { InvoiceStatus as InvoiceStatusData } from '@/lib/models/invoice';
import { useAuth } from 'auth/AuthContext';
import { InvoiceListEntry } from '../../../invoices/InvoiceListEntry';

export function AccountRewards() {
  const { userId } = useAuth();
  const { invoices, isLoading } = useGetInvoices(
    { users: [userId!] },
    !!userId
  );

  return (
    <section className="w-full space-y-4">
      <div className="pb-4 border-b-1 border-surface">
        <span className="body-sm text-on-surface-unactive">
          {invoices?.length} {invoices?.length === 1 ? 'invoice' : 'invoices'}
        </span>
      </div>

      <div className="space-y-10">
        {invoices &&
          invoices?.map((invoice) => {
            return <InvoiceListEntry invoice={invoice} key={invoice.id} />;
          })}
      </div>
      {isLoading && <Loading small />}
    </section>
  );
}

export function InvoiceStatus({ status }: { status: InvoiceStatusData }) {
  const { isAdmin, isStaff } = useAuth();

  const color = () => {
    switch (status) {
      case InvoiceStatusData.Paid:
        return 'border-success text-success';
      case InvoiceStatusData.Error:
        return 'border-error-light text-error-light';
      default:
        return 'border-waiting text-waiting';
    }
  };

  const label = () => {
    switch (status) {
      case InvoiceStatusData.Unpaid:
        return isAdmin || isStaff ? 'Unpaid' : 'In progress';
      case InvoiceStatusData.Error:
        return isAdmin || isStaff ? 'Error' : 'Contact us';
      case InvoiceStatusData.Paid:
        return 'Paid';
      default:
        break;
    }
  };

  return (
    <div
      className={`${color()} border-2 rounded-full py-2 px-6 first-letter:capitalize label-sm w-fit whitespace-nowrap`}
    >
      {label()}
    </div>
  );
}
