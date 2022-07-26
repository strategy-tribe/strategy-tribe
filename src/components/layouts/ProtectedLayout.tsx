import React from 'react';
import { useBanRegularUsers } from '@/lib/hooks/useBanRegularUsers';

export default function ProtectedLayout({
  children,
  allowedUsers = [],
}: {
  children: React.ReactNode;
  allowedUsers?: string[];
}) {
  const passes = useBanRegularUsers();

  if (passes) return <>{children}</>;
  else return <></>;
}
