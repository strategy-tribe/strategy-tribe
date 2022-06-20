import React from 'react';
import Link from 'next/link';
import {
  GoToOrganizationsPage,
  GoToHomePage,
  GoToWaitingPage,
  GoToWaitingForReview,
  GoToAboutusPage,
} from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { Logo } from '../utils/Logo';
import { useRouter } from 'next/router';

export function NavLinks() {
  const { isStaff } = useAuth();

  return (
    <ul className="hidden laptop:flex items-center gap-10 text-unactive">
      <li>
        <HomeLink />
      </li>
      <li>
        <NavLink url={GoToHomePage()} label="Home" />
      </li>
      <li>
        <NavLink url={GoToOrganizationsPage()} label="Organizations" />
      </li>
      <li>
        <NavLink url={GoToAboutusPage()} label="About" />
      </li>

      {/* <NavLink url={GoToSearchPage()} label="Search" /> */}

      {/* <NavSearchbar /> */}
      {isStaff && (
        <li className="group label relative cursor-pointer">
          <div className="label-lg">For Staff</div>

          <div className="absolute hidden group-hover:block hover:block">
            <div className="flex flex-col gap-6 translate-y-4 bg-dark text-unactive rounded py-6 px-6 min-w-[13rem]">
              <NavLink url={GoToWaitingPage()} label="Waiting for funds" />
              <NavLink url={GoToWaitingForReview()} label="Review" />
            </div>
          </div>
        </li>
      )}
    </ul>
  );
}

export function HomeLink({ className }: { className?: string }) {
  const { isStaff } = useAuth();
  return (
    <Link href={GoToHomePage()}>
      <a className={`flex gap-2 items-center shrink-0 group ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-white">StrategyTribe</p>
          <span className="text-disabled label">
            {isStaff && 'Staff Account'}
          </span>
        </div>
      </a>
    </Link>
  );
}

function NavLink({ url, label }: { url: string; label: string }) {
  const router = useRouter();
  return (
    <Link href={url}>
      <a
        className={`label-lg hover:text-white shrink-0 min-w-fit  ${
          router.pathname === url && 'text-white'
        }`}
      >
        {label}
      </a>
    </Link>
  );
}
