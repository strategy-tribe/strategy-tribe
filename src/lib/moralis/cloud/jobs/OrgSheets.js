Moralis.Cloud.job('scrapOrganizations', async (request) => {
  try {
    LOG('Starting to scrap');
    const organizations = await grabOrganizationsFromSheet();
    LOG('Data from sheet scrapped');
    const orgNames = await createOrganizations(organizations);
    LOG('All organizations uploaded');
    await createDefaultBounties(orgNames);

    LOG(`Complete.`);
  } catch (error) {
    LOG(`Error!: ${error}`);
    return error;
  }
});
//!Sheet
async function grabOrganizationsFromSheet() {
  const { url } = await GetSheetUrl();
  const res = await Moralis.Cloud.httpRequest({
    url,
  });

  const organizations = [];
  res.data.sheets
    .at(0)
    .data.at(0)
    .rowData.forEach((row, i) => {
      if (i > 0) {
        const rowData = row.values.map((v) => {
          if (v.formattedValue) return v.formattedValue;
        });

        if (rowData[0]) {
          const data = {
            name: titleCase(rowData[0]),
            alsoKnownAs:
              typeof rowData[1] === 'string'
                ? rowData[1].toLowerCase().split(',')
                : [],
            tags:
              typeof rowData[2] === 'string'
                ? rowData[2].toLowerCase().split(',')
                : [],
            region: rowData[3] ? rowData[3].toLowerCase() : undefined,
          };
          organizations.push(data);
        }
      }
    });

  return organizations;
}

//!ORG
async function createOrganizations(organizations) {
  const orgsToCreateBountiesTo = [];
  for await (const org of organizations) {
    const name = await createOrganization(
      org.name,
      org.alsoKnownAs,
      org.region,
      org.tags
    );
    if (name) orgsToCreateBountiesTo.push(name);
  }
  return orgsToCreateBountiesTo;
}

async function createOrganization(name, alsoKnownAs, region, tags) {
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
  orgRef.set('alsoKnownAs', alsoKnownAs);
  orgRef.set('region', region);
  orgRef.set('tags', tags);
  orgRef.set('bounties', 0);

  const acl = new Moralis.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);
  acl.setRoleWriteAccess('staff', true);
  acl.setRoleReadAccess('staff', true);
  orgRef.setACL(acl);

  await orgRef.save(null, { useMasterKey: true });
  LOG(`${name} created.`);
  return name;
}

//!PROPS
async function createDefaultBounties(orgNames) {
  for await (const orgName of orgNames) {
    LOG(`Creating default bounties for ${orgName}`);
    await createBountiesForOrg(orgName);
  }
}

async function createBountiesForOrg(orgName) {
  const params = createBountiesParams(orgName);

  for await (const p of params) {
    await saveBounty(p);
  }
}

function createBountiesParams(organizationName) {
  //TODO:8x times & add the closesAt field
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
      days: 100,
    },
  ];

  bountiesDetails.map((word) => {
    const {
      label,
      title: _title,
      targetTitle,
      reportRequired,
      type,
      extra,
      extraLabel,
      days,
    } = word;

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

    params.push({
      title,
      requirements,
      closesAt,
      //
      name: name,
      type: 'Organization',
      organizationName: organizationName,
      tags: [],
      region: '',
    });
  });

  return params;
}

async function saveBounty(p) {
  const { title, name, organizationName, type, requirements, closesAt } = p;
  //!Bounty
  const bountyRef = new Moralis.Object(BOUNTY_TABLE);
  //TODO:Set the bounties to 'Waiting for funds'
  bountyRef.set('state', 'Open');
  bountyRef.set('title', title);

  bountyRef.set('name', name);
  bountyRef.set('organizationName', organizationName);
  bountyRef.set('type', type);

  bountyRef.set('requirements', requirements);
  bountyRef.set('staffCreatorId', undefined);
  bountyRef.set('submissions', 0);
  bountyRef.set('funds', 0);
  bountyRef.set('wallet', '');
  bountyRef.set('closesAt', closesAt);

  const propClass = Moralis.Object.extend(BOUNTY_TABLE);
  const bounty = new propClass(bountyRef.attributes);

  const context = { isNew: true };
  await bounty.save(null, { context: context, useMasterKey: true });
}
