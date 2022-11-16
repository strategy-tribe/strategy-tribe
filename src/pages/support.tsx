import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import {
  AfterRead,
  CallToAction,
  ReadingSection,
  SectionContent,
} from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
const githubUrl = process.env.NEXT_PUBLIC_GITHUB;

const GeneralDonationsPage: NextPageWithLayout = () => {
  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>ST | Support StrategyTribe</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReadingSection title="Submitting findings is not the only way to help">
        <SectionContent
          content={`We aim to make the web a safer place for everyone.
       
        Not everybody is an OSINT expert, but we all benefit from bringing the
        world's most important threat actors to the light.
       
        All findings gathered by this project will be distributed to the
        community free of charge and we anticipate slowly decentralizing into a
        DAO where voting on bounties and findings can be seen publicly.
       
        Spread the word, the hunt is open.`}
        />

        <div className="space-y-8 pt-4">
          <CallToAction label="Twitter" link={twitterUrl ?? ''} />
          <CallToAction label="Github" link={githubUrl ?? ''} />
        </div>
      </ReadingSection>
      <AfterRead />
    </div>
  );
};

GeneralDonationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default GeneralDonationsPage;
GeneralDonationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
