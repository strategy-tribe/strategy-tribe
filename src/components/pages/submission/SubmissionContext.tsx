import React, { createContext, useContext } from 'react';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { Bounty, Submission, SubmissionState } from '@/lib/models';

interface iSubmissionContext {
  submission: Submission;
  bounty: Bounty | undefined;
}
const SubmissionContext = createContext<iSubmissionContext>({
  submission: {
    id: '',
    answers: [],
    bountyId: '',
    createdAt: new Date(),
    owner: '',
    state: SubmissionState.Accepted,
  },
  bounty: undefined,
});

export const SubmissionContextProvider = ({
  children,
  submission,
}: {
  children: React.ReactNode;
  submission: Submission;
}) => {
  const { bounty } = useGetBounty(submission.bountyId);

  return (
    <SubmissionContext.Provider value={{ bounty, submission }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissionContext = () => {
  return useContext(SubmissionContext);
};
