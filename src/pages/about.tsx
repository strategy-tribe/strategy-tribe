import { motion } from 'framer-motion';
import Head from 'next/head';

import { GoToFAQPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { AfterRead, ReadingSection } from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
const redditUrl = process.env.NEXT_PUBLIC_REDDIT;
const discordUrl = process.env.NEXT_PUBLIC_DISCORD;
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
            <p>
              {' '}
              StrategyTribe was established in response to the growing need for
              more comprehensive and scalable open-source intelligence (OSINT)
              efforts focused on the world’s most critical threat actors. Our
              primary objective is to streamline and incentivize data collection
              by individuals while centralizing and organizing this valuable
              information.
              <br /> <br /> We partner with journalists, private sector
              entities, and governmental agencies to ensure our findings align
              with our core values and disseminate these insights to relevant
              stakeholders.
              <br /> <br /> Visit our comprehensive{' '}
              <a
                className="underline hover:text-main-light"
                href={GoToFAQPage()}
              >
                FAQ
              </a>{' '}
              section to learn more, follow us on{' '}
              <a
                className="underline hover:text-main-light"
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{' '}
              ,{' '}
              <a
                className="underline hover:text-main-light"
                href={redditUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reddit
              </a>{' '}
              and{' '}
              <a
                className="underline hover:text-main-light"
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>{' '}
              , or check out our{' '}
              <a
                className="underline hover:text-main-light"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>{' '}
              .
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
              <br />
              <br /> Furthermore, we recognize the significance and impact of
              the open-source philosophy in today’s interconnected world. By
              embracing this approach, we aim to foster a culture of
              collaboration, innovation, and openness.
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

          <ReadingSection title="Mission">
            <p>
              At StrategyTribe, our mission is to empower an innovative and
              inclusive community dedicated to the pursuit of open-source
              intelligence (OSINT) excellence. We are committed to assembling a
              diverse team of individuals from various backgrounds, cultures,
              and beliefs in order to expose and combat criminal activity. By
              organizing and centralizing the efforts of our community, we
              strive to create a positive impact in the lives of others and
              contribute to the greater good.
              <br />
              <br /> Our vision is to foster a global network of individuals who
              are deeply rooted in the principles of individual liberty,
              democracy, and the rule of law. By sharing vital information with
              journalists, private sector companies, and governments that align
              with our values, we aim to bring justice to the world’s most
              critical threat actors and promote a safer, more transparent
              global society.
              <br />
              <br /> Together, we will build and nurture an efficient OSINT
              community that serves as a beacon of truth, collaboration, and
              progress in our ever-evolving world.
            </p>
            {/* <SectionContent content="Bringing efficient crowdsourced OSINT to the world as a capability to be used for immediate good." />
            <CallToAction
              className="pt-4"
              label="Follow us on Twitter"
              link={twitterUrl ?? ''}
            /> */}
          </ReadingSection>

          <ReadingSection title="Anonymity">
            <p>
              At StrategyTribe, we firmly believe in the fundamental human right
              to anonymity and are committed to preserving the privacy of our
              users. Recognizing the critical nature of confidentiality in
              today’s digital landscape, we strongly encourage users to
              establish a new browser wallet to interact with our platform.
              <br />
              <br /> Please note that the only information we retain about our
              users is their wallet addresses, information submitted to the site
              (including bounty submissions and the optional leaderboard
              usernames), IP addresses and browser fingerprints. This data
              storage practice and transparency reflects our unwavering
              dedication to upholding privacy rights and ensures our users can
              engage with StrategyTribe without compromising their personal
              information.
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
