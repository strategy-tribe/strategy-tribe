import { Submission } from '@prisma/client';
import React, { createContext, useContext } from 'react';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { FullBounty, FullSubmission } from '@/lib/types';

interface iSubmissionContext {
  submission: FullSubmission;
  bounty: FullBounty | undefined;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const SubmissionContext = createContext<iSubmissionContext>();

export const SubmissionContextProvider = ({
  children,
  submission,
}: {
  children: React.ReactNode;
  submission: Submission;
}) => {
  const { bounty } = useGetBounty(submission.bountyId ?? '');

  return (
    <SubmissionContext.Provider value={{ bounty, submission }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmissionContext = () => {
  return useContext(SubmissionContext);
};
