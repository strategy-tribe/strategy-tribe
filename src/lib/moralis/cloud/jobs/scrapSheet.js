const ORG_PREFIX = 'org_';
const IND_PREFIX = 'ind_';

//*Scraping
async function scrapSheet() {
  const { url } = await GetSheetUrl();

  const res = await Moralis.Cloud.httpRequest({
    url,
  });

  const sheets = res.data.sheets;

  let organizations = [];
  let targets = [];

  for (let sheetIndex = 0; sheetIndex < sheets.length; sheetIndex++) {
    const sheet = sheets[sheetIndex];
    const sheetData = sheet.data.at(0); //obj
    const rows = sheetData.rowData; //array

    const title = sheet.properties.title;
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

function scrapOrganizations(rows) {
  const organizationsData = [];

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];

    if (rowIndex === 0) continue;

    const cells = row.values.map((v) => {
      if (v.formattedValue) return v.formattedValue;
    });

    if (!cells[0]) break;

    const org = {
      organizationName: cells[0].toLowerCase().trim(),
      alsoKnownAs: typeof cells[1] === 'string' ? cells[1].split(',') : [],
      tags: typeof cells[2] === 'string' ? cells[2].split(',') : [],
      countries: typeof cells[3] === 'string' ? cells[3].split(',') : [],
    };

    org.alsoKnownAs =
      org.alsoKnownAs?.map((word) => word.toLocaleLowerCase().trim()) || [];
    org.tags = org.tags?.map((word) => word.toLocaleLowerCase().trim()) || [];
    org.countries =
      org.countries?.map((word) => word.toLocaleLowerCase().trim()) || [];

    organizationsData.push(org);
  }

  return organizationsData;
}

function scrapTargets(rows) {
  const targetsData = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    if (rowIndex === 0) continue;

    const cells = row.values.map((v) => {
      if (v.formattedValue) return v.formattedValue;
    });

    if (!cells[0]) break;

    const target = {
      name: cells[0].toLowerCase().trim(),
      organizationName: cells[1].toLowerCase().trim(),
      alsoKnownAs: typeof cells[2] === 'string' ? cells[2].split(',') : [],
      tags: typeof cells[3] === 'string' ? cells[3].split(',') : [],
    };

    target.alsoKnownAs =
      target.alsoKnownAs?.map((word) => word.toLowerCase().trim()) || [];
    target.tags = target.tags?.map((word) => word.toLowerCase().trim()) || [];

    targetsData.push(target);
  }
  return targetsData;
}

async function clasificateTargets(targets) {
  LOG('Classifying targets');

  const newTargets = [];
  const oldTargets = [];

  const promises = [];

  for (const target of targets) {
    const queryDb = async (target) => {
      const query = new Moralis.Query(BOUNTY_TABLE);
      const targetName = target.name;
      query.endsWith('name', targetName);
      const targetBountiesInDb = await query.find();

      if (!targetBountiesInDb || targetBountiesInDb?.length === 0) {
        newTargets.push(target);
      } else {
        oldTargets.push({
          newData: target,
          bountiesToUpdate: targetBountiesInDb,
        });
      }
    };

    promises.push(queryDb(target));
  }

  await Promise.all(promises);

  return { newTargets, oldTargets };
}

async function clasificateOrgs(sheetOrgs) {
  LOG('Classifying orgs');
  //find which orgs and bounties are new and which ones are to be updated.
  const query = new Moralis.Query(ORG_TABLE);
  const dbOrgs = await query.find();
  const newOrgs = sheetOrgs.filter((sheetOrg) => {
    return !dbOrgs.find((org) => org.get('name') !== sheetOrg.orgName);
  });

  const oldOrgs = sheetOrgs.filter((sheetOrg) => {
    return dbOrgs.find((org) => org.get('name') !== sheetOrg.orgName);
  });

  return { newOrgs, oldOrgs };
}

Moralis.Cloud.job('Grab data from spreadsheet', async () => {
  try {
    LOG('1) Scrapping');
    const { organizations: sheetOrgs, targets: sheetTargets } =
      await scrapSheet();
    LOG(
      `1.1) Done. ${sheetOrgs.length} orgs & ${sheetTargets.length} targets.`
    );

    LOG('2) Classifying data');
    const { newOrgs, oldOrgs } = await clasificateOrgs(sheetOrgs);
    const { newTargets, oldTargets } = await clasificateTargets(sheetTargets);
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
});
