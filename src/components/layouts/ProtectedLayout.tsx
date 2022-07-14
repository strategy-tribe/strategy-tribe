import React from 'react';
import { useBanRegularUsers } from '@/lib/hooks/useBanRegularUsers';
import { GoTo404Page } from '@/lib/utils/Routes';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const passes = useBanRegularUsers();

  if (passes) return <>{children}</>;
  else return <></>;
}
