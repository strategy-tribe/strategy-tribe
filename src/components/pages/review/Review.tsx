import { BountyDetails } from '@/components/pages/review/BountyDetails';
import { Submission as SubmissionData } from '@/lib/models';
import { GoToBountyPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Evaluate from '../submission/new submission/review/Evaluate';
import { Submission } from '../submission/Submission';

export enum ReviewSections {
  Bounty = 'Bounty',
  Submission = 'Submission',
  Evaluate = 'Evaluate',
}

export function Review({ submission }: { submission: SubmissionData }) {
  const router = useRouter();

  const { userId } = useAuth();

  const [view, setView] = useState<ReviewSections>(ReviewSections.Bounty);

  return (
    <div className="px-2 space-y-6 text-sm mx-auto max-w-5xl">
      {/* Evaluating as */}
      <div className="flex flex-col">
        <span className="text-white font-grotesk text-sm font-medium">
          Evaluating As
        </span>
        <button
          className="text-purpleLight text-sm font-medium w-fit"
          onClick={() => router.push(GoToBountyPage(submission?.bountyId))}
        >
          {userId}
        </button>
      </div>

      {/* pick section */}
      <ul className="w-full flex space-x-6 items-center text-disabled">
        {Object.entries(ReviewSections).map((entries) => {
          const label = entries[0];
          const value = entries[1] as ReviewSections;
          return (
            <li
              key={label}
              className={`${
                view === value ? 'text-white font-semibold' : ''
              } cursor-pointer`}
              onClick={() => {
                setView(value);
              }}
            >
              {label}
            </li>
          );
        })}
      </ul>

      {/* Actual section */}
      {view === ReviewSections.Bounty && submission.bountyId && (
        <BountyDetails bountyId={submission.bountyId} view={view} />
      )}
      {!!submission && view === ReviewSections.Submission && (
        <Submission submission={submission} />
      )}
      {view === ReviewSections.Evaluate && (
        <Evaluate submissionId={submission.id!} />
      )}
    </div>
  );
}
