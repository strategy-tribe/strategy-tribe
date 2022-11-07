import { useState } from 'react';

import useScrollPosition from '@/lib/hooks/useScrollPosition';
import {
  GoToAboutusPage,
  GoToBountiesPage,
  GoToOrganizationsPage,
} from '@/lib/utils/Routes';

import { LandingPageLink } from './LandingPageLink';
import { NavLink } from './NavLink';
import { Button, ButtonStyle } from '../../utils/Button';

export function LandingNavbar({ hideBgOnScroll }: { hideBgOnScroll: boolean }) {
  const [navbarBackground, setNavbarBackground] = useState(!hideBgOnScroll);

  useScrollPosition(
    1100,
    () => setNavbarBackground(!hideBgOnScroll || true),
    () => setNavbarBackground(!hideBgOnScroll || false)
  );

  return (
    <>
      <nav
        className={`fixed top-0 text-on-surface-p1 w-screen z-40 ${
          navbarBackground ? 'bg-bg' : ''
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto py-1">
          {/* right side */}
          <div className="flex gap-8 items-center">
            <LandingPageLink />
            <NavLink url={GoToBountiesPage()} label="Bounties" />
            <NavLink url={GoToOrganizationsPage()} label="Organizations" />
            <NavLink url={GoToAboutusPage()} label="About" />
          </div>

          {/* Left side */}
          <div className="flex items-center gap-6">
            <Button
              info={{
                label: 'Join the hunt',
                style: ButtonStyle.Filled,
                isALink: GoToBountiesPage(),
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
