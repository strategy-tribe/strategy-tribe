import Icon from '@/components/utils/Icon';
import { useState } from 'react';

export function FAQuestion({
  question,
  answer,
  height = 'h-10',
}: {
  height?: string;
  question: string;
  answer: string | JSX.Element;
}) {
  const [expanded, setExpanded] = useState(false);
  const expandedHeight =
    typeof answer === 'string'
      ? answer.length > 60
        ? 'h-24'
        : height
      : height;
  return (
    <div
      className={`transition-all ease-out ${expanded ? expandedHeight : 'h-6'}`}
    >
      <div
        className="flex gap-2 items-center w-full text-white cursor-pointer group"
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
  );
}
