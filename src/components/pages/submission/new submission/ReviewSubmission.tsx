import { ImageGallery } from '@/components/utils/ImageGallery';

import { useNewSubmissionContext } from './NewSubmissionContext';
('@/components/utils/Title');

export function ReviewSubmission() {
  const { userAnswers, attachments } = useNewSubmissionContext();

  if (!userAnswers) return <span></span>;

  return (
    <div className="space-y-6">
      {userAnswers.map((answer, i) => {
        const input = answer.input;
        const title = answer.requirement.title;
        return (
          <div key={i} className="space-y-1">
            <h6 className="label text-on-surface-p0">{title}</h6>
            {typeof input === 'string' && (
              <p className="whitespace-pre-line">
                {input === '' ? 'None' : input}
              </p>
            )}
            {typeof input === 'object' && <ImageGallery files={input} />}
          </div>
        );
      })}

      {attachments && (
        <div className="space-y-2">
          <h6 className="label text-on-surface-p0">Attachments</h6>
          {!!attachments.length && <ImageGallery files={attachments ?? []} />}
          {!attachments.length && <span className="block">None</span>}
        </div>
      )}
    </div>
  );
}
