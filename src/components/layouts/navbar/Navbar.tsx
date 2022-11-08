import { useState } from 'react';

import useScrollPosition from '@/lib/hooks/useScrollPosition';
import {
  GoToAboutusPage,
  GoToBountiesPage,
  GoToFAQPage,
  GoToOrganizationsPage,
  GoToRulesPage,
} from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';

import { LandingPageLink } from './LandingPageLink';
import { NotifsMenu } from './menus/NotifsMenu';
import { UserMenu } from './menus/UserMenu';
import { NavLink } from './NavLink';

export function Navbar({
  hideBgOnScroll,
  keepNavbar,
}: {
  hideBgOnScroll: boolean;
  keepNavbar: boolean;
}) {
  const [navbarBackground, setNavbarBackground] = useState(!hideBgOnScroll);

  useScrollPosition(
    300,
    () => setNavbarBackground(!hideBgOnScroll || true),
    () => setNavbarBackground(!hideBgOnScroll || false)
  );

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showElevation, setShowElevation] = useState(false);

  useScrollPosition(
    hideBgOnScroll ? 600 : 25,
    () => setShowElevation(true),
    () => setShowElevation(false)
  );

  const { userId, LogIn, isStaff, isAdmin } = useAuth();

  const padding = userId ? 'py-3' : 'py-1';

  const borderColor = isAdmin
    ? 'border-success'
    : isStaff
    ? 'border-main'
    : 'border-surface';
  return (
    <>
      <nav
        className={`${
          keepNavbar ? 'fixed w-screen' : 'border-bg'
        } top-0 text-on-surface-p1 ${
          keepNavbar ? borderColor : ''
        } z-40 transition-colors duration-1000 ${
          showElevation ? 'border-b-[1px] ' : ''
        } ${navbarBackground ? 'bg-bg' : ''}`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between ${padding}`}
        >
          {/* left side */}
          <div className="flex items-center gap-8">
            <LandingPageLink />
            <NavLink url={GoToBountiesPage()} label="Bounties" />
            <NavLink url={GoToOrganizationsPage()} label="Organizations" />
            <NavLink url={GoToAboutusPage()} label="About" />
            <NavLink url={GoToRulesPage()} label="Rules" />
            <NavLink url={GoToFAQPage()} label="FAQ" />
          </div>

          {/* right side */}
          <div className="flex items-center gap-6">
            {!!userId && (
              <NotifsMenu
                userId={userId}
                shouldShow={showNotifs}
                hide={() => setShowNotifs(false)}
                show={() => setShowNotifs(true)}
              />
            )}

            {!userId ? (
              <div className="grid place-items-center py-1">
                <Button
                  info={{
                    label: 'Connect wallet',
                    style: ButtonStyle.Filled,
                    onClick: LogIn,
                  }}
                />
              </div>
            ) : (
              <UserMenu
                shouldShow={showAccountMenu}
                hide={() => setShowAccountMenu(false)}
                show={() => setShowAccountMenu(true)}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
