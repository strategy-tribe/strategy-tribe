import Navbar from '@/components/navbar/Navbar';
import { GoToBountyPage, GoToSubmissionPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BountyDetails } from '@/components/utils/BountyDetails';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import Evaluate from '@/components/pages/submission/review/Evaluate';
import { SubmissionDetails } from '@/components/pages/submission/SubmissionDetails';

const ReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: bountyId, submissionId } = router.query;
  const { userId: user } = useAuth();

  const [section, setSection] = useState<'Bounty' | 'Submission' | 'Evaluate'>(
    'Bounty'
  );

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
      <Navbar
        className="px-2 space-y-6 text-sm mx-auto max-w-5xl"
        setUp={{
          useBackArrow: true,
          leftLabel: 'Review Submission',
          useOverflowMenu: true,
          goBack: () =>
            router.push(
              GoToSubmissionPage(bountyId as string, submissionId as string)
            ),
        }}
      >
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
          <li
            className={`${
              section === `Bounty` ? 'text-white font-semibold' : ''
            } cursor-pointer`}
            onClick={() => {
              setSection('Bounty');
            }}
          >
            Bounty
          </li>
          <li
            className={`${
              section === `Submission` ? 'text-white font-semibold' : ''
            } cursor-pointer`}
            onClick={() => {
              setSection('Submission');
            }}
          >
            Submission
          </li>
          <li
            className={`${
              section === `Evaluate` ? 'text-white font-semibold' : ''
            } cursor-pointer`}
            onClick={() => {
              setSection('Evaluate');
            }}
          >
            Evaluate
          </li>
        </ul>

        {/* Actual section */}
        {section === 'Bounty' && <BountyDetails />}
        {section === 'Submission' && (
          <SubmissionDetails
            bountyId={bountyId as string}
            submissionId={submissionId as string}
          />
        )}
        {section === 'Evaluate' && (
          <Evaluate submissionId={submissionId as string} />
        )}
      </Navbar>
    </>
  );
};

export default ReviewPage;
ReviewPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
