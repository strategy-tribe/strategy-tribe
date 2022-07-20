import React, { createContext, useContext } from 'react';
import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { Bounty, Submission } from '@/lib/models';

interface iSubmissionContext {
  submission: Submission;
  bounty: Bounty | undefined;
}
//@ts-ignore
const SubmissionContext = createContext<iSubmissionContext>();

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
