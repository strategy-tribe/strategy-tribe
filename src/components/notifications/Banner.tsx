import { AnimatePresence, motion } from 'framer-motion';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { ClientNotification, NotificationStyle } from './iNotification';

function setStyle(style?: NotificationStyle) {
  switch (style) {
    case NotificationStyle.error:
      return {
        container: 'bg-error',
        title: 'text-on-color opacity-90',
        content: 'text-on-color opacity-80',
      };
    case NotificationStyle.success:
      return {
        container: 'bg-success',
        title: 'text-on-surface-p0',
        content: 'text-on-surface-p0',
      };
    default:
      return {
        container: 'bg-surface',
        title: 'text-on-surface-p0',
        content: 'text-on-surface-unactive',
      };
  }
}

export function Banner({
  notif,
  show,
  close,
}: {
  notif?: ClientNotification;
  show: boolean;
  close: () => void;
}) {
  if (notif) {
    const { title, content, style } = notif;

    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className={`bg  fixed z-50 w-screen ${setStyle(style).container}`}
          >
            <div
              className="mx-auto flex items-center justify-between
            py-2 px-8
            tablet:max-w-5xl laptop:p-0 desktop:max-w-7xl"
            >
              <div className="p-2">
                <p className={`h5 ${setStyle(style).title}`}>{title}</p>
                <div className={`body ${setStyle(style).content}`}>
                  {content && typeof content === 'string' && content}
                  {content && typeof content !== 'string' && content(close)}
                </div>
              </div>
              <Button
                info={{
                  icon: 'close',
                  removePadding: true,
                  removeMinWidth: true,
                  style: ButtonStyle.Text,
                  onClick: () => {
                    close();
                  },
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  return <span></span>;
}
