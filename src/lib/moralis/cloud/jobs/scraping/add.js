//*Create
async function addToDb(organizations, targets) {
  //! Order matters
  LOG('3) Creating organizations');
  const defaultBounties = await createOrganizations(organizations);
  LOG(`3.1) Done. ${defaultBounties.length} organizations.`);

  // //*Org Bounties
  LOG(
    `4) Creating default bounties for ${defaultBounties.length} organizations`
  );
  await createDefaultBounties(defaultBounties);
  LOG('4.1) Done.');

  // //*Individual Bounties
  LOG('5) Creating bounties for targets.');

  for await (const target of targets) {
    const orgQuery = new Moralis.Query(ORG_TABLE);
    orgQuery.equalTo('name', target.organizationName);
    const orgRef = await orgQuery.first();

    if (!orgRef) {
      ERROR(
        `No organization found for ${target.name}. The target says the org should be: "${target.organizationName}"`
      );
      return;
    }

    const bounties = createBountiesForIndividual(
      target,
      orgRef.get('countries')
    );

    for await (const bounty of bounties) {
      await saveBounty(bounty);
    }

    const index = targets.indexOf(target);
    if (index % 10 === 0) {
      LOG(`(${index}/${targets.length - 1}) targets`);
    }
  }

  LOG('5.1) Done');
}

//!Saving organizations in DB
function createBountiesForIndividual(target, countries) {
  const bounties = [];

  const bountiesData = [
    {
      type: 'Email',
      title: 'Find emails associated with',
      label: 'Email address',
      extra: true,
      extraLabel: 'Extra email addresses',
      reportRequired: false,
      days: 300,
    },
    {
      type: 'Wallet',
      title: 'Find wallets associated with',
      label: 'Wallet address',
      extra: true,
      extraLabel: 'Extra Wallet addresses',
      reportRequired: false,
      days: 300,
    },
    {
      type: 'Domain',
      title: 'Find domains associated with',
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
        title: 'How did you find this information?',
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

async function createOrganizations(organizations) {
  const orgsToCreateBountiesTo = [];

  for await (const org of organizations) {
    const name = await createOrganization(
      org.organizationName,
      org.alsoKnownAs,
      org.countries,
      org.tags,
      org.bio,
      org.why,
      org.links
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

async function createOrganization(
  name,
  alsoKnownAs,
  countries,
  tags,
  bio,
  why,
  links
) {
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
  orgRef.set('bio', bio);
  orgRef.set('why', why);
  orgRef.set('links', links);

  const acl = new Moralis.ACL();
  acl.setPublicWriteAccess(false);
  acl.setPublicReadAccess(true);

  acl.setRoleWriteAccess(STAFF_ROLE, false);
  acl.setRoleReadAccess(STAFF_ROLE, true);

  acl.setRoleWriteAccess(ADMIN_ROLE, true);
  acl.setRoleReadAccess(ADMIN_ROLE, true);

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
        title: 'How did you find this information?',
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
/**
 *
 * @param {{title:string, name:string, organizationName:string, type : string, requirements : [], closesAt: Date, countries : [], tags : string[], alsoKnownAs:string[]}} bountyData
 */
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
  bountyRef.set('state', BOUNTY_OPEN_STATE);
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
