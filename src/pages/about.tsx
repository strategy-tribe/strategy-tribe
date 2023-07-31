import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { FAQs } from '@/components/pages/faq/FAQs';
import { AfterRead, ReadingSection } from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const submissionsPerDay = parseInt(
      process.env.SUBMISSION_PER_DAY as string
    );

    if (!submissionsPerDay) {
      throw new Error('Unable to assess submissions per day');
    }

    return {
      props: {
        submissionsPerDay,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('error:\n', error);
    return {
      props: { submissionsPerDay: 3 },
      revalidate: 30,
    };
  }
};

const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
const redditUrl = process.env.NEXT_PUBLIC_REDDIT;
const discordUrl = process.env.NEXT_PUBLIC_DISCORD;
const githubUrl = process.env.NEXT_PUBLIC_GITHUB;

const AboutUsPage: NextPageWithLayout<{ submissionsPerDay: number }> = ({
  // eslint-disable-next-line react/prop-types
  submissionsPerDay,
}) => {
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
        <div className="space-y-16">
          <ReadingSection title="Mission">
            <p>
              To develop the pursuit of open-source intelligence (OSINT)
              excellence. By organizing and centralizing the efforts of our
              community - whilst keeping the academic rigor in the output - we
              strive to create a positive impact in the lives of others and
              contribute to a wider good.
              <br />
              <br /> We aim to incentivize, study and then streamline data
              mining on threat actors.
            </p>
            {/* <SectionContent content="Bringing efficient crowdsourced OSINT to the world as a capability to be used for immediate good." />
  <CallToAction
    className="pt-4"
    label="Follow us on Twitter"
    link={twitterUrl ?? ''}
  /> */}
          </ReadingSection>

          <ReadingSection title="Why">
            <p>
              The rate at which public data is being produced is rapidly
              increasing. StrategyTribe was established in response to the
              growing need for more comprehensive and scalable efforts focused
              on mining this data for good.
              <br />
              <br /> Existing journalist-led work in this space has helped show
              the value to be mined in publicly available data - but is chaotic
              & inefficient, with certainly no streamlining and very little
              academic study going on. We aim to build on this work and take it
              further, bigger, more sustainably.
            </p>

            {/* <div className="space-y-6 pt-4">
              <CallToAction
                label="Follow us on Twitter"
                link={twitterUrl ?? ''}
              />

              <CallToAction label="FAQ" link={GoToFAQPage()} internal />
            </div> */}
          </ReadingSection>
          <ReadingSection title="Values">
            <p>
              At StrategyTribe, our core values are deeply rooted in the
              principles of individual liberty, democracy, and the rule of law.
              We are committed to upholding the Universal Declaration of Human
              Rights as a fundamental source of inspiration and motivation
              behind all our endeavors.
            </p>
            {/* <div className="flex items-center gap-2 tablet:-translate-x-6">
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
            </div> */}
          </ReadingSection>

          <ReadingSection title="Anonymity">
            <p>
              We encourage users to establish a new browser wallet to interact
              with our platform. The only information we retain about our users
              is their wallet addresses, username and information submitted to
              the site (including bounty submissions and the optional
              leaderboard usernames).
            </p>
          </ReadingSection>

          <FAQs
            submissionsPerDay={submissionsPerDay}
            discordUrl={discordUrl ?? ''}
          />

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
