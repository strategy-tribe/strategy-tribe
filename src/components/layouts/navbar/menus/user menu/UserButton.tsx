import { NavbarButton } from '../../NavbarButton';
import { useAuth } from 'auth/AuthContext';
import { cutWallet } from './RegularUserMenu';

function roundToThree(num: number) {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

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
          className="pl-4 border border-dark rounded-full label-sm flex items-center gap-2 group"
          onClick={show}
        >
          {!!balance ? (
            <span>{roundToThree(parseFloat(balance))} MATIC</span>
          ) : (
            <span className="w-5 h-5 bg-darker animate-pulse rounded"></span>
          )}
          <span className="py-2 px-4 border border-unactive rounded-full label-sm group-hover:bg-purpleDark group-hover:text-white group-hover:border-purpleDark">
            {wallet}
          </span>
        </button>
      )}
    </>
  );
}
