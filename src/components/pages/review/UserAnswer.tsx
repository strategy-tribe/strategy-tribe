import Icon from '@/components/utils/Icon';
import { SubmissionContent } from '@/lib/models/submission';
import React, { useState } from 'react';
import { NumberSelector } from './NumberSelector';

export function UserAnswer({
  answer,
  num,
}: {
  answer: SubmissionContent;
  num: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div key={answer.requirement.title} className="space-y-2">
      <button
        className="flex gap-2 label items-center group justify-between w-full text-on-surface-unactive hover:text-on-surface-p0"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-2 label items-center w-full">
          <NumberSelector num={num} colors="bg-surface text-on-surface-p0" />
          <p>{answer.requirement.title}</p>
        </div>

        <Icon icon={expanded ? 'expand_less' : 'expand_more'} />
      </button>

      {expanded && (
        <p className="pl-8 body-sm whitespace-pre-wrap">{answer.answer}</p>
      )}
    </div>
  );
}
