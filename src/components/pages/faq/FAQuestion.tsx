import { motion } from 'framer-motion';
import { useState } from 'react';

import Icon from '@/components/utils/Icon';

export function FAQuestion({
  question,
  answer,
  height = 'h-10',
}: {
  height?: string;
  question: string;
  answer: string | React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const expandedHeight =
    typeof answer === 'string'
      ? answer.length > 60
        ? 'h-24'
        : height
      : height;
  return (
    <motion.div
      className={`transition-all ease-out ${
        expanded ? expandedHeight : 'h-6'
      } max-w-lg`}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex gap-2 items-center w-full cursor-pointer group text-on-surface-p0"
        onClick={() => setExpanded(!expanded)}
      >
        <Icon
          icon="expand_more"
          className={`transition-transform ease-in-out ${
            expanded ? '' : 'rotate-[-90deg]'
          }`}
        />
        <p className="font-grotesk font-semibold group-hover:underline">
          {question}
        </p>
      </div>

      <div className="text-on-surface-p1">
        {typeof answer === 'string' && (
          <p
            className={`first-letter:capitalize ease-out transition-all ml-8 ${
              expanded ? '' : '-translate-y-1 opacity-0 pointer-events-none'
            }`}
          >
            {answer}
          </p>
        )}
        {typeof answer !== 'string' && (
          <div
            className={`first-letter:capitalize ease-out transition-all ml-8 ${
              expanded ? '' : '-translate-y-1 opacity-0 pointer-events-none'
            }`}
          >
            {answer}
          </div>
        )}
      </div>
    </motion.div>
  );
}
