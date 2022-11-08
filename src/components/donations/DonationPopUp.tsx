import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Button, ButtonStyle } from '@/components/utils/Button';
import { Overlay } from '@/components/utils/Overlay';
import { Title } from '@/components/utils/Title';

import { Recipient } from '@/models/donation';

import { SupportButton } from './SupportButton';
import {
  ClientNotification,
  DelayType,
  iNotificationConfig,
  NotificationStyle,
  NotificationType,
} from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';
('../utils/Title');

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis ex illo nisi nesciunt est odio. Repellat sit doloremque officia maxime delectus at eius vel, odio quos sint aperiam, voluptatibus obcaecati.';

export function DonationPopUp({
  recipient,
  show,
  hide,
  title = 'Support this bounty',
  description = lorem,
}: {
  title?: string;
  description?: string;
  recipient: Recipient;
  show: boolean;
  hide: () => void;
}) {
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

    hide();
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

    hide();
    notify(msg, config);
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 z-50 "
          >
            <div
              className="absolute top-[50%] left-[50%] z-50 mx-auto min-w-[20rem] max-w-lg translate-y-[-50%] translate-x-[-50%]
              space-y-6 rounded-lg border-2 border-main bg-bg
              px-4 pt-6 pb-8
              text-on-surface-p1
          "
            >
              <div className="space-y-2">
                <Title title={title} />
                <p className="whitespace-pre-line">{description}</p>
              </div>

              <div className="space-y-4">
                <label className="flex flex-col">
                  <span className="label">Donation amount (MATIC)</span>
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
                    className="border-0 border-b-2 border-surface bg-bg pl-1 focus:border-main focus:ring-0"
                  />
                </label>
                {!canSubmit && typed && (
                  <p className="label text-error-light">
                    The donation must be greater than 0
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-8">
                <Button
                  info={{
                    label: 'Cancel',
                    style: ButtonStyle.Text,
                    onClick: hide,
                  }}
                />
                <SupportButton
                  amountInEth={amount}
                  recipient={recipient}
                  after={{
                    onError: onDonationError,
                    onSuccess: onDonationSuccess,
                  }}
                  disabled={amount <= 0}
                />
              </div>
            </div>
            <Overlay
              showOverlay={true}
              hide={() => {
                hide();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
