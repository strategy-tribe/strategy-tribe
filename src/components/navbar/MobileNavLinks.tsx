import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import {
  GoToOrganizationsPage,
  GoToHomePage,
  GoToSearchPage,
  GoToUserPage,
} from '@/utils/Routes';
import { useIsInApp } from '@/hooks/useIsInApp';
import Icon from '../utils/Icon';

export function MobileNavLinks({
  className,
  show,
}: {
  className?: string;
  show: boolean;
}) {
  const isInApp = useIsInApp();

  if (isInApp)
    return (
      <>
        {show && (
          <div
            className={`${className} z-50 laptop:hidden fixed bottom-0 left-0 right-0 px-4 pb-3 pt-2 bg-black border-t-4 border-purpleDark flex justify-between`}
          >
            <MobileLink link={GoToHomePage()} icon="home" label="home" />
            <MobileLink
              link={GoToOrganizationsPage()}
              icon="sort"
              label="Organizatons"
            />
            <MobileLink link={GoToSearchPage()} icon="search" label="search" />
            <MobileLink
              link={GoToUserPage()}
              icon="manage_accounts"
              label="account"
            />
          </div>
        )}
      </>
    );
  else return <span />;
}

function MobileLink({
  link,
  label,
  icon,
}: {
  link: string;
  label: string;
  icon: string;
}) {
  const router = useRouter();

  const isActive = router.pathname === link;

  return (
    <Link href={link}>
      <a
        className={`flex flex-col items-center ${
          isActive ? 'text-white' : 'text-unactive'
        }`}
      >
        <Icon icon={icon} />
        <span className="label capitalize">{label}</span>
      </a>
    </Link>
  );
}
