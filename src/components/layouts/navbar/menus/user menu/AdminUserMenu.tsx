import {
  GoToAccountPage,
  GoToAddBountiesPage,
  GoToEditBountyPage,
  GoToInvoicesPage,
  GoToReviewsPage,
  GoToUserInfoPage,
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
            {/* Not reqiured now
            <MenuItem
              label="Bounties to fund"
              url={GoToWaitingForFunds()}
              onClick={hide}
            /> */}

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

            <hr className="mx-8 w-full text-surface" />

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

            <hr className="mx-8 w-full text-surface" />

            <MenuItem
              label="Users Info"
              url={GoToUserInfoPage()}
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
