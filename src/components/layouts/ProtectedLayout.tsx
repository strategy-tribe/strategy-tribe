import React from 'react';
import { useBanRegularUsers } from '@/lib/hooks/useBanRegularUsers';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const passes = useBanRegularUsers();

  if (passes) return <>{children}</>;
  else return <></>;
}
