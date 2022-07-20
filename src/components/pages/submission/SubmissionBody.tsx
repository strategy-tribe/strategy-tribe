import React from 'react';
import { useAuth } from 'auth/AuthContext';
import { useSubmissionContext } from './SubmissionContext';
import { SubmissionDetails } from './SubmissionDetails';
import { SubmissionContent } from './SubmissionContent';
import { SubmissionReview } from './SubmissionReview';

export function SubmissionBody() {
  const { submission } = useSubmissionContext();
  return (
    <div className="space-y-8">
      <SubmissionDetails />
      <SubmissionContent />
      <SubmissionReview />
    </div>
  );
}
