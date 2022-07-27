import React from 'react';
import { useAuth } from 'auth/AuthContext';
import { RequirementType } from '@/lib/models/requirement';
import Image from 'next/image';
import { useSubmissionContext } from './SubmissionContext';

export function SubmissionContent() {
  const { submission } = useSubmissionContext();
  const { isStaff } = useAuth();

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h2 className="title-sm text-on-surface-p0">
        {isStaff ? 'Submission' : 'Your submission'}
      </h2>

      <div className="space-y-8">
        {submission.answers.map((anw, i) => {
          return (
            <div key={i} className="space-y-1">
              <span className="label text-on-surface-unactive">
                {anw.requirement.title}
              </span>

              {anw.requirement.type === RequirementType.Image && (
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {(anw.answer as string[]).map((url) => {
                    return (
                      <figure key={url} className="relative">
                        <Image src={url} priority width={1920} height={1080} />
                      </figure>
                    );
                  })}
                </div>
              )}

              {anw.requirement.type !== RequirementType.Image && (
                <p className="whitespace-pre-wrap body">{anw.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
