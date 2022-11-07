import { Requirement, RequirementType } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

import Icon from '@/components/utils/Icon';

import { NumberSelector } from './NumberSelector';

export function UserAnswer({
  content: answer,
  num,
  requirement,
}: {
  requirement: Requirement;
  content: string | string[];
  num: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div key={requirement.title} className="space-y-2">
      <button
        className="flex gap-2 label items-center group justify-between w-full text-on-surface-unactive hover:text-on-surface-p0"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-2 label items-center w-full">
          <NumberSelector num={num} colors="bg-surface text-on-surface-p0" />
          <p>{requirement.title}</p>
        </div>

        <Icon icon={expanded ? 'expand_less' : 'expand_more'} />
      </button>

      {expanded && (
        <>
          {typeof answer === 'string' ? (
            <p className="pl-8 body">
              <span className="inline">{answer}</span>
            </p>
          ) : (
            <>
              {requirement.type === RequirementType.IMAGE && (
                <div className="flex flex-col gap-4 pt-4">
                  {(answer ?? []).map((url) => {
                    return (
                      <figure key={url} className="relative">
                        <Image
                          src={url}
                          width={1920}
                          height={1080}
                          alt="preview for image"
                        />
                      </figure>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
