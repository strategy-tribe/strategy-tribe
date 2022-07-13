import { Section } from '@/components/pages/landing/Section';
('@/components/utils/Title');
import Icon from '@/components/utils/Icon';
import { GoToBountiesPage, GoToLandingPage } from '@/utils/Routes';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HugeTitle } from '@/components/utils/HugeTitle';
import LandingLayout from '@/components/layouts/LandingLayout';
import { NextPageWithLayout } from './_app';
import AppLayout from '@/components/layouts/AppLayout';

const _404Page: NextPageWithLayout = () => {
  return (
    <div className="text-text space-y-8">
      <Head>
        <title>ST | 404</title>
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
                <Image src="/illustrations/goal.svg" layout="fill" priority />
              </figure>
              <div className="space-y-6 ">
                {/* Title */}
                <div>
                  <HugeTitle title="404" />
                </div>
                {/* Content */}
                <div>
                  <p className="max-w-lg body">Let's get you back on track.</p>
                </div>
                {/* CTA */}
                <div>
                  <div className="-ml-6">
                    <Link href={GoToBountiesPage()}>
                      <a className="text-white hover:text-purpleLight py-3 px-5 tablet:px-6 font-medium font-grotesk z-10 flex items-center justify-center gap-2 rounded-full min-w-[6rem] w-fit">
                        <Icon icon="arrow_forward" />
                        <span>Check the bounties</span>
                      </a>
                    </Link>
                    <Link href={GoToLandingPage()}>
                      <a className="text-white hover:text-purpleLight py-3 px-5 tablet:px-6 font-medium font-grotesk z-10 flex items-center justify-center gap-2 rounded-full min-w-[6rem] w-fit">
                        <Icon icon="arrow_forward" />
                        <span>Home</span>
                      </a>
                    </Link>
                    <a
                      href="https://twitter.com/Strategy_Tribe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purpleLight py-3 px-5 tablet:px-6 font-medium font-grotesk z-10 flex items-center justify-center gap-2 rounded-full min-w-[6rem] w-fit"
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
