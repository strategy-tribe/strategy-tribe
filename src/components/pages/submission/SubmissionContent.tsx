import { Requirement, RequirementType } from '@prisma/client';

import { useSubmitterInfo } from '@/lib/hooks/submission';

import { useAuth } from '@/auth/AuthContext';

import { useSubmissionContext } from './SubmissionContext';
import { SubmissionDetail } from './SubmissionDetail';

export function SubmissionContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="space-y-4">
        <UserStats />
        <Title />
      </div>

      <div className="space-y-8">
        <UserAnswers />
      </div>
    </div>
  );
}

function Title() {
  const submission = useSubmissionContext().submission;

  const { isStaff, isAdmin } = useAuth();

  return (
    <h2 className="title-sm text-on-surface-p0">
      {isStaff || isAdmin
        ? `Submission by ${submission.id}`
        : 'Your submission'}
    </h2>
  );
}

function UserStats() {
  const { submission, bounty } = useSubmissionContext();

  const { isStaff, isAdmin } = useAuth();

  const { data: submitterInfo } = useSubmitterInfo(
    {
      bountySlug: bounty?.slug ?? '',
      submitterId: submission.author?.id as string,
      address: submission.author?.address as string,
    },
    !!bounty?.slug
  );

  return (
    <>
      {(isStaff || isAdmin) && submitterInfo && (
        <div className="space-y-2 rounded-lg border-2 border-surface p-4">
          <h3 className="h5">User stats</h3>
          <div className="flex gap-8">
            <SubmissionDetail
              label="Has submitted to this bounty"
              value={`${submitterInfo.bountySubmissions} times`}
            />
            <SubmissionDetail
              label="Total submissions"
              value={`${submitterInfo.totalSubmissions}`}
            />

            <SubmissionDetail
              label="Submissions allowed for today"
              value={`${submitterInfo.submissionsAllowed}`}
            />
          </div>
        </div>
      )}
    </>
  );
}

function UserAnswers() {
  const { submission } = useSubmissionContext();

  return (
    <>
      {submission.answers?.map((anw, i) => {
        return (
          <div key={i} className="space-y-1">
            <span className="label text-on-surface-unactive">
              {anw.requirement?.title}
            </span>

            {/* TODO: make changes for images */}
            {anw.requirement?.type === RequirementType.Image && (
              <div className="grid grid-cols-3 gap-4 pt-4">
                {previewImage(anw)}
              </div>
            )}

            {anw.requirement?.type !== RequirementType.Image && (
              <p className="body whitespace-pre-wrap">{anw.answer}</p>
            )}
          </div>
        );

        function previewImage(anw: {
          requirement: Requirement | null;
          answer: string;
        }) {
          return (
            anw.answer && (
              <figure key={anw.answer ?? ''} className="relative">
                <img
                  src={anw.answer}
                  width={1920}
                  height={1080}
                  alt="preview for image"
                />
              </figure>
            )
          );
        }
      })}
    </>
  );
}
