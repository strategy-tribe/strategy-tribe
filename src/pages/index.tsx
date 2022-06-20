import { Privacy } from '../components/pages/landing/Privacy';
import Hero from '@/components/pages/landing/Hero';
import Footer from '@/components/pages/landing/Footer';
import type { NextPage } from 'next';
import Head from 'next/head';
import { GoToHomePage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ButtonStyle } from '@/components/utils/Button';
import Navbar from '@/components/navbar/Navbar';
import { useScrollPosition } from '../lib/hooks';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const LandingPage: NextPage = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [navbarBackground, setNavbarBackground] = useState(false);

  const {} = useScrollPosition(
    1100,
    () => setNavbarBackground(true),
    () => setNavbarBackground(false)
  );

  return (
    <>
      <Head>
        <title>StrategyTribe</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        setUp={{
          background: width > 1000 ? navbarBackground : true,
          useOverflowMenu: false,
          rightButtonInfo: [
            {
              label: 'Join the hunt',
              icon: 'login',
              iconClasses: 'laptop:hidden',
              onClick: () => router.push(GoToHomePage()),
              style: ButtonStyle.Filled,
            },
          ],
        }}
      >
        <Hero />
        <Privacy />
        <Footer />
      </Navbar>
    </>
  );
};

export default LandingPage;
