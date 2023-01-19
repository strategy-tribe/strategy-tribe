import { motion } from 'framer-motion';
import Head from 'next/head';

import { GoToFAQPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import {
  AfterRead,
  CallToAction,
  CONTENT_STYLE,
  ReadingSection,
  SectionContent,
} from '@/components/reading/utils';
import Icon, { IconSize } from '@/components/utils/Icon';

import { NextPageWithLayout } from './_app';

const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
const githubUrl = process.env.NEXT_PUBLIC_GITHUB;

const AboutUsPage: NextPageWithLayout = () => {
  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>About us</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        className="mx-auto max-w-4xl space-y-8 px-4"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-on-surface-p0">Re: StrategyTribe</h1>

        <div className="space-y-16">
          <ReadingSection title="About">
            <SectionContent
              content={`Born from a need for higher quality, better scaled OSINT work on the
            world's most important threat actors. We aim to centralize, organize
            and incentivise the collection of widely important data by
            individuals.\n\nWe collaborate with journalists, private sector
            companies and governments to circulate our findings in line with our
            values.`}
            />

            <div className="space-y-6 pt-4">
              <CallToAction
                label="Follow us on Twitter"
                link={twitterUrl ?? ''}
              />

              <CallToAction label="FAQ" link={GoToFAQPage()} internal />
            </div>
          </ReadingSection>
          <ReadingSection title="Values">
            <div className="flex items-center gap-2 tablet:-translate-x-6">
              <Icon
                icon="check"
                size={IconSize.Small}
                className="text-main-light"
              />
              <span className="">
                Individual liberty, democracy - and the rule of law within these
                bounds.
              </span>
            </div>

            <div className="flex items-center gap-2 tablet:-translate-x-6">
              <Icon
                icon="check"
                size={IconSize.Small}
                className="text-main-light"
              />
              <span className="">
                Implementation of the Universal Declaration of Human Rights.{' '}
              </span>
            </div>
          </ReadingSection>

          <ReadingSection title="Mission">
            <SectionContent content="Bringing efficient crowdsourced OSINT to the world as a capability to be used for immediate good." />
            <CallToAction
              className="pt-4"
              label="Follow us on Twitter"
              link={twitterUrl ?? ''}
            />
          </ReadingSection>

          <ReadingSection title="Anonymity">
            <SectionContent content="We recommend users create a fresh browser wallet for their StrategyTribe interactions." />
            <SectionContent content="Wallets and their corresponding submissions are the only data points that we store on any given user. " />
            <p className={CONTENT_STYLE}>
              <span>{`We are open source - feel free to `}</span>
              <a
                className="group inline-flex translate-y-1 translate-x-0.5 items-center gap-1 text-main-light"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  icon="north_east"
                  size={IconSize.Small}
                  className="transition-transform ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="group-hover:underline">check us out</span>
              </a>
            </p>
          </ReadingSection>

          <AfterRead />
        </div>
      </motion.main>
    </div>
  );
};

export default AboutUsPage;

AboutUsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
