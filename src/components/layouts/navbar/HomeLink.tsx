import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

import { GoToBountiesPage } from '@/utils/Routes';

import { Logo } from '../../utils/Logo';

export function HomeLink({ className }: { className?: string }) {
  const { isStaff } = useAuth();
  return (
    <Link href={GoToBountiesPage()}>
      <span className={`group flex shrink-0 items-center gap-2 ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-on-surface-p0">StrategyTribe</p>
          <span className="label text-on-surface-disabled">
            {isStaff && 'Staff Account'}
          </span>
        </div>
      </span>
    </Link>
  );
}
