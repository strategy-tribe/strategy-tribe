import { AnimatePresence, motion } from 'framer-motion';

export function MoreInfo({
  content,
  translate = 'translate-x-2 -translate-y-20',
}: {
  content: string | React.ReactNode;
  translate?: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute min-w-[20rem] p-4 
                bg-surface text-on-surface-p1 
                drop-shadow-2xl
                rounded-lg
                hidden laptop:group-hover:block z-50
                ${translate}`}
      >
        <div>{content}</div>
      </motion.div>
    </AnimatePresence>
  );
}
