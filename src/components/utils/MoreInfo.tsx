import { AnimatePresence, motion } from 'framer-motion';

export function MoreInfo({
  content,
  translate = 'translate-x-2 -translate-y-10',
}: {
  content: string | React.ReactNode;
  translate?: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute z-50 hidden 
                min-w-[20rem] rounded-lg 
                bg-surface
                p-4
                text-on-surface-p1 drop-shadow-2xl laptop:group-hover:block
                ${translate}`}
      >
        <div>{content}</div>
      </motion.div>
    </AnimatePresence>
  );
}
