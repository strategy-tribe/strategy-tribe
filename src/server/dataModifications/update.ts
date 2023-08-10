import { PrismaClient } from '@prisma/client';

import { OrgData, TargetData } from '../importer/utils';

//*Update
export async function updateDb(
  prisma: PrismaClient,
  organizations: OrgData[],
  targetsAndBounties: TargetData[]
) {
  //Order matters
  // LOG('6) Updating DB');
  // LOG('6.1) Updating orgs');
  // await updateOrgs(organizations);
  // LOG('6.2) Updated orgs');
  // LOG('6.3) Updating targets');
  // await updateTargets(targetsAndBounties);
  // LOG('6.4) Updated targets');
}
