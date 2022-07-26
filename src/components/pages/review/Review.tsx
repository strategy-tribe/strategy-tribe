import Icon, { IconSize } from '@/components/utils/Icon';
import { Submission as SubmissionData } from '@/lib/models';
import React, { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { SubmitReviewButton } from '../submission/new submission/review/Evaluate';
import { useAuth } from 'auth/AuthContext';
import { GetWordCount } from '@/lib/utils/StringHelpers';
import { RenderMarkdown } from '../../utils/RenderMarkdown';
import { ReviewCheck } from './ReviewCheck';
import { ReviewView } from './ReviewView';
import { ReviewMap } from './ReviewMap';

export function Review({ submission }: { submission: SubmissionData }) {
  const [feasible, setFeasible] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [view, setView] = useState(ReviewView.Edit);

  const feedbackIsOk = !!feedback && GetWordCount(feedback) >= 10;

  useEffect(() => {
    if (!feasible) {
      setCorrect(false);
    }
  }, [feasible]);

  const { userId, isStaff } = useAuth();

  return (
    <div className="flex gap-x-16">
      <ReviewMap submission={submission} />

      <div className="space-y-4 w-full max-w-4xl">
        <h1 className="h4">Reviewing submission</h1>

        <div className="space-y-8">
          <ReviewCheck
            check={{
              whenOn: 'I can replicate the steps the user wrote',
              whenOff: 'I can not replicate the steps the user wrote',
              value: feasible,
              setValue: setFeasible,
            }}
            num={1}
            question="Read carefully the submission, can you replicate the steps of the user?"
          />

          <ReviewCheck
            check={{
              whenOn: 'I can replicate the steps the user wrote',
              whenOff: 'I can not replicate the steps the user wrote',
              value: correct,
              setValue: setCorrect,
              disabled: !feasible,
            }}
            num={2}
            question="Did you arrived to the same results as the user?"
          />

          <ReviewCheck
            num={3}
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
                      className={`py-2 px-5 rounded label ${
                        active ? 'bg-dark' : 'hover:bg-darker'
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
                    className="bg-black text-text border border-disabled focus:border-unactive rounded border-dashed w-full font-inter focus:ring-0 first-letter:capitalize whitespace-pre-wrap p-4 body"
                    onChange={(e) => setFeedback(e.target.value)}
                    value={feedback}
                    minRows={10}
                  />
                )}

                {view === ReviewView.Preview && (
                  <div
                    className={`p-4 border-dark rounded min-h-[17.1rem] ${
                      feedback === '' ? '' : 'border'
                    }`}
                  >
                    {!feedback && (
                      <div className="pb-4 border-b-1 border-dark text-unactive flex gap-2 items-center">
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

        {userId && isStaff && (
          <SubmitReviewButton
            submission={submission}
            review={{
              feedback: feedback,
              meetsRequirements: feasible && correct && feedbackIsOk,
              reviewer: userId,
            }}
          />
        )}
      </div>
    </div>
  );
}
