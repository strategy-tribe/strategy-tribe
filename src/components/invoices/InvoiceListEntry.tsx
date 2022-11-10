import Link from 'next/link';

import {
  GoTo404Page,
  GoToBountyPage,
  GoToSubmissionPage,
} from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { FullInvoice } from '@/server/routes/invoice/getInvoice';

import { InvoiceStatusShower } from '../pages/account/sections/AccountRewards';

export function InvoiceListEntry({
  invoice: { bounty, submission, status },
}: {
  invoice: FullInvoice;
}) {
  return (
    <div className="grid w-full grid-cols-12 place-items-center gap-x-8">
      <Link href={bounty ? GoToBountyPage(bounty.slug) : GoTo404Page()}>
        <span className="group col-span-8 w-full">
          {bounty && (
            <>
              <span className="label-sm text-main-light ">
                {bounty.wallet.balance} MATIC
              </span>
              <h5 className="title-sm group-hover:underline">{bounty.title}</h5>
            </>
          )}
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
