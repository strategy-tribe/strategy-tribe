import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { GoToBountiesPage, GoToLandingPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Section } from '@/components/pages/landing/Section';
import { HugeTitle } from '@/components/utils/HugeTitle';
import Icon from '@/components/utils/Icon';

import { NextPageWithLayout } from './_app';

const _404Page: NextPageWithLayout = () => {
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>404</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Section className="space-y-24 pb-48">
            {/* About us */}
            <div className="flex gap-16">
              <figure className="relative h-[10rem] min-w-[10rem]">
                <Image
                  src="/illustrations/goal.svg"
                  priority
                  alt="illustration"
                  width={150}
                  height={100}
                />
              </figure>
              <div className="space-y-6 ">
                {/* Title */}
                <div>
                  <HugeTitle title="404" />
                </div>
                {/* Content */}
                <div>
                  <p className="body max-w-lg">{`Let's get you back on track.`}</p>
                </div>
                {/* CTA */}
                <div>
                  <div className="-ml-6">
                    <Link href={GoToBountiesPage()}>
                      <span className="z-10 flex w-fit min-w-[6rem] items-center justify-center gap-2 rounded-full py-3 px-5 font-grotesk font-medium text-on-surface-p0 hover:text-main-light tablet:px-6">
                        <Icon icon="arrow_forward" />
                        <span>Check the bounties</span>
                      </span>
                    </Link>
                    <Link href={GoToLandingPage()}>
                      <span className="z-10 flex w-fit min-w-[6rem] items-center justify-center gap-2 rounded-full py-3 px-5 font-grotesk font-medium text-on-surface-p0 hover:text-main-light tablet:px-6">
                        <Icon icon="arrow_forward" />
                        <span>Home</span>
                      </span>
                    </Link>
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="z-10 flex w-fit min-w-[6rem] items-center justify-center gap-2 rounded-full py-3 px-5 font-grotesk font-medium text-on-surface-p0 hover:text-main-light tablet:px-6"
                    >
                      <Icon icon="arrow_forward" />
                      <span>Follow us on Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </motion.div>
      </>
    </div>
  );
};

export default _404Page;
_404Page.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
