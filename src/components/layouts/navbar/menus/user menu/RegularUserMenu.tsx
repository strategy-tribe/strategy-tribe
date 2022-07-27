import { GoToAccountPage } from '@/lib/utils/Routes';
import { Overlay } from '@/components/utils/Overlay';
import { AccountView } from '@/lib/models/account/AccountView';
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
          <div className="bg-surface-dark text-on-surface-p1 rounded overflow-hidden body-sm flex flex-col z-50 absolute top-10 right-0">
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
