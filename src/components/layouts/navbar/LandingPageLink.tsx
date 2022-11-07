import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

import { GoToLandingPage } from '@/utils/Routes';

import { Logo } from '../../utils/Logo';

export function LandingPageLink({ className }: { className?: string }) {
  const { isStaff, isAdmin } = useAuth();
  return (
    <Link href={GoToLandingPage()}>
      <span className={`flex gap-2 items-center shrink-0 group ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-on-surface-p0">StrategyTribe</p>
          <span className="text-main label">{isStaff && 'Staff'}</span>
          <span className="text-success label">{isAdmin && 'Admin'}</span>
        </div>
      </span>
    </Link>
  );
}
