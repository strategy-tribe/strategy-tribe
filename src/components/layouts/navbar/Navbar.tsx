import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useScrollPosition from '@/lib/hooks/useScrollPosition';
import {
  GoToAboutusPage,
  GoToBountiesPage,
  GoToFAQPage,
  GoToLeaderboard,
  GoToOrganizationsPage,
  GoToRulesPage,
  GoToTargetsPage,
} from '@/lib/utils/Routes';

import { ConnectWalletPopUp } from '@/components/auth/ConnectWalletPopUp';
import { Button, ButtonStyle } from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';

import { LandingPageLink } from './LandingPageLink';
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

  const router = useRouter();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showElevation, setShowElevation] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  useScrollPosition(
    hideBgOnScroll ? 600 : 25,
    () => setShowElevation(true),
    () => setShowElevation(false)
  );

  useEffect(() => {
    if (router.query.login) {
      setShowConnectWallet(true);
      router.query.login = undefined;
    }
  });

  const { userId, isStaff, isAdmin } = useAuth();

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
          showElevation ? 'bt:border-b-[1px] ' : ''
        } ${navbarBackground ? 'bg-bg' : ''}`}
      >
        <div
          className={`my-2 mx-4 flex max-w-xl items-center justify-between tablet:mx-auto tablet:max-w-2xl bt:max-w-5xl laptop:max-w-7xl ${padding}`}
        >
          {/* left side */}
          <div className="flex items-center gap-8">
            <LandingPageLink />
            <div className="hidden gap-8 bt:flex">
              <NavLink url={GoToBountiesPage()} label="Bounties" />
              <NavLink url={GoToOrganizationsPage()} label="Organizations" />
              <NavLink url={GoToTargetsPage()} label="Targets" />
              <NavLink url={GoToLeaderboard()} label="Leaderboard" />
              <NavLink url={GoToAboutusPage()} label="About" />
              <NavLink url={GoToRulesPage()} label="Rules" />
              <NavLink url={GoToFAQPage()} label="FAQ" />
            </div>
          </div>

          {/* right side */}
          <div className="flex items-center gap-1 bt:gap-6">
            {/* TODO: to be implemented - RED-98
            {!!userId && (
              <NotifsMenu
                userId={userId}
                shouldShow={showNotifs}
                hide={() => setShowNotifs(false)}
                show={() => setShowNotifs(true)}
              />
            )} */}

            {!userId ? (
              <div className="grid place-items-center py-1">
                <Button
                  info={{
                    label: 'Connect wallet',
                    style: ButtonStyle.Filled,
                    onClick: () => setShowConnectWallet(true),
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
        <div className="m-2 flex flex-wrap justify-around gap-x-10 gap-y-6 border-b-2 border-main pb-1 bt:hidden">
          <NavLink url={GoToBountiesPage()} label="Bounties" />
          <NavLink url={GoToOrganizationsPage()} label="Organizations" />
          <NavLink url={GoToTargetsPage()} label="Targets" />
        </div>
        <div className="m-2 flex flex-wrap justify-around gap-x-10 border-b-2 border-main pb-1 bt:hidden">
          <NavLink url={GoToLeaderboard()} label="Leaderboard" />
          <NavLink url={GoToAboutusPage()} label="About" />
          <NavLink url={GoToRulesPage()} label="Rules" />
          <NavLink url={GoToFAQPage()} label="FAQ" />
        </div>
      </nav>
      <ConnectWalletPopUp
        show={showConnectWallet && !userId}
        hide={() => setShowConnectWallet(false)}
      />
    </>
  );
}
