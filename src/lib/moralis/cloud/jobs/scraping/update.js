//*Update
async function updateDb(organizations, targetsAndBounties) {
  //! Order matters
  LOG('6) Updating DB');
  LOG('6.1) Updating orgs');
  await updateOrgs(organizations);
  LOG('6.2) Updated orgs');

  LOG('6.3) Updating targets');
  await updateTargets(targetsAndBounties);
  LOG('6.4) Updated targets');
}

async function updateOrgs(organizations) {
  const updates = [];

  const updateOrg = async (orgData) => {
    try {
      const {
        organizationName,
        alsoKnownAs,
        tags,
        countries,
        bio,
        why,
        links,
      } = orgData;

      const query = new Moralis.Query(ORG_TABLE);
      query.equalTo('name', organizationName);
      const orgRef = await query.first();
      if (!orgRef) {
        throw new Error(`No organization found with name ${organizationName}`);
      }
      orgRef.set('tags', tags);
      orgRef.set('alsoKnownAs', alsoKnownAs);
      orgRef.set('countries', countries);
      orgRef.set('bio', bio);
      orgRef.set('why', why);
      orgRef.set('links', links);

      await orgRef.save(null, { useMasterKey: true });
    } catch (error) {
      LOG(`Error updating org. Reason: ${error}`);
    }
  };

  for (const org of organizations) {
    updates.push(updateOrg(org));
  }

  await Promise.all(updates);
  LOG(`Updated ${organizations.length} orgs`);
}

async function updateTargets(targets_with_bounties) {
  for await (const target_and_its_bounties of targets_with_bounties) {
    const thisTargetUpdates = [];
    const { newData, bountiesToUpdate } = target_and_its_bounties;
    for (const bounty of bountiesToUpdate) {
      thisTargetUpdates.push(updateBounty(newData, bounty));
    }
    await Promise.all(thisTargetUpdates);
  }

  LOG(`Updated ${targets_with_bounties.length} targets`);
}

async function updateBounty(data, bounty) {
  const { organizationName, alsoKnownAs, tags } = data;

  bounty.set('alsoKnownAs', alsoKnownAs);
  bounty.set('tags', tags);

  if (bounty.get('organizationName') !== organizationName) {
    const query = new Moralis.Query(ORG_TABLE);
    query.equalTo('name', organizationName);
    const orgRef = await query.first();
    if (!orgRef) {
      throw new Error(`Org not found: ${organizationName}`);
    }
    const countries = orgRef.get('countries');
    bounty.set('countries', countries);
  }

  await bounty.save(null, { useMasterKey: true });
}
