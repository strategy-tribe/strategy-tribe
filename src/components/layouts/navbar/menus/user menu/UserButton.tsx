import { NavbarButton } from '../../NavbarButton';
import { useAuth } from 'auth/AuthContext';
import { cutWallet } from './RegularUserMenu';
import { roundToThree } from '@/lib/utils/NumberHelpers';

export function UserButton({ show }: { show: () => void }) {
  const { userInfo, isAuthenticated, balance } = useAuth();

  const wallet = cutWallet(userInfo?.mainWallet ?? '');

  return (
    <>
      {!isAuthenticated && (
        <NavbarButton icon="account_circle" onClick={show} />
      )}

      {isAuthenticated && (
        <button
          className="pl-4 border border-surface rounded-full label-sm flex items-center gap-2 group"
          onClick={show}
        >
          {balance ? (
            <span>{roundToThree(parseFloat(balance))} MATIC</span>
          ) : (
            <span className="w-5 h-5 bg-surface-dark animate-pulse rounded"></span>
          )}
          <span className="py-2 px-4 border border-on-surface-unactive rounded-full label-sm group-hover:bg-main group-hover:text-on-surface-p0 group-hover:border-main">
            {wallet}
          </span>
        </button>
      )}
    </>
  );
}
