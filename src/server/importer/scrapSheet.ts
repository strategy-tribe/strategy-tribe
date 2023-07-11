import { PrismaClient, RequirementType } from '@prisma/client';

import { isString, toTitleCase } from '@/lib/utils/StringHelpers';

import prisma from '@/server/prisma/prismaClient';

import { addToDb } from './add';
import {
  DEFAULT_TYPES_FOR_BOUNTIES,
  ERROR,
  IND_PREFIX,
  LOG,
  ORG_PREFIX,
  OrgData,
  Row,
  TargetData,
} from './utils';
import { updateDb } from '../dataModifications/update';
import { ReadFileInDataFolder } from '../routers/ReadFileInDataFolder';

//*Scraping
async function scrapSheet() {
  const sheets = ReadFileInDataFolder(
    process.env.SHEET_FILE as string,
    'admin'
  ).data;
  if (!sheets) {
    throw new Error('Undefined to read data from sheets.json');
  }

  let organizations: OrgData[] = [];
  let targets: TargetData[] = [];

  for (let sheetIndex = 0; sheetIndex < sheets.length; sheetIndex++) {
    const sheet = sheets[sheetIndex];
    const rows = sheet.rowsData; //array
    const title = sheet.sheet_name;

    if (title.startsWith(ORG_PREFIX)) {
      //scrap org
      LOG(`Scrapping "${title}" as an ORG sheet`);
      organizations = [...organizations, ...scrapOrganizations(rows)];
    } else if (title.startsWith(IND_PREFIX)) {
      //scrap individual
      LOG(`Scrapping "${title}" as an IND sheet`);
      targets = [...targets, ...scrapTargets(rows)];
    }

    LOG(
      `SHEET (${sheetIndex + 1}/${sheets.length}). Orgs: ${
        organizations.length
      }. Targets: ${targets.length}`
    );
  }

  return { organizations, targets };
}

export function scrapOrganizations(rows: Row[]): OrgData[] {
  const organizationsData = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];

    if (rowIndex === 0) continue;

    if (!row[0]) break;

    const org: OrgData = {
      name: row[0].toLowerCase().trim(),
      alsoKnownAs: isString(row[1]) ? row[1].split(',') : [],
      tags: isString(row[2]) ? row[2].split(',') : [],
      countries: isString(row[3]) ? row[3].split(',') : [],
      bio: row[4],
      why: row[5],
      links: isString(row[6]) ? row[6].split(',') : [],
      types: isString(row[7])
        ? row[7].split(',').map((i) => toTitleCase(i.trim()) as RequirementType)
        : [],
      incrementConfig: row[8],
    };

    org.alsoKnownAs =
      org.alsoKnownAs?.map((word) => word?.toLowerCase()?.trim()) || [];
    org.tags = org.tags?.map((word) => word?.toLowerCase()?.trim()) || [];
    org.countries =
      org.countries?.map((word) => word?.toUpperCase()?.trim()) || [];

    org.links = org.links?.map((word) => word?.toLowerCase()?.trim()) || [];

    if (org.types.length === 0) org.types = DEFAULT_TYPES_FOR_BOUNTIES;
    else if (org.types.length === 1 && row[7]?.toLowerCase() === 'none')
      org.types = [];

    organizationsData.push(org);
  }

  return organizationsData;
}

export function scrapTargets(rows: Row[]): TargetData[] {
  const targetsData = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (rowIndex === 0) continue;
    if (!row[0]) break;

    const target: TargetData = {
      name: row[0].toLowerCase().trim(),
      organizationName:
        row[1]?.toLowerCase().trim() ?? 'Undefined organization',
      alsoKnownAs: isString(row[2]) ? row[2].split(',') : [],
      tags: isString(row[3]) ? row[3].split(',') : [],
      bio: row[4].trim(),
      types: isString(row[5])
        ? row[5]
            .split(',')
            .map(
              (i) =>
                toTitleCase(i.trim()).replaceAll(' ', '') as RequirementType
            )
        : [],
      incrementConfig: row[6],
    };

    target.alsoKnownAs =
      target.alsoKnownAs?.map((word) => word.toLowerCase().trim()) || [];
    target.tags = target.tags?.map((word) => word.toLowerCase().trim()) || [];

    if (target.types.length === 0) target.types = DEFAULT_TYPES_FOR_BOUNTIES;
    else if (target.types.length === 1 && row[5]?.toLowerCase() === 'none')
      target.types = [];

    targetsData.push(target);
  }
  return targetsData;
}

async function classifyTargets(targets: TargetData[]) {
  LOG('Classifying targets');

  const newTargets: TargetData[] = [];
  const oldTargets: TargetData[] = [];

  //all targets
  const allTargets = await prisma.target.findMany();
  for (const t of targets) {
    if (allTargets.find((x) => x.name === t.name)) oldTargets.push(t);
    else newTargets.push(t);
  }

  return { newTargets, oldTargets };
}

async function classifyOrgs(orgs: OrgData[]) {
  LOG('Classifying orgs');

  const newOrgs: OrgData[] = [];
  const oldOrgs: OrgData[] = [];

  //all targets
  const allOrgs = await prisma.organization.findMany();
  for (const org of orgs) {
    if (allOrgs.find((x) => x.name === org.name)) oldOrgs.push(org);
    else newOrgs.push(org);
  }

  return { newOrgs, oldOrgs };
}

export async function GrabData(prisma: PrismaClient) {
  try {
    LOG('1) Grabbing data from file');
    const { organizations: sheetOrgs, targets: sheetTargets } =
      await scrapSheet();
    LOG(
      `1.1) Done. ${sheetOrgs.length} orgs & ${sheetTargets.length} targets.`
    );

    LOG('2) Classifying data');
    const { newOrgs, oldOrgs } = await classifyOrgs(sheetOrgs);
    const { newTargets, oldTargets } = await classifyTargets(sheetTargets);
    LOG(
      `2.1) Done classifying data\nOrgs to create: ${newOrgs.length}\nOrgs to update: ${oldOrgs.length}\nTargets to create: ${newTargets.length}\nTargets to update: ${oldTargets.length}`
    );
    //! Order matters
    await addToDb(prisma, newOrgs, newTargets);
    await updateDb(prisma, oldOrgs, oldTargets);
    LOG('End of job');
  } catch (error) {
    ERROR(`Error scraping sheet: ${error}`);
  }
}
