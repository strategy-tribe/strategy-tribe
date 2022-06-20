import { ImageGallery } from '@/components/utils/ImageGallery';
import { useNewSubmissionContext } from '@/pages/app/bounty/[id]/new';
import React from 'react';
import FromBounty from '@/components/utils/FromBounty';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');

export function ReviewSubmission() {
  const { userAnswers, bountyId, backToEdit } = useNewSubmissionContext();

  if (!userAnswers) return <span></span>;

  return (
    <>
      <div className="space-y-1">
        <Title title="Review submission" />
        {/* Bounty name */}
        <FromBounty bountyId={bountyId} />
      </div>

      <div className="space-y-8">
        {userAnswers.map((answer, i) => {
          const input = answer.input;
          const title = answer.requirement.title;
          return (
            <div key={i}>
              <h6 className="label text-white">{title}</h6>
              {typeof input === 'string' && (
                <p className="whitespace-pre-line">
                  {input === '' ? 'None' : input}
                </p>
              )}
              {typeof input === 'object' && <ImageGallery files={input} />}
            </div>
          );
        })}
      </div>
    </>
  );
}
