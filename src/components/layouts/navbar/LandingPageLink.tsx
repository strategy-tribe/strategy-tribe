import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

import { GoToLandingPage } from '@/utils/Routes';

import { Logo } from '../../utils/Logo';

export function LandingPageLink({ className }: { className?: string }) {
  const { isStaff, isAdmin } = useAuth();
  return (
    <Link href={GoToLandingPage()}>
      <span className={`group flex shrink-0 items-center gap-2 ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-on-surface-p0">StrategyTribe</p>
          <span className="label text-main">{isStaff && 'Staff'}</span>
          <span className="label text-success">{isAdmin && 'Admin'}</span>
        </div>
      </span>
    </Link>
  );
}
