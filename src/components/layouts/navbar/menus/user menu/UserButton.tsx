import { roundToThree } from '@/lib/utils/NumberHelpers';

import { useAuth } from '@/auth/AuthContext';

import { cutWallet } from './RegularUserMenu';

export function UserButton({ show }: { show: () => void }) {
  const { userInfo, isAuthenticated, balance } = useAuth();

  const wallet = cutWallet(userInfo?.mainWallet ?? '');

  return (
    <>
      {isAuthenticated && (
        <button
          className={`label-sm group flex items-center gap-2 rounded-full border border-surface ${
            balance ? 'pl-4 ' : ''
          }`}
          onClick={show}
        >
          {balance ? (
            <span>{roundToThree(parseFloat(balance))} MATIC</span>
          ) : (
            <></>
          )}

          <span className="label-sm rounded-full border border-on-surface-unactive py-2 px-4 group-hover:border-main group-hover:bg-main group-hover:text-on-surface-p0">
            {wallet}
          </span>
        </button>
      )}
    </>
  );
}
