import { AccountView } from '@/lib/models/AccountView';
import { GoToAccountPage } from '@/lib/utils/Routes';

import { Overlay } from '@/components/utils/Overlay';

import { LogOutButton } from './LogOutButton';
import { MenuItem } from './MenuItem';
import { UserButton } from './UserButton';

export function cutWallet(address: string) {
  const firstPart = address
    .split('')
    .filter((_, i) => i < 6)
    .join()
    .replaceAll(',', '');

  const secondPart = address
    .split('')
    .filter((_, i) => i > address.split('').length - 5)
    .join()
    .replaceAll(',', '');

  const wallet = `${firstPart}...${secondPart}`;

  return wallet;
}

export function RegularUserMenu({
  shouldShow,
  show,
  hide,
}: {
  shouldShow: boolean;
  show: () => void;
  hide: () => void;
}) {
  return (
    <div className="relative">
      <UserButton show={show} />

      {shouldShow && (
        <aside>
          <div className="body-sm absolute top-10 right-0 z-50 flex flex-col overflow-hidden rounded bg-surface-dark text-on-surface-p1">
            <MenuItem label="Account" url={GoToAccountPage()} onClick={hide} />

            <MenuItem
              label="Watching"
              url={GoToAccountPage(AccountView.Watching)}
              onClick={hide}
            />
            <MenuItem
              label="Submissions"
              url={GoToAccountPage(AccountView.Submissions)}
              onClick={hide}
            />

            <MenuItem
              label="Rewards"
              url={GoToAccountPage(AccountView.Rewards)}
              onClick={hide}
            />

            <hr className="w-full text-surface" />
            <LogOutButton hide={hide} />
          </div>

          <Overlay
            showOverlay={shouldShow}
            hide={hide}
            zIndex="z-40"
            opacity="opacity-30"
          />
        </aside>
      )}
    </div>
  );
}
