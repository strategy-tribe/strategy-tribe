import Link from 'next/link';

import {
  GoToAboutusPage,
  GoToAccountPage,
  GoToBountiesPage,
  GoToFAQPage,
  GoToGeneralDonationsPage,
  GoToOrganizationsPage,
  GoToRulesPage,
} from '@/lib/utils/Routes';

import { useNotification } from '../notifications/NotificationContext';
import Icon from '../utils/Icon';
import { Logo } from '../utils/Logo';

const Footer = () => {
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB;

  const { notify } = useNotification();

  return (
    <footer className="w-full bg-surface-dark text-on-surface-p0">
      <div className="mx-auto max-w-4xl space-y-16 px-8 pt-16 pb-24 laptop:px-2">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <p className="h3 text-on-surface-p0">StrategyTribe</p>
        </div>

        <div className="flex w-full gap-8  text-on-surface-p1">
          <ul className="flex shrink grow basis-[1] flex-col gap-y-4">
            <p className="h5 pb-2 font-grotesk text-on-surface-unactive">
              Navigate
            </p>

            <FooterItem
              internal
              label="Browse Bounties"
              link={GoToBountiesPage()}
            />
            <FooterItem
              internal
              label="Browse Organizations"
              link={GoToOrganizationsPage()}
            />
            <FooterItem
              internal
              label="Your Account"
              link={GoToAccountPage()}
            />
            <FooterItem internal label="About" link={GoToAboutusPage()} />
          </ul>

          <div className="h-48 w-0.5 shrink-0 bg-surface" />

          <ul className="flex shrink grow basis-[2] flex-col gap-y-4">
            <p className="h5 pb-2 font-grotesk text-on-surface-unactive">
              How ST works
            </p>

            <FooterItem internal label="FAQ" link={GoToFAQPage()} />
            <FooterItem
              internal
              label="Submission Rules"
              link={GoToRulesPage()}
            />
            <FooterItem internal label="Terms and Conditions" link="/tos" />
            <FooterItem
              internal
              label="Submissions are not the only way to help"
              link={GoToGeneralDonationsPage()}
            />
          </ul>

          <div className="h-48 w-0.5 shrink-0 bg-surface" />

          <ul className="flex shrink grow basis-[1] flex-col gap-y-4">
            <p className="h5 pb-2 font-grotesk text-on-surface-unactive">
              Social
            </p>

            <FooterItem label="Twitter" link={twitterUrl ?? ''} />
            <FooterItem label="Github" link={githubUrl ?? ''} />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export function FooterItem({
  label,
  link = '',
  className,
  internal = false,
  onClick,
}: {
  internal?: boolean;
  label: string;
  link?: string;
  className?: string;
  onClick?: () => void;
}) {
  const containerCLass = `group text-on-surface-p1 hover:text-on-surface-p0 body flex items-center justify-center gap-2 w-fit ${className}`;

  if (internal) {
    return (
      <Link href={link}>
        <span onClick={onClick ?? undefined} className={containerCLass}>
          <span>{label}</span>
        </span>
      </Link>
    );
  }

  return (
    <a
      onClick={onClick ?? undefined}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={containerCLass}
    >
      <Icon
        icon="north_east"
        className="-translate-x-0.5 transition-all ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0"
      />
      <span>{label}</span>
    </a>
  );
}

export default Footer;
