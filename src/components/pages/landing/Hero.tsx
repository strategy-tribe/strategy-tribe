import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import router from 'next/router';

import { useGetLeaderboardUsers } from '@/lib/hooks/userHooks';
import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
import { GoToAboutusPage, GoToBountiesPage } from '@/lib/utils/Routes';

import { Section } from './Section';
import { Button, ButtonStyle } from '../../utils/Button';

export default function Hero() {
  const { width } = useWindowDimensions();
  if (width < 1000) return <HeroMobile />;
  else return <HeroDesktop />;
}

function HeroDesktop() {
  const { scrollY } = useScroll();

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

  const { leaderBoard, isLoading } = useGetLeaderboardUsers();

  return (
    <Section className="flex h-[1500px] flex-col justify-between laptop:flex-row laptop:gap-8">
      {/* Right section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: 0.5 },
        }}
        className="top-40 mx-auto h-fit max-w-5xl space-y-8 laptop:sticky laptop:max-w-[45%]"
      >
        {/* Text */}
        <div className="space-y-4">
          <h1 className="h2 laptop:h1 max-w-xl">
            An{' '}
            <a
              className="underline hover:text-main-light"
              href="https://github.com/strategy-tribe/strategy-tribe"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source project
            </a>{' '}
            dedicated to crowdsourcing and crowdfunding OSINT locating the
            cryptowallets of threat actors.
          </h1>

          <h2 className="body-lg max-w-lg">
            Bounties are curated at the discretion of Strategy Tribe to only
            include entities, individuals or groups currently under{' '}
            <a
              className="underline hover:text-main-light"
              href="https://www.gov.uk/government/publications/the-uk-sanctions-list"
              target="_blank"
              rel="noopener noreferrer"
            >
              sanction
            </a>{' '}
            or to aid in the progress of public safety and good.
          </h2>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <Button
            info={{
              label: 'Join the hunt',
              style: ButtonStyle.Filled,
              onClick: () => router.push(`${GoToBountiesPage()}?login=true`),
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

        <h2 className="body-lg max-w-lg py-2 pl-4 text-main-light">
          Earn rewards by collecting data for bounties and by referring others
          to join the hunt. Get your invite link{' '}
          <a
            className="underline hover:text-main-light"
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/account`}
          >
            here
          </a>{' '}
        </h2>

        {!isLoading && leaderBoard && (
          <div className="body-lg max-w-lg rounded-xl border-2 border-main py-2 pl-4 text-center">
            <h2 className="py-2 text-main-light">
              What our top hunters earned
            </h2>
            {leaderBoard.slice(0, 3).map((user, index) => (
              <div
                className="mc-auto flex place-content-center items-center p-2 text-lg"
                key={index}
              >
                <p>{index + 1}. </p>
                <p className="px-1 font-semibold">{user.totalBounty}</p>
                <p>{` MATIC (From ${user.acceptedCount} bounties)`}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Left graphic */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        className="relative mx-auto grow laptop:z-0 "
      >
        {/* Top */}
        <motion.figure
          className="relative z-30 will-change-transform"
          style={{
            y: topY,
          }}
        >
          <Image
            alt="top illustration"
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
            alt="mid illustration"
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
            alt="bot illustration"
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
              alt="card"
              priority={true}
              src="/illustrations/card_pick.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>

          <motion.figure className="relative z-10 -translate-y-16">
            <Image
              alt="card"
              priority={true}
              src="/illustrations/card_investigate.png"
              width={363 / 2}
              height={233 / 2}
            />
          </motion.figure>

          <motion.figure className="relative z-20 -translate-y-32">
            <Image
              alt="card"
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
            alt="card"
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
            alt="card"
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
  const { scrollY } = useScroll();

  const y = 400;

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

  const { leaderBoard, isLoading } = useGetLeaderboardUsers();

  return (
    <Section className="flex h-[1500px] flex-col justify-between laptop:flex-row laptop:gap-8">
      {/* Right section */}
      <div className="top-40 mx-4 h-fit space-y-8">
        {/* Text */}
        <div className="space-y-4">
          <h1 className="h4 laptop:h3 max-w-xl">
            An{' '}
            <a
              className="underline hover:text-main-light"
              href="https://github.com/strategy-tribe/strategy-tribe"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source project
            </a>{' '}
            dedicated to crowdsourcing and crowdfunding OSINT for locating the
            cryptowallets of threat actors.
          </h1>

          <h2 className="body max-w-lg">
            Bounties are curated at the discretion of Strategy Tribe to only
            include entities, individuals or groups currently under{' '}
            <a
              className="underline hover:text-main-light"
              href="https://www.gov.uk/government/publications/the-uk-sanctions-list"
              target="_blank"
              rel="noopener noreferrer"
            >
              sanction
            </a>{' '}
            or to aid in the progress of public safety and good.
          </h2>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-6">
          <Button
            info={{
              label: 'Join the hunt',
              style: ButtonStyle.Filled,
              onClick: () => router.push(`${GoToBountiesPage()}?login=true`),
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

        <h2 className="body-lg bg-surfac max-w-lg rounded-2xl py-2 pl-4 text-main-light">
          Earn rewards by collecting data for bounties and by referring others
          to join the hunt. Get your invite link{' '}
          <a
            className="underline hover:text-main-light"
            href={`${process.env.NEXT_PUBLIC_DOMAIN}/account`}
          >
            here
          </a>{' '}
        </h2>

        {!isLoading && leaderBoard && (
          <div className="body-lg max-w-lg rounded-xl border-2 border-main py-2 pl-4 text-center">
            <h2 className="py-2 text-main-light">
              What our top hunters earned
            </h2>
            {leaderBoard.slice(0, 3).map((user, index) => (
              <div className="p-2 text-center text-lg" key={index}>{`${
                index + 1
              }. ${user.totalBounty} MATIC (From ${
                user.acceptedCount
              } bounties)`}</div>
            ))}
          </div>
        )}
      </div>

      {/* Left graphic */}
      <div className="relative mx-auto grow pt-8 laptop:z-0">
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
              alt="card"
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
              alt="card"
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
              alt="card"
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
                alt="card"
                priority={true}
                src="/illustrations/card_pick.png"
                width={363 / 2}
                height={233 / 2}
              />
            </motion.figure>

            <motion.figure className="relative z-10 -translate-y-16">
              <Image
                alt="card"
                priority={true}
                src="/illustrations/card_investigate.png"
                width={363 / 2}
                height={233 / 2}
              />
            </motion.figure>

            <motion.figure className="relative z-20 -translate-y-32">
              <Image
                alt="card"
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
              alt="card"
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
              alt="card"
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
