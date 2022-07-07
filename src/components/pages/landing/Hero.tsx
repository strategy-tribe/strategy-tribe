import useWindowDimensions from '@/hooks/useWindowDimensions';
import { GoToAboutusPage, GoTobBountiesPage } from '@/utils/Routes';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Image from 'next/image';
import router from 'next/router';
import React from 'react';
import { Button, ButtonStyle } from '../../utils/Button';
import { Section } from './Section';

export default function Hero() {
  const { width } = useWindowDimensions();
  if (width < 1000) return <HeroMobile />;
  else return <HeroDesktop />;
}

function HeroDesktop() {
  const { scrollY } = useViewportScroll();

  const y = 200;

  //position
  const scrollValues = [0, y, y * 2, y * 3, y * 4, y * 5, y * 6, y * 7];

  const topOutput = [0, -25, -100, -1500, -1000, -1000, -1000, -1000];
  const topY = useTransform(scrollY, scrollValues, topOutput);

  const midOutput = [-200, 150, -150, 0, -550, -650, -650, -650];
  const midY = useTransform(scrollY, scrollValues, midOutput);

  const botOutput = [-400, 50, 100, 50, -100, -150, -150, -150];
  const botY = useTransform(scrollY, scrollValues, botOutput);

  const c1YOutput = [-350, -900, -1100, -1500, -1000, -1000, -1000, -1000];
  const c1Y = useTransform(scrollY, scrollValues, c1YOutput);
  const c1OpacityOutput = [0, 1, 1, 1, 1, 1, 1, 1];
  const c1Opacity = useTransform(scrollY, scrollValues, c1OpacityOutput);

  const c2YOutput = [0, -250, -450, -450, -650, -650, -750, -750];
  const c2Y = useTransform(scrollY, scrollValues, c2YOutput);

  const c3YOutput = [0, 0, 100, 100, 0, -50, -50, -50];
  const c3Y = useTransform(scrollY, scrollValues, c3YOutput);

  return (
    <Section className="flex flex-col laptop:flex-row laptop:gap-8 justify-between h-[1500px]">
      {/* Right section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: 0.5 },
        }}
        className="space-y-8 laptop:max-w-[45%] laptop:sticky top-40 h-fit  "
      >
        {/* Text */}
        <div className="space-y-4">
          <h1 className="h5 laptop:h4">
            An{' '}
            <a
              className="underline hover:text-purpleLight"
              href="https://github.com/strategy-tribe/st"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source project
            </a>{' '}
            dedicated to crowdsourcing and crowdfunding OSINT locating the
            cryptowallets of threat actors.
          </h1>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <Button
            info={{
              label: 'Join the hunt',
              style: ButtonStyle.Filled,
              onClick: () => router.push(GoTobBountiesPage()),
            }}
          />
          <Button
            info={{
              label: 'About us',
              style: ButtonStyle.Text,
              onClick: () => router.push(GoToAboutusPage()),
            }}
          />
        </div>
      </motion.div>

      {/* Left graphic */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        className="relative grow laptop:z-0 mx-auto "
      >
        {/* Top */}
        <motion.figure
          className="relative z-30 will-change-transform"
          style={{
            y: topY,
          }}
        >
          <Image
            priority={true}
            src="/illustrations/top.svg"
            width={560.9}
            height={344.32}
          />
        </motion.figure>
        {/* Middle */}
        <motion.figure
          className="relative z-20 will-change-transform	"
          style={{
            y: midY,
          }}
        >
          <Image
            priority={true}
            src="/illustrations/mid.svg"
            width={562.03}
            height={448.84}
          />
        </motion.figure>
        {/* Bot */}
        <motion.figure
          className="relative z-10 will-change-transform	"
          style={{
            y: botY,
          }}
        >
          <Image
            priority={true}
            src="/illustrations/bot.svg"
            width={560.15}
            height={491.28}
          />
        </motion.figure>

        {/* Card1 */}
        <motion.div
          className="absolute z-50 will-change-transform"
          style={{
            y: c1Y,
            x: '75%',
            opacity: c1Opacity,
          }}
        >
          <motion.figure className="relative z-0">
            <Image
              priority={true}
              src="/illustrations/card_pick.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>

          <motion.figure className="-translate-y-16 relative z-10">
            <Image
              priority={true}
              src="/illustrations/card_investigate.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>

          <motion.figure className="-translate-y-32 relative z-20">
            <Image
              priority={true}
              src="/illustrations/card_report.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>
        </motion.div>

        {/* Card2 */}
        <motion.figure
          className="absolute z-50 will-change-transform "
          style={{
            y: c2Y,
            x: '75%',
          }}
        >
          <Image
            priority={true}
            src="/illustrations/card_staff.png"
            width={363 / 2}
            height={233 / 2}
          />
        </motion.figure>

        {/* Card3 */}
        <motion.figure
          className="absolute z-50 will-change-transform "
          style={{
            y: c3Y,
            x: '75%',
          }}
        >
          <Image
            priority={true}
            src="/illustrations/card_paid.png"
            width={363 / 2}
            height={233 / 2}
          />
        </motion.figure>
      </motion.div>
    </Section>
  );
}

function HeroMobile() {
  const { scrollY } = useViewportScroll();

  const y = 200;

  //position
  const scrollValues = [0, y, y * 2, y * 3, y * 4, y * 5, y * 6, y * 7, y * 8];

  const topOutput = [
    0,
    y,
    y * -0.8,
    y * -0.8,
    y * -0.8,
    y * -0.8,
    y * -0.8,
    y * -0.8,
    y * -0.8,
  ];
  const topY = useTransform(scrollY, scrollValues, topOutput);

  const midOutput = [
    -150,
    y - 150,
    y,
    y * -1,
    y * -1,
    y * -1,
    y * -1,
    y * -1,
    y * -1,
  ];
  const midY = useTransform(scrollY, scrollValues, midOutput);

  const botOutput = [
    -300,
    y - 200,
    y - 100,
    y - 100,
    y * -1,
    y * -1,
    y * -1,
    y * -1,
    y * -1,
  ];
  const botY = useTransform(scrollY, scrollValues, botOutput);

  const c1YOutput = [
    -550,
    y * -0.8,
    y * -3.5,
    y * -5,
    y * -6,
    y * -6,
    y * -6,
    y * -6,
    y * -6,
  ];
  const c1Y = useTransform(scrollY, scrollValues, c1YOutput);

  const c1OpacityOutput = [0, 1, 1, 1, 1, 1, 1, 1, 1];
  const c1Opacity = useTransform(scrollY, scrollValues, c1OpacityOutput);

  const c2YOutput = [
    0,
    0,
    y * -0.5,
    y * -2,
    y * -3,
    y * -4,
    y * -4,
    y * -4,
    y * -4,
  ];
  const c2Y = useTransform(scrollY, scrollValues, c2YOutput);

  // const c3YOutput = [0, 0, 0, 100, 100, 0, -50, -50, -50];
  const c3YOutput = [0, 0, 0, y, y * -0.5, y * -1, y * -1.5, y * -1, y * -1];
  const c3Y = useTransform(scrollY, scrollValues, c3YOutput);

  return (
    <Section className="flex flex-col laptop:flex-row laptop:gap-8 justify-between h-[1500px]">
      {/* Right section */}
      <div className="space-y-8 laptop:max-w-[45%] laptop:sticky top-40 h-fit  ">
        {/* Text */}
        <div className="space-y-4">
          <h1 className="h4 laptop:h3">
            An{' '}
            <a href="#" className="underline hover:text-purpleLight">
              open source project
            </a>{' '}
            dedicated to crowdsourcing and crowdfunding OSINT for locating the
            cryptowallets of threat actors.
          </h1>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <Button
            info={{
              label: 'Join the hunt',
              style: ButtonStyle.Filled,
              onClick: () => router.push(GoTobBountiesPage()),
            }}
          />
          <Button
            info={{
              label: 'About us',
              style: ButtonStyle.Text,
              onClick: () => router.push(GoToAboutusPage()),
            }}
          />
        </div>
      </div>

      {/* Left graphic */}
      <div className="relative grow laptop:z-0 mx-auto pt-8">
        {/* Graphics */}
        <>
          {/* Top */}
          <motion.figure
            className="relative z-30 will-change-transform"
            style={{
              y: topY,
            }}
          >
            <Image
              priority={true}
              src="/illustrations/top.svg"
              width={560.9}
              height={344.32}
            />
          </motion.figure>

          {/* Middle */}
          <motion.figure
            className="relative z-20 will-change-transform	"
            style={{
              y: midY,
            }}
          >
            <Image
              priority={true}
              src="/illustrations/mid.svg"
              width={562.03}
              height={448.84}
            />
          </motion.figure>

          {/* Bot */}
          <motion.figure
            className="relative z-10 will-change-transform	"
            style={{
              y: botY,
            }}
          >
            {' '}
            <Image
              priority={true}
              src="/illustrations/bot.svg"
              width={560.15}
              height={491.28}
            />
          </motion.figure>
        </>

        {/* Cards */}
        <>
          {' '}
          {/* Card1 */}
          <motion.div
            className="absolute z-50 will-change-transform"
            style={{
              y: c1Y,
              x: '50%',
              opacity: c1Opacity,
            }}
          >
            <motion.figure className="relative z-0">
              <Image
                priority={true}
                src="/illustrations/card_pick.png"
                width={363 / 2}
                height={233 / 2}
              />
            </motion.figure>

            <motion.figure className="-translate-y-16 relative z-10">
              <Image
                priority={true}
                src="/illustrations/card_investigate.png"
                width={363 / 2}
                height={233 / 2}
              />
            </motion.figure>

            <motion.figure className="-translate-y-32 relative z-20">
              <Image
                priority={true}
                src="/illustrations/card_report.png"
                width={363 / 2}
                height={233 / 2}
              />
            </motion.figure>
          </motion.div>
          {/* Card2 */}
          <motion.figure
            className="absolute z-50 will-change-transform "
            style={{
              y: c2Y,
              x: '50%',
            }}
          >
            <Image
              priority={true}
              src="/illustrations/card_staff.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>
          {/* Card3 */}
          <motion.figure
            className="absolute z-50 will-change-transform "
            style={{
              y: c3Y,
              x: '50%',
            }}
          >
            <Image
              priority={true}
              src="/illustrations/card_paid.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>
        </>
      </div>
    </Section>
  );
}
