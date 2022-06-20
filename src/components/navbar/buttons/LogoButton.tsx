import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoToHomePage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';

export function LogoButton({
  onClick = GoToHomePage,
}: {
  onClick?: () => string;
}) {
  const { isStaff } = useAuth();
  return (
    <Link href={onClick()}>
      <div className="flex gap-2 cursor-pointer items-center">
        <Image src="/images/logo.svg" alt="logo" width={24} height={24} />
        <div className="text-left">
          <h1 className="font-grotesk font-medium text-xl">StrategyTribe</h1>
          <span className="font-medium text-disabled font-grotesk">
            {isStaff && 'Staff Account'}
          </span>
        </div>
      </div>
    </Link>
  );
}
