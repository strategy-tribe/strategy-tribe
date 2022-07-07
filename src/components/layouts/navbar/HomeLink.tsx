import React from 'react';
import Link from 'next/link';
import { GoToBountiesPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { Logo } from '../../utils/Logo';

export function HomeLink({ className }: { className?: string }) {
  const { isStaff } = useAuth();
  return (
    <Link href={GoToBountiesPage()}>
      <a className={`flex gap-2 items-center shrink-0 group ${className}`}>
        <Logo />
        <div className="text-left">
          <p className="label-lg text-white">StrategyTribe</p>
          <span className="text-disabled label">
            {isStaff && 'Staff Account'}
          </span>
        </div>
      </a>
    </Link>
  );
}
