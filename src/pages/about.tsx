import { About } from '@/components/pages/about/About';
import { Goal } from '@/components/pages/about/Goal';
import { Mission } from '@/components/pages/about/Mission';
import Footer from '@/components/pages/landing/Footer';
import { Section } from '@/components/pages/landing/Section';
import Navbar from '@/components/navbar/Navbar';
import { ButtonStyle } from '@/components/utils/Button';
import { GoToHomePage } from '@/utils/Routes';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const AboutUsPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="text-text space-y-8">
      <Head>
        <title>ST | About us</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        setUp={{
          useOverflowMenu: false,
          rightButtonInfo: [
            {
              label: 'Join the hunt',
              onClick: () => router.push(GoToHomePage()),
              style: ButtonStyle.Filled,
            },
          ],
        }}
      >
        <Section>
          <motion.div
            className="space-y-16 pb-48"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="h4 laptop:h3 font-inter font-bold text-white">
              Re: StrategyTribe
            </h2>
            <About />
            <Mission />
            <Goal />
          </motion.div>
        </Section>
        <Footer />
      </Navbar>
    </div>
  );
};

export default AboutUsPage;
