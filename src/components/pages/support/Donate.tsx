import { useState } from 'react';

import { useNotification } from '@/components/notifications/NotificationContext';

import {
  ClientNotification,
  DelayType,
  iNotificationConfig,
  NotificationStyle,
  NotificationType,
} from '../../notifications/iNotification';

export function Donate() {
  const ST_WALLET = process.env.NEXT_PUBLIC_ST_WALLET as string;
  const [amount, setAmount] = useState(0);
  const [typed, setTyped] = useState(false);

  const canSubmit = amount > 0;

  const { notify } = useNotification();

  function onDonationSuccess() {
    const msg: ClientNotification = {
      title: 'Your donation is being processed',
      content: 'Thank you',
      style: NotificationStyle.success,
    };

    const config: iNotificationConfig = {
      condition: false,
      delayTime: 3,
      delayType: DelayType.Time,
      type: NotificationType.Banner,
    };

    notify(msg, config);
  }

  function onDonationError(e: any) {
    const msg: ClientNotification = {
      title: 'There has been an error',
      content: `${e}`,
      style: NotificationStyle.error,
    };

    const config: iNotificationConfig = {
      condition: false,
      delayTime: 3,
      delayType: DelayType.Time,
      type: NotificationType.Banner,
    };

    notify(msg, config);
  }

  return (
    <div id="support" className="space-y-8">
      <div>
        <h2 className="font-inter text-3xl font-bold text-on-surface-p0">
          Support StrategyTribe
        </h2>
        <span className="inline-block h-1 w-16 -translate-y-1 bg-main"></span>
      </div>

      {/* Why */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto excepturi
        saepe fuga vel quo sunt cum in porro, suscipit corporis ipsam laborum
        odit alias recusandae officiis et autem dolorem voluptatum.
      </p>

      {/* Donation */}
      <div className="space-y-6 rounded-lg text-on-surface-p1">
        <div className="space-y-4">
          <label className="flex flex-col">
            <span className="label">Amount (MATIC)</span>
            <input
              type="number"
              step={0.001}
              value={amount}
              min={0}
              onChange={(e) => {
                const value = Number(e.target.value);
                setAmount(value);
                setTyped(true);
              }}
              className="border-0 border-b-2 border-surface bg-bg focus:border-main focus:ring-0"
            />
          </label>
          {!canSubmit && typed && (
            <p className="label text-error-light">
              The donation must be greater than 0
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-8">
          {/* <SupportButton
            amountInEth={amount}
            recipient={{
              wallet: ST_WALLET,
            }}
            after={{
              onError: onDonationError,
              onSuccess: onDonationSuccess,
            }}
            on-surface-disabled={amount <= 0}
          /> */}
        </div>
      </div>
    </div>
  );
}
