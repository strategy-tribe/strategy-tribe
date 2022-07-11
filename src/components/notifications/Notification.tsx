import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../utils/Icon';
import { ClientNotification } from './iNotification';

const colors = 'bg-dark text-white';
const position = ' z-50 fixed bottom-4 mx-auto';
const width = 'max-w-lg w-full';
const padding = 'rounded-lg p-4 ';
const text = ' text-sm font-medium  ';
const display = 'space-y-2';

export function Notification({
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
        <div className="max-w-5xl mx-auto border-2 border-purpleDark bg-redDark">
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
            className={`${display} ${position} ${colors} ${width} ${padding} ${text}`}
          >
            <div className="flex justify-between gap-2 items-center ">
              {notif?.title && <span>{notif.title}</span>}
              <button onClick={() => close()}>
                <Icon className="hover:text-purpleLight" icon="close" />
              </button>
            </div>

            {notif?.content && (
              <div className="text-unactive text-xs shrink-0">
                {notif.content}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
