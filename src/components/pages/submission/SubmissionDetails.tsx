import FromBounty from '@/components/utils/FromBounty';
import { useGetSubmission } from '@/hooks/submissionHooks';
import { GetDateInString } from '@/utils/DateHelpers';
import { GoTo404Page, GoToBountiesPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Loading from '@/components/utils/Loading';
import { RequirementType } from '@/lib/models/requirement';
import { Stat } from './Stat';
import { SubmissionStatus } from '../bounty/SubmissionStatus';

export function SubmissionDetails({
  bountyId,
  submissionId,
}: {
  bountyId: string;
  submissionId: string;
}) {
  //Get the submission
  const { submission, isLoading, error } = useGetSubmission(
    submissionId as string,
    Boolean(submissionId as string)
  );

  //info of the user
  const { isAuthenticated, userId: user, isStaff } = useAuth();
  //router
  const router = useRouter();
  //cannot see the details of a submission if the user isnt staff
  useEffect(() => {
    if (!submission) return;
    else if (!isStaff && submission.owner !== user) {
      router.push(GoToBountiesPage());
    }
  }, [submission, isAuthenticated, isStaff]);

  const date = submission ? submission.createdAt : '';

  useEffect(() => {
    if (!isLoading && !submission && error) {
      router.push(GoTo404Page());
    }
  }, [isLoading, submission, error]);

  if (!Boolean(submissionId as string) || isLoading || !submission)
    return <Loading small={false} />;
  else
    return (
      <div className="text-text space-y-6 p-2 pb-16 mx-auto max-w-5xl">
        <FromBounty bountyId={bountyId as string} />

        {/* Stats */}
        {submission && (
          <div className="space-y-6">
            <Stat
              title="User ID"
              content={submission.owner}
              copyable={true}
              size="text-sm"
            />
            <Stat
              title="Submission ID"
              content={submissionId as string}
              copyable={true}
              size="text-sm"
            />
            <Stat
              title="Submitted"
              size="text-sm"
              content={`${GetDateInString(
                submission.createdAt
              )} ago - ${date.toLocaleString()}`}
            />

            <SubmissionStatus status={submission.state} />
          </div>
        )}

        <hr className="w-1/2 text-dark" />

        {/* Content */}
        <div className="flex items-start space-x-4 snap-x overflow-x-auto">
          {submission?.answers
            .filter((c) => c.requirement.type === RequirementType.Image)
            .map((content, i) => {
              if (typeof content.answer === 'string') {
                return (
                  <figure
                    key={i}
                    className="relative aspect-video shrink-0 w-[20rem]"
                  >
                    <Image
                      src={content.answer}
                      alt={`Image #${i}`}
                      layout="fill"
                      className="object-cover"
                      priority={true}
                    />
                  </figure>
                );
              } else if (typeof content.answer === 'object') {
                content.answer.map((image, x) => {
                  return (
                    <figure
                      key={x}
                      className="relative aspect-video shrink-0 w-[20rem]"
                    >
                      <Image
                        src={image}
                        alt={`Image #${i}`}
                        layout="fill"
                        className="object-cover"
                        priority={true}
                      />
                    </figure>
                  );
                });
              }
            })}
        </div>
        <div className="space-y-8">
          {submission?.answers.map((x, i) => {
            return (
              <div key={i}>
                <p className="label text-unactive">{x.requirement.title}</p>
                {typeof x.answer === 'string' && (
                  <p className="whitespace-pre-line">{x.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
}

//whitespace-pre-line max-w-lg first-letter:capitalize
