import {
  GoToAboutusPage,
  GoToHomePage,
  GoToOrganizationsPage,
} from '@/lib/utils/Routes';
import { useState } from 'react';
import { NavLink } from './NavLink';
import { useScrollPosition } from '@/lib/hooks';
import { Button, ButtonStyle } from '../../utils/Button';
import { LandingPageLink } from './LandingPageLink';

export function LandingNavbar({ hideBgOnScroll }: { hideBgOnScroll: boolean }) {
  const [navbarBackground, setNavbarBackground] = useState(!hideBgOnScroll);

  const {} = useScrollPosition(
    1100,
    () => setNavbarBackground(!hideBgOnScroll || true),
    () => setNavbarBackground(!hideBgOnScroll || false)
  );

  return (
    <>
      <nav
        className={`fixed top-0 text-text w-screen z-40 ${
          navbarBackground ? 'bg-black' : ''
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto py-1">
          {/* right side */}
          <div className="flex gap-8 items-center">
            <LandingPageLink />
            <NavLink url={GoToHomePage()} label="Bounties" />
            <NavLink url={GoToOrganizationsPage()} label="Organizations" />
            <NavLink url={GoToAboutusPage()} label="About" />
          </div>

          {/* Left side */}
          <div className="flex items-center gap-6">
            <Button
              info={{
                label: 'Join the hunt',
                style: ButtonStyle.Filled,
                isALink: GoToHomePage(),
              }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
