import {
  GoToAboutusPage,
  GoToGeneralDonationsPage,
  GoToBountiesPage,
} from '@/utils/Routes';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-purpleDark w-full text-white">
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
          <ul className="space-y-4  text-purpleLight">
            <li className="cursor-pointer font-grotesk font-medium hover:text-white">
              <Link href={GoToBountiesPage()}>Home</Link>
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-white">
              <Link href={GoToAboutusPage()}>About</Link>
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-white">
              Rules for submitting
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-white">
              Terms of service
            </li>
            <li className="cursor-pointer font-grotesk font-medium hover:text-white">
              <Link href={GoToGeneralDonationsPage()}>
                Submitting findings is not the only way to help
              </Link>
            </li>
          </ul>
          <ul className="space-y-4  text-purpleLight">
            <li className="font-grotesk font-medium hover:text-white">
              <a
                href="https://twitter.com/Strategy_Tribe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>

            <li className="font-grotesk font-medium hover:text-white">
              <a
                href="https://github.com/strategy-tribe/st"
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
