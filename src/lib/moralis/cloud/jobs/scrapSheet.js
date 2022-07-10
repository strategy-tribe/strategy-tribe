const ORG_PREFIX = 'org_';
const IND_PREFIX = 'ind_';

Moralis.Cloud.job('scrapSheet', async () => {
  try {
    LOG('1) Scrapping');
    const { organizations, targets } = await scrapSheet();
    LOG(`1.1) Done. ${organizations.length} orgs & ${targets.length} targets.`);

    // //*Organizations
    LOG('2) Creating organizations');
    const defaultBounties = await createOrganizations(organizations);
    LOG(`2.1) Done. ${defaultBounties.length} organizations.`);

    // //*Org Bounties
    LOG(
      `3) Creating default bounties for ${defaultBounties.length} organizations`
    );
    await createDefaultBounties(defaultBounties);
    LOG('3.1) Done.');

    // //*Individual Bounties
    LOG('4) Creating bounties for targets.');

    for (let index = 0; index < targets.length; index++) {
      const target = targets[index];
      const organization = organizations.find(
        (org) => org.organizationName === target.organizationName
      );

      if (!organization) {
        ERROR(
          `No organization found for ${target.title}. The target says the org should be : "${target.organizationName}"`
        );
        continue;
      }

      const bounties = createBountiesForIndividual(
        target,
        organization.countries
      );

      for await (const bounty of bounties) {
        await saveBounty(bounty);
      }

      LOG(`(${index}/${targets.length - 1}) targets`);
    }

    LOG('4.1) Done');
  } catch (error) {
    ERROR(`Error scraping sheet: ${error}`);
  }
});

function createBountiesForIndividual(target, countries) {
  const bounties = [];

  const bountiesData = [
    {
      type: 'Email',
      title: 'Find emails associated with ',
      label: 'Email address',
      extra: true,
      extraLabel: 'Extra email addresses',
      reportRequired: false,
      days: 300,
    },
    {
      type: 'Wallet',
      title: 'Find wallets associated with ',
      label: 'Wallet address',
      extra: true,
      extraLabel: 'Extra Wallet addresses',
      reportRequired: false,
      days: 300,
    },
    {
      type: 'Domain',
      title: 'Find domains associated with ',
      label: 'Domains',
      extra: true,
      extraLabel: 'Extra domains',
      reportRequired: false,
      days: 300,
    },
  ];

  bountiesData.map((data) => {
    const {
      label,
      title: _title,
      reportRequired,
      type,
      extra,
      extraLabel,
      days,
    } = data;

    const title = `${_title} ${target.name}`;

    const requirements = [
      //main req
      {
        title: label,
        type: type,
        optional: false,
      },
      //report
      {
        title: 'How did you found this information?',
        type: 'Report',
        optional: reportRequired,
      },
    ];

    if (extra) {
      requirements.push({
        title: extraLabel,
        type: type,
        optional: true,
      });
    }

    let closesAt = undefined;
    if (days) {
      const today = new Date();
      closesAt = addDays(today, days);
    }

    bounties.push({
      title,
      requirements,
      closesAt,
      //
      name: target.name,
      alsoKnownAs: target.alsoKnownAs,
      type: 'Individual',
      organizationName: target.organizationName,
      tags: target.tags,
      countries,
    });
  });

  return bounties;
}

//!Scraping
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
      name: cells[0].toLocaleLowerCase().trim(),
      organizationName: cells[1].toLowerCase().trim(),
      alsoKnownAs: typeof cells[2] === 'string' ? cells[2].split(',') : [],
      tags: typeof cells[3] === 'string' ? cells[3].split(',') : [],
    };

    target.alsoKnownAs =
      target.alsoKnownAs?.map((word) => word.toLocaleLowerCase().trim()) || [];
    target.tags =
      target.tags?.map((word) => word.toLocaleLowerCase().trim()) || [];

    targetsData.push(target);
  }
  return targetsData;
}

//!Saving organizations in DB
async function createOrganizations(organizations) {
  const orgsToCreateBountiesTo = [];

  for await (const org of organizations) {
    const name = await createOrganization(
      org.organizationName,
      org.alsoKnownAs,
      org.countries,
      org.tags
    );

    if (name) orgsToCreateBountiesTo.push({ name, countries: org.countries });
    LOG(
      `creating orgs (${organizations.indexOf(org) + 1}/${
        organizations.length
      })`
    );
  }
  return orgsToCreateBountiesTo;
}

async function createOrganization(name, alsoKnownAs, countries, tags) {
  //*Check if the org exists
  const q = new Moralis.Query(ORG_TABLE);
  q.equalTo('name', name);
  const res = await q.first({ useMasterKey: true });

  if (res) {
    LOG(`${name} already exists`);
    return;
  }

  //*Create
  let orgRef = new Moralis.Object(ORG_TABLE);

  //stats
  orgRef.set('name', name);
  orgRef.set('alsoKnownAs', alsoKnownAs || []);

  const countriesUpperCase = countries?.map((c) => c.toUpperCase().trim());
  orgRef.set('countries', countriesUpperCase || []);
  orgRef.set('tags', tags.map((tag) => tag.toLowerCase().trim()) || []);
  orgRef.set('bounties', 0);
  orgRef.set('funds', 0);

  const acl = new Moralis.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);
  acl.setRoleWriteAccess('staff', true);
  acl.setRoleReadAccess('staff', true);
  orgRef.setACL(acl);

  await orgRef.save(null, { useMasterKey: true });
  return name;
}

async function createDefaultBounties(namesAndCountries) {
  for await (const data of namesAndCountries) {
    const { name, countries } = data;
    const params = generateBountiesParams(name, countries);

    for await (const p of params) {
      await saveBounty(p);
    }
    LOG(
      `creating default bounties (${namesAndCountries.indexOf(data) + 1}/${
        namesAndCountries.length
      })`
    );
  }
}

function generateBountiesParams(organizationName, countries) {
  const params = [];

  const bountiesDetails = [
    {
      type: 'Email',
      title: 'Find emails associated with the',
      targetTitle: 'Emails associated with the',
      label: 'Email address',
      extra: true,
      extraLabel: 'Extra email addresses',
      reportRequired: false,
      tags: ['emails'],
      days: 100,
    },
    {
      type: 'Wallet',
      title: 'Find wallets associated with the',
      targetTitle: 'Wallet addresses associated with the',
      label: 'Wallet address',
      extra: true,
      extraLabel: 'Extra Wallet addresses',
      reportRequired: false,
      tags: ['wallets'],
      days: 100,
    },
    {
      type: 'Domain',
      title: 'Find domains associated with the',
      targetTitle: 'Domains associated with the',
      label: 'Domains',
      extra: true,
      extraLabel: 'Extra domains',
      reportRequired: false,
      tags: ['domains'],
      days: 100,
    },
    {
      type: 'Email',
      title: 'Find emails of members associated with the',
      targetTitle: 'Emails of members associated with the',
      label: 'Email address',
      extra: true,
      extraLabel: 'Extra email addresses',
      reportRequired: false,
      tags: ['emails'],
      days: 100,
    },
  ];

  for (const details of bountiesDetails) {
    const {
      label,
      title: _title,
      targetTitle,
      reportRequired,
      type,
      extra,
      extraLabel,
      days,
      tags,
    } = details;

    const title = `${_title.trim()} ${organizationName.trim()}`;
    const name = `${targetTitle.trim()} ${organizationName.trim()}`;

    const requirements = [
      //main req
      {
        title: label,
        type: type,
        optional: false,
      },
      //report
      {
        title: 'How did you found this information?',
        type: 'Report',
        optional: reportRequired,
      },
    ];

    if (extra) {
      requirements.push({
        title: extraLabel,
        type: type,
        optional: true,
      });
    }

    let closesAt = undefined;
    if (days) {
      const today = new Date();
      closesAt = addDays(today, days);
    }

    const param = {
      title,
      requirements,
      closesAt,
      //
      name: name,
      type: 'Organization',
      organizationName: organizationName,
      tags,
      countries: countries,
    };
    params.push(param);
  }

  return params;
}

//!For both
async function saveBounty(bountyData) {
  const {
    title,
    name,
    organizationName,
    type,
    requirements,
    closesAt,
    countries,
    tags,
    alsoKnownAs,
  } = bountyData;

  const bountyRef = new Moralis.Object(BOUNTY_TABLE);
  //TODO:Set the bounties to 'Waiting for funds'
  bountyRef.set('state', 'Open');
  bountyRef.set('title', title);

  bountyRef.set('name', name);
  bountyRef.set('organizationName', organizationName);
  bountyRef.set('type', type);

  const uppercaseCountries = countries?.map((c) => c.toUpperCase().trim());
  bountyRef.set('countries', uppercaseCountries || []);

  bountyRef.set('requirements', requirements);
  bountyRef.set('staffCreatorId', undefined);
  bountyRef.set('submissions', 0);
  bountyRef.set('funds', 0);
  bountyRef.set('wallet', '');
  bountyRef.set('tags', tags);
  bountyRef.set('closesAt', closesAt);
  bountyRef.set('alsoKnownAs', alsoKnownAs);

  const Bounty = Moralis.Object.extend(BOUNTY_TABLE);
  const bounty = new Bounty(bountyRef.attributes);

  const context = { isNew: true };
  await bounty.save(null, { context, useMasterKey: true });
}
