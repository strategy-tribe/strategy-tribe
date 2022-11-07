import { RequirementType } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';

import { useSubmitterInfo } from '@/lib/hooks/submissionHooks';
import { FullSubmission } from '@/lib/types';

import { useSubmissionContext } from './SubmissionContext';
import { SubmissionDetail } from './SubmissionDetail';

export function SubmissionContent() {
  return (
    <div className="max-w-5xl mx-auto space-y-4">
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
  const submission = useSubmissionContext().submission as FullSubmission;

  const { isStaff, isAdmin } = useAuth();

  return (
    <h2 className="title-sm text-on-surface-p0">
      {isStaff || isAdmin
        ? `Submission by ${submission.authorId}`
        : 'Your submission'}
    </h2>
  );
}

function UserStats() {
  const { submission, bounty } = useSubmissionContext();

  const { isStaff, isAdmin } = useAuth();

  const { data: submitterInfo } = useSubmitterInfo(
    submission.authorId as string,
    bounty?.id as string,
    Boolean(submission.authorId as string) && Boolean(bounty?.id)
  );

  return (
    <>
      {(isStaff || isAdmin) && submitterInfo && (
        <div className="p-4 space-y-2 border-2 rounded-lg border-surface">
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

            {/* TODO: update right number */}
            <SubmissionDetail
              label="Submissions allowed for today"
              value={`${568}`}
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
              {anw.requirement.title}
            </span>

            {/* TODO: make changes for images */}
            {/* {anw.requirement.type === RequirementType.Image && (
              <div className="grid grid-cols-3 gap-4 pt-4">
                {(anw.answer as string[]).map((url) => {
                  return (
                    <figure key={url} className="relative">
                      <Image
                        src={url}
                        priority
                        width={1920}
                        height={1080}
                        alt="preview for image"
                      />
                    </figure>
                  );
                })}
              </div>
            )} */}

            {anw.requirement.type !== RequirementType.IMAGE && (
              <p className="whitespace-pre-wrap body">{anw.answer}</p>
            )}
          </div>
        );
      })}
    </>
  );
}
