async function GetOrgSubsRef(orgName) {
  try {
    const q = new Moralis.Query(ORG_SUBS_TABLE);
    q.equalTo('name', orgName);
    const subs = await q.first({ useMasterKey: true });
    return subs;
  } catch (error) {
    ERROR(`Error fetching the subs for "${orgName}": ${error}`);
  }
}
