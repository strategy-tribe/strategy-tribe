import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export function MoreInfo({
  content,
  translate = 'translate-x-2 -translate-y-20',
}: {
  content: string | JSX.Element;
  translate?: string;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={`absolute min-w-[20rem] p-4 
                bg-dark text-text 
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
