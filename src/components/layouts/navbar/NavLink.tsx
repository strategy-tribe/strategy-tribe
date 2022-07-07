import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function NavLink({ url, label }: { url: string; label: string }) {
  const router = useRouter();
  return (
    <Link href={url}>
      <a
        className={`hover:text-white shrink-0 min-w-fit  ${
          router.pathname === url && 'text-white font-medium'
        }`}
      >
        {label}
      </a>
    </Link>
  );
}
