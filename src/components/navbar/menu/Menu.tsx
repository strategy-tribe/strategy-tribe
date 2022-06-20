import React from 'react';
import { useRouter } from 'next/router';
import { GoToHomePage, GoToNewBountyPage } from '@/utils/Routes';
import { MenuItem } from './MenuItem';
import { useAuth } from 'auth/AuthContext';
import { ButtonInformation } from '@/components/utils/Button';
import useWindowDimensions from '@/hooks/useWindowDimensions';

export function Menu({
  show,
  hide,
  extraButtons = [],
}: {
  show: boolean;
  hide: () => void;
  extraButtons?: ButtonInformation[];
}) {
  const router = useRouter();
  const { LogOut, userId, isStaff } = useAuth();
  const { width } = useWindowDimensions();
  return (
    <aside
      className={`${
        !show ? 'translate-y-2 opacity-0 pointer-events-none' : ''
      } transition-all ease-in-out duration-300 z-50 absolute top-12 right-2 bg-purpleDark text-white py-6 px-4 rounded-2xl min-w-[13rem]`}
    >
      <ul className="font-grotesk font-semibold flex flex-col gap-8 text-right text-base">
        {extraButtons.map((info, i) => {
          if (width < 1200 && info.className?.includes(' hidden ')) {
            return <></>;
          } else if (
            width > 1200 &&
            info.className?.includes('laptop:hidden')
          ) {
            return <></>;
          }
          return (
            <MenuItem
              key={i}
              label={info.label as string}
              icon={info.icon as string}
              onClick={() => {
                if (info.onClick) info.onClick();
                hide();
              }}
              disabled={!!info.disabled}
              containerClass={info.className}
            />
          );
        })}
        {isStaff && router.pathname.includes('/app') && (
          <MenuItem
            label="New Bounty"
            icon="add"
            onClick={() => {
              router.push(GoToNewBountyPage());
              hide();
            }}
            disabled={!show}
          />
        )}
        {!!userId && router.pathname.includes('/app') && (
          <MenuItem
            label="Log out"
            icon="logout"
            onClick={() => {
              LogOut();
              hide();
            }}
            disabled={!show}
          />
        )}
      </ul>
    </aside>
  );
}
