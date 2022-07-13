import { ImageGallery } from '@/components/utils/ImageGallery';
import React from 'react';
import { useNewSubmissionContext } from './NewSubmissionContext';
('@/components/utils/Title');

export function ReviewSubmission() {
  const { userAnswers } = useNewSubmissionContext();

  if (!userAnswers) return <span></span>;

  return (
    <div className="space-y-6">
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
  );
}
