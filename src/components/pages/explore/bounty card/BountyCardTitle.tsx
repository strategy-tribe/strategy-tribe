import React from 'react';
import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';
import { Bounty } from '@/lib/models';

export function BountyCardTitle({ bounty }: { bounty: Bounty }) {
  const { title, id, organizationName } = bounty;

  const parsedTitle = title.replace(
    organizationName.toLocaleLowerCase(),
    CapitalizeFirstLetter(organizationName)
  );

  return <h5 className="group-hover:text-on-surface-p0">{parsedTitle}</h5>;
}
