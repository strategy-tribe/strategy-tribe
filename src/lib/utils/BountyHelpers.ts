import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';
import { TargetType } from '@prisma/client';
import { FullBounty } from '../types';



export function ParseBountyTitle(bounty: FullBounty) {
  const title = bounty.title;
  const {
    type,
    name: targetName,
    org: { name: orgName },
  } = bounty.target!;

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
