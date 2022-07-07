import {
  GoToAboutusPage,
  GoToFAQPage,
  GoTobBountiesPage,
  GoToOrganizationsPage,
  GoToUserPage,
} from '@/lib/utils/Routes';
import { useState } from 'react';
import { NavLink } from './NavLink';
import { HomeLink } from './HomeLink';
import Icon, { IconSize } from '../../utils/Icon';
import { useAuth } from 'auth/AuthContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Link from 'next/link';
import { LandingPageLink } from './LandingPageLink';

export function Navbar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const { userId, LogIn, LogOut } = useAuth();

  const padding = !!userId ? 'py-3' : 'py-1';
  return (
    <>
      <nav className="fixed top-0 bg-black text-text w-screen z-40">
        <div
          className={`flex justify-between items-center max-w-7xl mx-auto ${padding}`}
        >
          {/* right side */}
          <div className="flex gap-8 items-center">
            <LandingPageLink />
            <NavLink url={GoTobBountiesPage()} label="Bounties" />
            <NavLink url={GoToOrganizationsPage()} label="Organizations" />
            <NavLink url={GoToAboutusPage()} label="About" />
          </div>

          {/* Left side */}
          <div className="flex items-center gap-6">
            <NavLink url={GoToFAQPage()} label="FAQ" />
            <Icon icon="search" size={IconSize.Small} />
            <Icon icon="notifications" size={IconSize.Small} />

            {!userId ? (
              <Button
                info={{
                  label: 'Connect wallet',
                  style: ButtonStyle.Filled,
                  onClick: LogIn,
                }}
              />
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setShowAccountMenu(true)}
                onMouseLeave={() => setShowAccountMenu(false)}
              >
                {/* icon */}
                <button className="grid place-items-center">
                  <Icon icon="account_circle" size={IconSize.Small} />
                </button>

                {/* menu */}
                <div
                  className={`absolute right-0 top-0 pt-10 w-36 ${
                    showAccountMenu ? '' : 'hidden'
                  }`}
                >
                  <div className="bg-darker text-white rounded-lg overflow-hidden body-sm flex flex-col">
                    <Link href={GoToUserPage()} className="w-full h-full">
                      <a className="px-6 py-4 w-full text-left hover:bg-dark">
                        Account
                      </a>
                    </Link>
                    <Link href={GoToUserPage()} className="w-full h-full">
                      <a className="px-6 py-4 w-full text-left hover:bg-dark">
                        Watching
                      </a>
                    </Link>
                    <Link href={GoToUserPage()} className="w-full h-full">
                      <a className="px-6 py-4 w-full text-left hover:bg-dark">
                        Submissions
                      </a>
                    </Link>

                    <hr className="w-full text-dark" />
                    <button
                      className="px-6 py-4 w-full text-left hover:bg-dark"
                      onClick={LogOut}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
