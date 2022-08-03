import Image from 'next/image';
import { useState } from 'react';

import { RequirementType } from '@/lib/models/requirement';
import { SubmissionContent } from '@/lib/models/submission';

import Icon from '@/components/utils/Icon';

import { NumberSelector } from './NumberSelector';

export function UserAnswer({
  content,
  num,
}: {
  content: SubmissionContent;
  num: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div key={content.requirement.title} className="space-y-2">
      <button
        className="flex gap-2 label items-center group justify-between w-full text-on-surface-unactive hover:text-on-surface-p0"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex gap-2 label items-center w-full">
          <NumberSelector num={num} colors="bg-surface text-on-surface-p0" />
          <p>{content.requirement.title}</p>
        </div>

        <Icon icon={expanded ? 'expand_less' : 'expand_more'} />
      </button>

      {expanded && (
        <>
          {typeof content.answer === 'string' ? (
            <p className="pl-8 body">
              <span className="inline">{content.answer}</span>
            </p>
          ) : (
            <>
              {content.requirement.type === RequirementType.Image && (
                <div className="flex flex-col gap-4 pt-4">
                  {(content.answer ?? []).map((url) => {
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
