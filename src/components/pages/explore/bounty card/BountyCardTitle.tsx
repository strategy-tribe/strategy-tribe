import React from 'react';
import Link from 'next/link';
import { GoToBountyPage } from '@/lib/utils/Routes';

export function BountyCardTitle({ title, id }: { title: string; id: string }) {
  return (
    <Link href={GoToBountyPage(id)}>
      <a className="title-xs">{title}</a>
    </Link>
  );
}
