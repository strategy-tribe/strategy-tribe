import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { useGetInvoices } from '@/lib/hooks/useGetInvoices';
import {
  Invoice as InvoiceData,
  InvoiceStatus as InvoiceStatusData,
} from '@/lib/models/invoice';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToBountyPage, GoToSubmissionPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

export function AccountRewards() {
  const { userId } = useAuth();
  const { invoices, isLoading } = useGetInvoices(userId!, !!userId);

  return (
    <section className="w-full">
      {invoices &&
        invoices?.map((invoice) => {
          return <Invoice invoice={invoice} key={invoice.id} />;
        })}
      {isLoading && <Loading small />}
    </section>
  );
}

function Invoice({
  invoice: { bounty, status, submission },
}: {
  invoice: InvoiceData;
}) {
  return (
    <div className="grid grid-cols-12 place-items-center w-full gap-x-8">
      <Link href={GoToBountyPage(bounty.id!)}>
        <a className="col-span-8 w-full group">
          <span className="label-sm text-purpleLight ">{bounty.funds} ETH</span>
          <h5 className="title-sm group-hover:underline">{bounty.title}</h5>
        </a>
      </Link>

      <InvoiceStatus status={status} />

      <Button
        info={{
          className: 'col-span-3 whitespace-nowrap justify-self-end',
          isALink: GoToSubmissionPage(submission.id!),
          style: ButtonStyle.TextPurple,
          label: 'See submission',
          removeMinWidth: true,
          removePadding: true,
        }}
      />
    </div>
  );
}

export function InvoiceStatus({ status }: { status: InvoiceStatusData }) {
  const color = () => {
    switch (status) {
      case InvoiceStatusData.Paid:
        return 'border-greenDark text-greenDark';
      case InvoiceStatusData.Error:
        return 'border-redLight text-redLight';
      default:
        return 'border-yellowDark text-yellowDark';
    }
  };

  return (
    <div
      className={`${color()} border-2 rounded-full py-2 px-6 first-letter:capitalize label-sm w-fit whitespace-nowrap`}
    >
      {status === InvoiceStatusData.Unpaid && 'In process'}
      {status === InvoiceStatusData.Error && 'Contact us'}
      {status === InvoiceStatusData.Paid && status}
    </div>
  );
}
