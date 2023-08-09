import { TargetType } from '@prisma/client';

import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';

import { SmallBounty } from '@/server/routes/bounties/getBounties';

export function ParseBountyTitle(bounty: SmallBounty) {
  const title = bounty.title;
  const targetName = bounty.target.name;
  const type = bounty.target.type;
  const orgName = bounty.target.org?.name;

  if (!orgName) {
    return title;
  } else if (type === TargetType.Org) {
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
