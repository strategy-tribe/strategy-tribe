import { Requirement, RequirementType } from '@prisma/client';
import { useState } from 'react';

import Icon from '@/components/utils/Icon';

import { NumberSelector } from './NumberSelector';
import { RenderHow } from './RenderHow';

export function UserAnswer({
  content: answer,
  num,
  requirement,
}: {
  requirement: Requirement | null;
  content: string | string[];
  num: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-2">
      <button
        className="label group flex w-full items-center justify-between gap-2 text-on-surface-unactive hover:text-on-surface-p0"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="label flex w-full items-center gap-2">
          <NumberSelector num={num} colors="bg-surface text-on-surface-p0" />
          <p>{requirement?.title ?? 'Unknown'}</p>
        </div>

        <Icon icon={expanded ? 'expand_less' : 'expand_more'} />
      </button>

      {expanded && (
        <>
          {requirement?.type === RequirementType.Image ? (
            <div className="flex flex-col gap-4 pt-4">
              <figure key={answer as string} className="relative">
                <img
                  src={answer as string}
                  width={1920}
                  height={1080}
                  alt="preview for image"
                />
              </figure>
            </div>
          ) : requirement?.title?.includes('How did you find this info') ? (
            <RenderHow code={answer as string} />
          ) : (
            <p className="body whitespace-pre-wrap break-words pl-8">
              {answer}
            </p>
          )}
        </>
      )}
    </div>
  );
}
