import { Button, ButtonStyle } from '@/components/utils/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { ClientNotification, NotificationStyle } from './iNotification';

function setStyle(style?: NotificationStyle) {
  switch (style) {
    case NotificationStyle.error:
      return {
        container: 'bg-redDark',
        title: 'text-white',
        content: 'text-text',
      };
    case NotificationStyle.success:
      return {
        container: 'bg-greenDark',
        title: 'text-white',
        content: 'text-white',
      };
    default:
      return {
        container: 'bg-purpleDark',
        title: 'text-white',
        content: 'text-unactive',
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
    const { title, content, icon, style } = notif;

    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className={`w-screen z-50 fixed ${setStyle(style).container}`}
          >
            <div
              className="mx-auto flex items-center justify-between
            tablet:max-w-5xl desktop:max-w-7xl
            py-2 px-8 laptop:p-0"
            >
              <div className="p-2">
                <p className={`label ${setStyle(style).title}`}>{title}</p>
                <div className={`text-xs ${setStyle(style).content}`}>
                  {content}
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
