import {
  GoToAccountPage,
  GoToAddBountiesPage,
  GoToEditBountyPage,
  GoToInvoicesPage,
  GoToReviewsPage,
  GoToWaitingForFunds,
} from '@/lib/utils/Routes';

import { Overlay } from '@/components/utils/Overlay';

import { LogOutButton } from './LogOutButton';
import { MenuItem } from './MenuItem';
import { UserButton } from './UserButton';

export function AdminUserMenu({
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
          <div className="body-sm absolute top-6 right-0 z-50 flex flex-col overflow-hidden rounded-lg bg-surface-dark text-on-surface-p1">
            <MenuItem
              label="Bounties to fund"
              url={GoToWaitingForFunds()}
              onClick={hide}
            />

            <MenuItem
              label="Submissions to review"
              url={GoToReviewsPage()}
              onClick={hide}
            />

            <MenuItem
              label="Invoices"
              url={GoToInvoicesPage()}
              onClick={hide}
            />

            <MenuItem
              label="Add Bounties"
              url={GoToAddBountiesPage()}
              onClick={hide}
            />

            <MenuItem
              label="Edit Bounty"
              url={GoToEditBountyPage()}
              onClick={hide}
            />

            <MenuItem label="Account" url={GoToAccountPage()} onClick={hide} />

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
