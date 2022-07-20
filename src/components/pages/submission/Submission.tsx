import React from 'react';
import { Submission as SubmissionData } from '@/lib/models';
import { SubmissionHeader } from './SubmissionHeader';
import { SubmissionBody } from './SubmissionBody';
import { SubmissionContextProvider } from './SubmissionContext';

export function Submission({ submission }: { submission: SubmissionData }) {
  return (
    <SubmissionContextProvider submission={submission}>
      <div className="space-y-8">
        <SubmissionHeader />
        <SubmissionBody />
      </div>
    </SubmissionContextProvider>
  );
}
