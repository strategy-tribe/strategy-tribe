import { AnimatePresence, motion } from 'framer-motion';

import Icon from '../utils/Icon';
import { ClientNotification, NotificationStyle } from './iNotification';

const position = ' z-50 fixed bottom-4 mx-auto';
const width = 'max-w-lg w-full';
const padding = 'rounded-lg p-4 ';
const text = ' text-sm font-medium  ';
const display = 'space-y-2';

function setStyle(style?: NotificationStyle) {
  switch (style) {
    case NotificationStyle.error:
      return {
        container: 'bg-error-light',
        title: 'text-on-color opacity-90',
        content: 'text-on-color opacity-80',
        icon: 'text-on-color hover:text-on-surface-disabled',
      };
    case NotificationStyle.success:
      return {
        container: 'bg-success',
        title: 'text-on-surface-p0',
        content: 'text-on-surface-p0',
        icon: 'text-on-color hover:text-on-surface-disabled',
      };
    case NotificationStyle.dark:
      return {
        container: 'bg-surface-dark',
        content: 'text-on-surface-p1',
        title: 'text-on-surface-p0',
        icon: 'text-on-color hover:text-on-surface-disabled',
      };
    default:
      return {
        container: 'bg-surface',
        content: 'text-on-surface-p1',
        title: 'text-on-surface-p0',
        icon: 'text-on-color hover:text-on-surface-disabled',
      };
  }
}

export function Pill({
  notif,
  show,
  close,
}: {
  notif?: ClientNotification;
  show: boolean;
  close: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            exit={{ opacity: 0, y: 100, transition: { duration: 0.4 } }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
              },
            }}
            className={`${display} ${position} ${
              setStyle(notif?.style).container
            } ${width} ${padding} ${text}`}
          >
            <div className="flex justify-between gap-2 items-center ">
              {notif?.title && (
                <span className={setStyle(notif?.style).title}>
                  {notif.title}
                </span>
              )}
              <button
                onClick={() => close()}
                className="grid place-items-center"
              >
                <Icon className={setStyle(notif?.style).icon} icon="close" />
              </button>
            </div>

            {notif?.content && (
              <div
                className={`text-sm shrink-0 ${setStyle(notif?.style).content}`}
              >
                <>
                  {notif?.content &&
                    typeof notif?.content === 'string' &&
                    notif?.content}
                  {notif?.content &&
                    typeof notif?.content === 'function' &&
                    notif?.content(close)}
                </>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
