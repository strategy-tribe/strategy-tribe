import FromBounty from '@/components/utils/FromBounty';
import { GoToNewSubmissionPage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import Icon from '@/components/utils/Icon';

const BeforeNewSubmission: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Head>
        <title>ST | Before Submitting</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-2 text-text space-y-6 mx-auto max-w-5xl">
        {/* Bounty name */}
        <div className="mx-auto laptop:max-w-3xl">
          {Boolean(id as string) && (
            <FromBounty bountyId={id as string} title="You are submitting to" />
          )}
        </div>

        <div className="mx-auto laptop:max-w-3xl space-y-6">
          {/* Rules */}
          <div className="space-y-4 p-4 pb-6 rounded-lg bg-purpleDark text-white group cursor-pointer">
            <div className="flex flex-col">
              <Icon icon="warning" />
              <span className="font-medium">Read before proceeding</span>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-grotesk font-bold text-3xl group-hover:underline">
                Rules for submitting
              </h2>
              <Icon
                className="group-hover:translate-x-2 transition-transform ease-in-out duration-500"
                icon="arrow_forward"
              />
            </div>
          </div>
        </div>

        {/* Continue */}
        <div className="space-y-4 flex flex-col items-center pt-24">
          <p className="text-center">
            You need to{' '}
            <span className="font-medium text-purpleLight hover:underline cursor-pointer">
              read the rules
            </span>{' '}
            before submitting your findings
          </p>
          <button
            className="bg-purpleDark text-white py-3 pl-4 pr-6 text-base rounded-full flex space-x-2 disabled:bg-disabled disabled:text-unactive"
            onClick={() => router.push(GoToNewSubmissionPage(id as string))}
          >
            <Icon icon="arrow_forward" />
            <span className="font-medium font-grotesk">Submit findings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BeforeNewSubmission;
BeforeNewSubmission.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
