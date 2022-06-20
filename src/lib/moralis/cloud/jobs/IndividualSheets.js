Moralis.Cloud.job('scrapIndividuals', async (request) => {
  try {
    LOG('Starting to scrap');
    //get raw data from sheet
    const targets = await grabTargetsFromSheet();
    //make them into bounties
    LOG(`${targets.length} targets found in spreadsheet`);
    await createBountiesForTargets(targets);
    LOG(`Complete.`);
  } catch (error) {
    LOG(`Error!: ${error}`);
    return error;
  }
});

async function grabTargetsFromSheet() {
  const { url } = await GetSheetUrl();

  const res = await Moralis.Cloud.httpRequest({
    url,
  });

  const targets = [];
  const sheets = res.data.sheets;

  sheets.forEach((sheet, sheetIndex) => {
    //ignore the first one for now
    if (sheetIndex > 0) {
      const sheetData = sheet.data.at(0); //obj
      const rowData = sheetData.rowData; //array
      rowData.forEach((row, rowIndex) => {
        if (rowIndex > 0) {
          const rowData = row.values.map((v) => {
            if (v.formattedValue) return v.formattedValue;
          });

          if (rowData[0]) {
            const target = {
              organizationName: titleCase(rowData[0]),
              name: titleCase(rowData[1]),
              alsoKnownAs:
                typeof rowData[2] === 'string' ? rowData[2].split(',') : [],
              tags: typeof rowData[3] === 'string' ? rowData[3].split(',') : [],
              region: rowData[4],
              type: 'Individual',
            };
            targets.push(target);
          }
        }
      });
    }
  });

  return targets;
}

async function createBountiesForTargets(targets) {
  for await (const target of targets) {
    LOG(`Creating bounties for ${target.name}`);
    const { organizationName, alsoKnownAs, tags, region } = target;

    //check if an org needs to be created
    await tryToCreateOrg(organizationName, alsoKnownAs, region, tags);

    //grab the params for each target
    const bounties = createBountiesForTarget(target);

    for await (const bounty of bounties) {
      await saveBountyToDb(bounty);
    }

    LOG(`Saved all bounties from ${target.name}`);
  }
}

//Helpers
async function tryToCreateOrg(name, alsoKnownAs, region, tags) {
  //*Check if the org exists
  const q = new Moralis.Query(ORG_TABLE);
  q.equalTo('name', name);
  const res = await q.first({ useMasterKey: true });

  if (res) {
    return;
  } else LOG(`Creating the org: ${name}`);

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

  await createDefaultBounties([name]);
}

function createBountiesForTarget(target) {
  const bounties = [];

  const bountiesDetails = [
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

  bountiesDetails.map((bountyConfig) => {
    const {
      label,
      title: _title,
      reportRequired,
      type,
      extra,
      extraLabel,
      days,
    } = bountyConfig;

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
      region: target.region,
    });
  });

  return bounties;
}

async function saveBountyToDb(bountyData) {
  const {
    title,
    requirements,
    closesAt,
    name,
    organizationName,
    type,
    alsoKnownAs,
    tags,
    region,
  } = bountyData;

  //!Bounty
  const bountyRef = new Moralis.Object(BOUNTY_TABLE);
  //TODO:Set the bounties to 'Waiting for funds'
  bountyRef.set('state', 'Open');
  bountyRef.set('title', title);

  bountyRef.set('name', name);
  bountyRef.set('alsoKnownAs', alsoKnownAs);
  bountyRef.set('type', type);
  bountyRef.set('organizationName', organizationName);
  bountyRef.set('tags', tags);
  bountyRef.set('region', region);

  bountyRef.set('requirements', requirements);
  bountyRef.set('staffCreatorId', undefined);
  bountyRef.set('submissions', 0);
  bountyRef.set('funds', 0);
  bountyRef.set('wallet', '');
  bountyRef.set('closesAt', closesAt);

  const bountyClass = Moralis.Object.extend(BOUNTY_TABLE);
  const bountyInstance = new bountyClass(bountyRef.attributes);

  const context = { isNew: true };
  await bountyInstance.save(null, { context: context, useMasterKey: true });
}
