import { Button, ButtonStyle } from '@/components/utils/Button';
import { Invoice as InvoiceData } from '@/lib/models/invoice';
import { GoToBountyPage, GoToSubmissionPage } from '@/lib/utils/Routes';
import Link from 'next/link';
import { InvoiceStatus } from '../pages/account/sections/AccountRewards';

export function InvoiceListEntry({
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
