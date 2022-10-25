import Link from 'next/link';

import { FullInvoice } from '@/lib/types';
import { GoToBountyPage, GoToSubmissionPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { InvoiceStatusShower } from '../pages/account/sections/AccountRewards';

export function InvoiceListEntry({
  invoice: { bounty, submission, status },
}: {
  invoice: FullInvoice;
}) {
  return (
    <div className="grid grid-cols-12 place-items-center w-full gap-x-8">
      <Link href={GoToBountyPage(bounty.id)}>
        <span className="col-span-8 w-full group">
          <span className="label-sm text-main-light ">
            {bounty.wallet.balance} MATIC
          </span>
          <h5 className="title-sm group-hover:underline">{bounty.title}</h5>
        </span>
      </Link>

      <InvoiceStatusShower status={status} />

      <Button
        info={{
          className: 'col-span-3 whitespace-nowrap justify-self-end',
          isALink: GoToSubmissionPage(submission.id),
          style: ButtonStyle.TextPurple,
          label: 'See submission',
          removeMinWidth: true,
          removePadding: true,
        }}
      />
    </div>
  );
}
