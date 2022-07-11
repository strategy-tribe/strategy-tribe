import FromBounty from '@/components/utils/FromBounty';
import { GoToNewSubmissionPage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import Icon, { IconSize } from '@/components/utils/Icon';
import { Section } from '@/components/pages/landing/Section';
import { Button, ButtonStyle } from '@/components/utils/Button';

const BeforeNewSubmission: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const go = () => router.push(GoToNewSubmissionPage(id as string));
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
      <div className="space-y-6">
        <div className="mx-auto max-w-5xl">
          <FromBounty bountyId={id as string} title="You are submitting to" />
        </div>

        <div className="bg-darker rounded space-y-10 px-8 pt-6 pb-10 mx-auto max-w-5xl">
          <header className="space-y-1">
            <h1 className="h4">Rules for Submitting</h1>

            <div className="flex items-center gap-3 text-redLight">
              <Icon icon="report" />
              <span>
                You need to read the rules before submitting your findings
              </span>
            </div>
          </header>

          <p className="max-w-3xl">
            When submitting your findings, you agree to our terms of service.
            <br />
            <br />
            All the information in the findings you submit must be valid and
            correct. To successfully submit your findings, you must fill in all
            the required fields.
            <br />
            <br />
            Be mindful that StrategyTribe does not guarantee all submissions
            will be reviewed.
            <br />
            <br />
            Bounties and their rewards are awarded on a “first come, first
            served” basis; someone might have submitted their findings before
            you and therefore be reviewed and awarded the reward.
          </p>

          <div className="space-y-8">
            <Button
              info={{
                label: 'Our Terms of Service',
                icon: 'arrow_forward',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                isALink: '#',
                removeMinWidth: true,
                className: 'w-fit',
              }}
            />
            <Button
              info={{
                label: 'Judging Criteria',
                icon: 'arrow_forward',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                isALink: '#',
                removeMinWidth: true,
                className: 'w-fit',
              }}
            />
            <Button
              info={{
                label: 'Privacy Policy',
                icon: 'arrow_forward',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                isALink: '#',
                removeMinWidth: true,
                className: 'w-fit',
              }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl flex gap-8 items-center px-8">
          <Button
            info={{
              icon: 'block',
              label: "I don't agree",
              style: ButtonStyle.Hollow,
              isALink: '#',
              className: 'w-fit',
              onClick: () => router.back(),
            }}
          />
          <Button
            info={{
              icon: 'handshake',
              label: 'I agree',
              style: ButtonStyle.Filled,
              isALink: '#',
              className: 'w-fit',
              onClick: () => router.push(GoToNewSubmissionPage(id as string)),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BeforeNewSubmission;
BeforeNewSubmission.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
