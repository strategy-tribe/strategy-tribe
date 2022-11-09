import { TargetType } from '@prisma/client';

import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';

import { SmallBounty } from '@/server/routes/bounties/getBounties';

export function ParseBountyTitle(bounty: SmallBounty) {
  const title = bounty.title;
  const {
    type,
    name: targetName,
    org: { name: orgName },
  } = bounty.target;

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
