import { ImageGallery } from '@/components/utils/ImageGallery';
import React from 'react';
import FromBounty from '@/components/utils/FromBounty';
import { Title } from '@/components/utils/Title';
import { useNewSubmissionContext } from './NewSubmissionContext';
import { Button } from '@/components/utils/Button';
('@/components/utils/Title');

export function ReviewSubmission() {
  const { userAnswers, bountyId, ctaButton } = useNewSubmissionContext();

  if (!userAnswers) return <span></span>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-y-1">
          <Title title="Review submission" />
          {/* Bounty name */}
          <FromBounty bountyId={bountyId} />
        </div>
        {ctaButton && (
          <div className="">
            <Button info={ctaButton} />
          </div>
        )}
      </div>

      <div className="space-y-8">
        {userAnswers.map((answer, i) => {
          const input = answer.input;
          const title = answer.requirement.title;
          return (
            <div key={i} className="space-y-1">
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
    </div>
  );
}
