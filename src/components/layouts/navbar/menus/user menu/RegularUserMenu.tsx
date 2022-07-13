import { GoToAccountPage } from '@/lib/utils/Routes';
import { Overlay } from '@/components/utils/Overlay';
import { NavbarButton } from '../../NavbarButton';
import { AccountView } from '@/lib/models/account/AccountView';
import { LogOutButton } from './LogOutButton';
import { MenuItem } from './MenuItem';

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
      <NavbarButton icon="account_circle" onClick={show} />

      {shouldShow && (
        <aside>
          <div className="bg-darker text-text rounded-lg overflow-hidden body-sm flex flex-col z-50 absolute top-6 right-0">
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

            <hr className="w-full text-dark" />
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
