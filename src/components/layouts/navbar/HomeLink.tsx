import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

import { GoToBountiesPage } from '@/utils/Routes';

import { Logo } from '../../utils/Logo';

export function HomeLink({ className }: { className?: string }) {
  const { isStaff } = useAuth();
  return (
    <Link href={GoToBountiesPage()}>
      <span className={`flex gap-2 items-center shrink-0 group ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-on-surface-p0">StrategyTribe</p>
          <span className="text-on-surface-disabled label">
            {isStaff && 'Staff Account'}
          </span>
        </div>
      </span>
    </Link>
  );
}
