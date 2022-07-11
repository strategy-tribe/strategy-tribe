import { GoToBountyPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BountyDetails } from '@/components/utils/BountyDetails';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import Evaluate from '@/components/pages/submission/review/Evaluate';
import { SubmissionDetails } from '@/components/pages/submission/SubmissionDetails';

export enum ReviewSections {
  Bounty = 'Bounty',
  Submission = 'Submission',
  Evaluate = 'Evaluate',
}

const ReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: bountyId, submissionId } = router.query;
  const { userId: user } = useAuth();

  const [view, setView] = useState<ReviewSections>(ReviewSections.Bounty);

  return (
    <>
      <Head>
        <title>ST | Review</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-2 space-y-6 text-sm mx-auto max-w-5xl">
        {/* Evaluating as */}
        <div className="flex flex-col">
          <span className="text-white font-grotesk text-sm font-medium">
            Evaluating As
          </span>
          <button
            className="text-purpleLight text-sm font-medium w-fit"
            onClick={() => router.push(GoToBountyPage(bountyId as string))}
          >
            {user}
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
        {view === ReviewSections.Bounty && (bountyId as string) && (
          <BountyDetails bountyId={bountyId as string} view={view} />
        )}
        {view === ReviewSections.Submission && (
          <SubmissionDetails
            bountyId={bountyId as string}
            submissionId={submissionId as string}
          />
        )}
        {view === ReviewSections.Evaluate && (
          <Evaluate submissionId={submissionId as string} />
        )}
      </div>
    </>
  );
};

export default ReviewPage;
ReviewPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
