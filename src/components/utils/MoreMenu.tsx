import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { GoToBountyPage } from '@/utils/Routes';

import Icon from './Icon';
import { Overlay } from './Overlay';
import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
    <div className="relative flex gap-1 items-center justify-end">
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
            className="z-50 absolute top-0 bg-surface text-on-surface-p1 py-4 pl-4 pr-6 translate-y-8 -translate-x-2 rounded-md flex flex-col items-start gap-6"
          >
            <button
              className="flex gap-2 items-center w-full hover:text-on-surface-p0"
              onClick={ManageShare}
            >
              <Icon icon="reply" displayClasses="scale-x-[-1]" />
              <span className="font-semibold">Share</span>
            </button>
            <button
              className="flex gap-2 items-center w-full hover:text-on-surface-p0"
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
