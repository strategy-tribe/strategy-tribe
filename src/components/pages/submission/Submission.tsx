import FromBounty from '@/components/utils/FromBounty';
import { GetDateInString } from '@/utils/DateHelpers';
import Image from 'next/image';
import React from 'react';
import { RequirementType } from '@/lib/models/requirement';
import { Stat } from './Stat';
import { SubmissionStatus } from '../bounty/SubmissionStatus';
import { Submission as SubmissionData } from '@/lib/models';
import { useAuth } from 'auth/AuthContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToReviewSubmissionPage } from '@/lib/utils/Routes';

export function Submission({ submission }: { submission: SubmissionData }) {
  const date = submission ? submission.createdAt : '';

  const { isStaff } = useAuth();

  return (
    <div className="text-text space-y-6 p-2 pb-16 mx-auto max-w-5xl">
      <header className="flex justify-between">
        <div className="space-y-6">
          <FromBounty bountyId={submission.bountyId as string} />

          <Stat
            title="User ID"
            content={submission.owner}
            copyable={true}
            size="text-sm"
          />
          <Stat
            title="Submission ID"
            content={submission.id as string}
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
        {isStaff && (
          <Button
            info={{
              className: 'h-fit',
              icon: 'edit',
              label: 'Review',
              style: ButtonStyle.Filled,
              isALink: GoToReviewSubmissionPage(submission.id!),
            }}
          />
        )}
      </header>

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
        {submission?.answers.map((content, i) => {
          return (
            <div key={i}>
              <p className="label text-unactive">{content.requirement.title}</p>
              {content.requirement.type !== RequirementType.Image && (
                <p className="whitespace-pre-line">{content.answer}</p>
              )}
              <div className="grid grid-cols-3 gap-4 relative pt-4">
                {content.requirement.type === RequirementType.Image &&
                  !!(content.answer as string[]) &&
                  (content.answer as string[]).map((url) => {
                    return (
                      <figure key={url} className="relative">
                        <Image src={url} priority width={1920} height={1080} />
                      </figure>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

//whitespace-pre-line max-w-lg first-letter:capitalize
