import prisma from '@/lib/prisma/prismaClient';

import { addToDb } from './add';
import { updateDb } from './update';
import {
  ERROR,
  IND_PREFIX,
  LOG,
  OrgData,
  ORG_PREFIX,
  Row,
  TargetData,
} from './utils';

//*Scraping
async function scrapSheet() {
  const url = process.env.JSON_SHEET_URL as string;
  if (!url) {
    throw new Error('Undefined url for sheet_data.json');
  }
  const data = await fetch(url);
  const sheets = await data.json();

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

function scrapOrganizations(rows: Row[]): OrgData[] {
  const organizationsData = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];

    if (rowIndex === 0) continue;

    if (!row[0]) break;

    const org: OrgData = {
      name: row[0].toLowerCase().trim(),
      alsoKnownAs: typeof row[1] === 'string' ? row[1].split(',') : [],
      tags: typeof row[2] === 'string' ? row[2].split(',') : [],
      countries: typeof row[3] === 'string' ? row[3].split(',') : [],
      bio: row[4],
      why: row[5],
      links: typeof row[6] === 'string' ? row[6].split(',') : [],
    };

    org.alsoKnownAs =
      org.alsoKnownAs?.map((word) => word?.toLowerCase()?.trim()) || [];
    org.tags = org.tags?.map((word) => word?.toLowerCase()?.trim()) || [];
    org.countries =
      org.countries?.map((word) => word?.toUpperCase()?.trim()) || [];

    org.links = org.links?.map((word) => word?.toLowerCase()?.trim()) || [];

    organizationsData.push(org);
  }

  return organizationsData;
}

function scrapTargets(rows: Row[]): TargetData[] {
  const targetsData = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (rowIndex === 0) continue;
    if (!row[0]) break;

    const target: TargetData = {
      name: row[0].toLowerCase().trim(),
      organizationName:
        row[1]?.toLowerCase().trim() ?? 'Undefined organization',
      alsoKnownAs: typeof row[2] === 'string' ? row[2].split(',') : [],
      tags: typeof row[3] === 'string' ? row[3].split(',') : [],
    };

    target.alsoKnownAs =
      target.alsoKnownAs?.map((word) => word.toLowerCase().trim()) || [];
    target.tags = target.tags?.map((word) => word.toLowerCase().trim()) || [];

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

export async function GrabData() {
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
    await addToDb(newOrgs, newTargets);
    await updateDb(oldOrgs, oldTargets);
    LOG('End of job');
  } catch (error) {
    ERROR(`Error scraping sheet: ${error}`);
  }
}
