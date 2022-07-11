import {
  GoToAboutusPage,
  GoToFAQPage,
  GoToBountiesPage,
  GoToOrganizationsPage,
} from '@/lib/utils/Routes';
import { useState } from 'react';
import { NavLink } from './NavLink';
import Icon, { IconSize } from '../../utils/Icon';
import { useAuth } from 'auth/AuthContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { LandingPageLink } from './LandingPageLink';
import { UserMenu } from './menus/UserMenu';
import { NotifsMenu } from './menus/NotifsMenu';
import { NavbarButton } from './NavbarButton';

export function Navbar() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const { userId, LogIn } = useAuth();

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
            <NavLink url={GoToBountiesPage()} label="Bounties" />
            <NavLink url={GoToOrganizationsPage()} label="Organizations" />
            <NavLink url={GoToAboutusPage()} label="About" />
          </div>

          {/* Left side */}
          <div className="flex items-center gap-6">
            <NavLink url={GoToFAQPage()} label="FAQ" />
            <NavbarButton icon="search" onClick={() => alert('to do')} />
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