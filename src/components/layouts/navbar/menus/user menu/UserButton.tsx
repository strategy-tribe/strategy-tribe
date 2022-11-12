import { useMemo } from 'react';

import { roundToThree } from '@/lib/utils/NumberHelpers';

import { useAuth } from '@/auth/AuthContext';

import { cutWallet } from './RegularUserMenu';

export function UserButton({ show }: { show: () => void }) {
  const { userInfo, isAuthenticated, balance } = useAuth();

  const wallet = cutWallet(userInfo?.address ?? '');

  const parsedBalance = useMemo(() => {
    try {
      if (balance) return `${roundToThree(parseFloat(balance))} MATIC`;
      else return '...';
    } catch (error) {
      return '...';
    }
  }, [balance]);

  return (
    <>
      {isAuthenticated && (
        <button
          className={`label-sm group flex items-center gap-2 rounded-full border border-surface ${
            balance ? 'pl-4 ' : ''
          }`}
          onClick={show}
        >
          <span>{parsedBalance}</span>

          <span className="label-sm rounded-full border border-on-surface-unactive py-2 px-4 group-hover:border-main group-hover:bg-main group-hover:text-on-surface-p0">
            {wallet}
          </span>
        </button>
      )}
    </>
  );
}
