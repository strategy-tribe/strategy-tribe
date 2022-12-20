import { InvoiceStatus } from '@prisma/client';
import Link from 'next/link';
import router from 'next/router';

import { usePayInvoice } from '@/lib/hooks/invoiceHooks';
import {
  GoTo404Page,
  GoToBountyPage,
  GoToInvoicesPage,
  GoToSubmissionPage,
} from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';
import { FullInvoice } from '@/server/routes/invoice/getInvoice';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';
import { InvoiceStatusShower } from '../pages/account/sections/AccountRewards';

export function InvoiceListEntry({
  invoice: { bounty, submission, status },
}: {
  invoice: FullInvoice;
}) {
  const { isAdmin } = useAuth();
  const { notify } = useNotification();
  const { Pay } = usePayInvoice({
    onMutate: () => {
      notify(
        {
          title: 'Paying Bounty',
          content: 'Please do not close this window',
          icon: 'warning',
        },
        {
          delayTime: 0,
          delayType: DelayType.Condition,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    onSuccess: () => {
      router.push(GoToInvoicesPage());
      notify(
        {
          title: 'Bounty paid successfully',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Pill,
        }
      );
    },
    onError: (error) => {
      notify(
        {
          title: 'Payment Failed',
          content: `${error.message}`,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
    },
  });
  return (
    <div className="flex w-full grid-cols-4 flex-wrap place-items-center gap-2 tablet:grid tablet:gap-x-4">
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

      {isAdmin && status === InvoiceStatus.Unpaid && (
        <Button
          info={{
            style: ButtonStyle.Filled,
            removePadding: true,
            onClick: () => {
              const confirmed = window.confirm(
                'Are you sure to pay the bounty?'
              );
              if (confirmed)
                Pay({
                  submissionId: submission.id,
                  bountySlug: bounty?.slug as string,
                });
            },
            label: 'Pay bounty',
            className: 'h-fit p-2 tablet:px-6',
          }}
        />
      )}
    </div>
  );
}
