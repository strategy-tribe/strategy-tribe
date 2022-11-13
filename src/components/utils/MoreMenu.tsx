import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { GoToBountyPage } from '@/lib/utils/Routes';

import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';
import Icon from './Icon';
import { Overlay } from './Overlay';

const BASE_URL = process.env.DOMAIN;

export function MoreMenu({ bountyId }: { bountyId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const { notify } = useNotification();

  function ManageShare() {
    setIsOpen(false);
    const url = `${BASE_URL}${GoToBountyPage(bountyId)}`;
    navigator.clipboard.writeText(url);
    notify({
      title: 'Bounty URL copied',
      content: url,
    });
  }

  function ManageSubscribe() {
    setIsOpen(false);
    notify(
      {
        title: 'Subscription per bounty is currently in development',
      },
      {
        condition: false,
        delayTime: 5,
        delayType: DelayType.Time,
        type: NotificationType.Pill,
      }
    );
  }

  return (
    <div className="relative flex items-center justify-end gap-1">
      <button
        className="hover:text-on-surface-p0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon="more_vert" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`more menu for ${bountyId}`}
            className="absolute top-0 z-50 flex translate-y-8 -translate-x-2 flex-col items-start gap-6 rounded-md bg-surface py-4 pl-4 pr-6 text-on-surface-p1"
          >
            <button
              className="flex w-full items-center gap-2 hover:text-on-surface-p0"
              onClick={ManageShare}
            >
              <Icon icon="reply" displayClasses="scale-x-[-1]" />
              <span className="font-semibold">Share</span>
            </button>
            <button
              className="flex w-full items-center gap-2 hover:text-on-surface-p0"
              onClick={ManageSubscribe}
            >
              <Icon icon="notifications" />

              <span className="font-semibold">Subscribe</span>
            </button>
          </motion.div>
        )}
        <Overlay
          hide={() => setIsOpen(false)}
          showOverlay={isOpen}
          opacity="opacity-50"
        />
      </AnimatePresence>
    </div>
  );
}
