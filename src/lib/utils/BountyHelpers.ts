import { TargetType } from '@prisma/client';

import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';

import { FullBounty } from '../types';

export function ParseBountyTitle(bounty: FullBounty) {
  const {
    title,
    target: {
      type,
      name: targetName,
      org: { name: orgName },
    },
  } = bounty;

  if (type === TargetType.ORG) {
    return title.replace(
      orgName.toLocaleLowerCase(),
      CapitalizeFirstLetter(orgName)
    );
  } else {
    return title?.replace(
      targetName.toLocaleLowerCase(),
      CapitalizeFirstLetter(orgName)
    );
  }
}
