import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export function NavLink({ url, label }: { url: string; label: string }) {
  const router = useRouter();
  return (
    <Link href={url}>
      <span
        className={`hover:text-on-surface-p0 shrink-0 min-w-fit  ${
          router.pathname === url && 'text-on-surface-p0 font-medium'
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
