import { Submission, SubmissionState } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';
import { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { GetWordCount } from '@/lib/utils/StringHelpers';

import { SubmissionStateDisplayer } from '@/components/pages/bounty/SubmissionStatus';
import { SubmitReviewButton } from '@/components/pages/submission/new submission/review/Evaluate';
import Icon, { IconSize } from '@/components/utils/Icon';
import { RenderMarkdown } from '@/components/utils/RenderMarkdown';

import { ReviewCheck } from './ReviewCheck';
import { ReviewMap } from './ReviewMap';
import { ReviewView } from './ReviewView';

export function Review({ submission }: { submission: Submission }) {
  const [carefullyRead, setCarefullyRead] = useState(false);

  const [feasible, setFeasible] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [view, setView] = useState(ReviewView.Edit);

  const feedbackIsOk = !!feedback && GetWordCount(feedback) >= 5;

  useEffect(() => {
    if (!feasible) {
      setCorrect(false);
    }
  }, [feasible]);

  const { account, isStaff, isAdmin } = useAuth();

  const meetsRequirements = correct && feasible;
  return (
    <div className="flex gap-x-16">
      <ReviewMap submission={submission} />

      <div className="w-full max-w-4xl space-y-4">
        <h1 className="h4">Reviewing submission</h1>

        <div className="space-y-8">
          <ReviewCheck
            check={{
              whenOn: 'I read the whole submission',
              whenOff: 'I have not read the whole submission',
              value: carefullyRead,
              setValue: setCarefullyRead,
            }}
            num={1}
            question="Read carefully the submission, can you replicate the steps of the user?"
          />

          <ReviewCheck
            check={{
              whenOn: 'I can replicate the steps the user wrote',
              whenOff: 'I can not replicate the steps the user wrote',
              value: feasible,
              setValue: setFeasible,
            }}
            num={2}
            question="Read carefully the submission, can you replicate the steps of the user?"
          />

          <ReviewCheck
            check={{
              whenOn: 'Yes, I arrived at the same results',
              whenOff: 'No, I did not arrive at the same results',
              value: correct,
              setValue: setCorrect,
              disabled: !feasible,
            }}
            num={3}
            question="Did you arrived to the same results as the user?"
          />

          <ReviewCheck
            num={4}
            question="Read carefully the submission, can you replicate the steps of the user?"
            check={{
              whenOn: 'Feedback message',
              whenOff: 'Write a feedback for the user longer than 10 words',
              value: feedbackIsOk,
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                {Object.entries(ReviewView).map((entry) => {
                  const active = entry[1] === view;
                  return (
                    <button
                      key={entry[0]}
                      onClick={() => setView(entry[1])}
                      className={`label rounded py-2 px-5 ${
                        active ? 'bg-surface' : 'hover:bg-surface-dark'
                      }`}
                    >
                      {entry[1]}
                    </button>
                  );
                })}
              </div>

              <div>
                {view === ReviewView.Edit && (
                  <ReactTextareaAutosize
                    placeholder="This input supports markdown"
                    className="body w-full whitespace-pre-wrap rounded border border-dashed border-on-surface-disabled bg-bg p-4 font-inter text-on-surface-p1 first-letter:capitalize focus:border-on-surface-unactive focus:ring-0"
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                    minRows={10}
                  />
                )}

                {view === ReviewView.Preview && (
                  <div
                    className={`min-h-[17.1rem] rounded border-surface p-4 ${
                      feedback === '' ? '' : 'border'
                    }`}
                  >
                    {!feedback && (
                      <div className="flex items-center gap-2 border-b-1 border-surface pb-4 text-on-surface-unactive">
                        <Icon icon="info" size={IconSize.Small} />
                        <span className="label">
                          Swap to edit and start writing your review
                        </span>
                      </div>
                    )}
                    {!!feedback && <RenderMarkdown text={feedback} />}
                  </div>
                )}
              </div>
            </div>
          </ReviewCheck>
        </div>

        {account && (isStaff || isAdmin) && (
          <div className="space-y-4">
            {!carefullyRead && (
              <div className="body flex items-center gap-2 text-error-light">
                <Icon icon="close" size={IconSize.Small} />
                <span>Have you read the submission?</span>
              </div>
            )}

            {!feedbackIsOk && (
              <div className="body flex items-center gap-2 text-error-light">
                <Icon icon="close" size={IconSize.Small} />
                <span>The feedback must be longer than 5 words</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <span>Your review will set this submission as: </span>
                <>
                  {meetsRequirements && (
                    <SubmissionStateDisplayer
                      status={SubmissionState.WaitingForPayment}
                    />
                  )}
                  {!meetsRequirements && (
                    <SubmissionStateDisplayer
                      status={SubmissionState.Rejected}
                    />
                  )}
                </>
              </div>
              <SubmitReviewButton
                submission={submission}
                review={{
                  feedback: feedback,
                  meetsRequirements,
                  reviewer: account,
                }}
                disabled={!carefullyRead || !feedbackIsOk}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
