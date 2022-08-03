import Image from 'next/image';
import Link from 'next/link';

import {
  GoToAboutusPage,
  GoToBountiesPage,
  GoToGeneralDonationsPage,
  GoToRulesPage,
} from '@/utils/Routes';

const Footer = () => {
  return (
    <footer className="bg-main w-full text-on-surface-p0">
      <div className="px-8 laptop:px-2 pt-16 pb-24 space-y-16 mx-auto max-w-5xl">
        {/* LOGO */}
        <div className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="-translate-x-1"
          />
          <span className="h5">StrategyTribe</span>
        </div>

        <div className="grid bt:grid-cols-2 w-full gap-y-4">
          <ul className="space-y-4  text-main-light">
            <li className="cursor-pointer font-grotesk font-medium hover:text-on-surface-p0">
              <Link href={GoToBountiesPage()}>Home</Link>
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-on-surface-p0">
              <Link href={GoToAboutusPage()}>About</Link>
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-on-surface-p0">
              <Link href={GoToRulesPage()}> Rules for submitting</Link>
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-on-surface-p0">
              Terms of service
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-on-surface-p0">
              <Link href={GoToGeneralDonationsPage()}>
                Submitting findings is not the only way to help
              </Link>
            </li>
          </ul>
          <ul className="space-y-4  text-main-light">
            <li className="font-grotesk font-medium hover:text-on-surface-p0">
              <a
                href="https://twitter.com/Strategy_Tribe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>

            <li className="font-grotesk font-medium hover:text-on-surface-p0">
              <a
                href="https://github.com/strategy-tribe/strategy-tribe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
