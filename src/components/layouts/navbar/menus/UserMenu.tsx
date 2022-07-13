import { GoToAccountPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';
import { Overlay } from '@/components/utils/Overlay';
import { NavbarButton } from '../NavbarButton';
import { AccountView } from '@/lib/models/account/AccountView';

export function UserMenu({
  shouldShow,
  show,
  hide,
}: {
  shouldShow: boolean;
  show: () => void;
  hide: () => void;
}) {
  const { LogOut } = useAuth();

  return (
    <div className="relative">
      <NavbarButton icon="account_circle" onClick={show} />

      {shouldShow && (
        <aside>
          <div className="bg-darker text-text rounded-lg overflow-hidden body-sm flex flex-col z-50 absolute top-6 right-0">
            <Link href={GoToAccountPage()} className="w-full h-full">
              <a
                className="px-6 py-4 w-full text-left hover:bg-dark"
                onClick={hide}
              >
                Account
              </a>
            </Link>
            <Link
              href={GoToAccountPage(AccountView.Watching)}
              className="w-full h-full"
            >
              <a
                className="px-6 py-4 w-full text-left hover:bg-dark"
                onClick={hide}
              >
                Watching
              </a>
            </Link>
            <Link
              href={GoToAccountPage(AccountView.Submissions)}
              className="w-full h-full"
            >
              <a
                className="px-6 py-4 w-full text-left hover:bg-dark"
                onClick={hide}
              >
                Submissions
              </a>
            </Link>

            <hr className="w-full text-dark" />
            <button
              className="px-6 py-4 w-full text-left hover:bg-dark"
              onClick={() => {
                hide();
                LogOut();
              }}
            >
              Log out
            </button>
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
