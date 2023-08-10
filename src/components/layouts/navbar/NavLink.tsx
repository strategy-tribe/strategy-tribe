import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export function NavLink({ url, label }: { url: string; label: string }) {
  const router = useRouter();
  return (
    <Link href={url}>
      <span
        className={`min-w-fit shrink-0 hover:text-on-surface-p0  ${
          router.pathname === url && 'font-medium text-on-surface-p0'
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
