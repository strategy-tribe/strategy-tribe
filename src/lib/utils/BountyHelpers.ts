import { Bounty } from '@/lib/models';
import { TargetType } from '@/lib/models/targetType';
import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';

export function ParseBountyTitle(bounty: Bounty) {
  const { title, organizationName, type, name } = bounty;

  if (type === TargetType.Organization) {
    return title.replace(
      organizationName.toLocaleLowerCase(),
      CapitalizeFirstLetter(organizationName)
    );
  } else {
    return title?.replace(
      name.toLocaleLowerCase(),
      CapitalizeFirstLetter(name)
    );
  }
}
