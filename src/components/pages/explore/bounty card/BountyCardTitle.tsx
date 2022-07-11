import React from 'react';
import Link from 'next/link';
import { GoToBountyPage } from '@/lib/utils/Routes';
import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';
import { Bounty } from '@/lib/models';

export function BountyCardTitle({ bounty }: { bounty: Bounty }) {
  const { title, id, organizationName } = bounty;

  const parsedTitle = title.replace(
    organizationName.toLocaleLowerCase(),
    CapitalizeFirstLetter(organizationName)
  );

  return (
    <Link href={GoToBountyPage(id!)}>
      <a className="title-xs">{parsedTitle}</a>
    </Link>
  );
}
