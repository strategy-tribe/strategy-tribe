import {
  GoToAboutusPage,
  GoToFAQPage,
  GoToBountiesPage,
  GoToOrganizationsPage,
} from '@/lib/utils/Routes';
import { useState } from 'react';
import { NavLink } from './NavLink';
import { useAuth } from 'auth/AuthContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { LandingPageLink } from './LandingPageLink';
import { UserMenu } from './menus/UserMenu';
import { NotifsMenu } from './menus/NotifsMenu';
import { NavbarButton } from './NavbarButton';
import useScrollPosition from '@/lib/hooks/useScrollPosition';

export function Navbar({ hideBgOnScroll }: { hideBgOnScroll: boolean }) {
  const [navbarBackground, setNavbarBackground] = useState(!hideBgOnScroll);

  const {} = useScrollPosition(
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

  const { userId, LogIn } = useAuth();

  const padding = !!userId ? 'py-3' : 'py-1';
  return (
    <>
      <nav
        className={`fixed top-0 text-text border-dark w-screen z-40 transition-colors duration-1000 ${
          showElevation ? 'border-b-[1px] ' : ''
        } ${navbarBackground ? 'bg-black' : ''}`}
      >
        <div
          className={`flex justify-between items-center max-w-7xl mx-auto ${padding}`}
        >
          {/* right side */}
          <div className="flex gap-8 items-center">
            <LandingPageLink />
            <NavLink url={GoToBountiesPage()} label="Bounties" />
            <NavLink url={GoToOrganizationsPage()} label="Organizations" />
            <NavLink url={GoToAboutusPage()} label="About" />
          </div>

          {/* Left side */}
          <div className="flex items-center gap-6">
            <NavLink url={GoToFAQPage()} label="FAQ" />
            {/* <NavbarButton icon="search" onClick={() => alert('to do')} /> */}
            {!!userId && (
              <NotifsMenu
                userId={userId}
                shouldShow={showNotifs}
                hide={() => setShowNotifs(false)}
                show={() => setShowNotifs(true)}
              />
            )}

            {!userId ? (
              <Button
                info={{
                  label: 'Connect wallet',
                  style: ButtonStyle.Filled,
                  onClick: LogIn,
                }}
              />
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
