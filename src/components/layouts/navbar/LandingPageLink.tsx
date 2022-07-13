import React from 'react';
import Link from 'next/link';
import { GoToLandingPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { Logo } from '../../utils/Logo';

export function LandingPageLink({ className }: { className?: string }) {
  const { isStaff, isAdmin } = useAuth();
  return (
    <Link href={GoToLandingPage()}>
      <a className={`flex gap-2 items-center shrink-0 group ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-white">StrategyTribe</p>
          <span className="text-purpleDark label">{isStaff && 'Staff'}</span>
          <span className="text-greenDark label">{isAdmin && 'Admin'}</span>
        </div>
      </a>
    </Link>
  );
}
