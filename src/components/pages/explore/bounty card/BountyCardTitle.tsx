import React from 'react';
import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';
import { Bounty } from '@/lib/models';

export function BountyCardTitle({ bounty }: { bounty: Bounty }) {
  const { title, id, organizationName } = bounty;

  const parsedTitle = title.replace(
    organizationName.toLocaleLowerCase(),
    CapitalizeFirstLetter(organizationName)
  );

  return <h4 className="title-xs group-hover:text-white">{parsedTitle}</h4>;
}
