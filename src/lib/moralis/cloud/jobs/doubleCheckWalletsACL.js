Moralis.Cloud.job('Check wallets security', async (request) => {
  try {
    const q = new Moralis.Query(WALLET_TABLE);
    const wallets = await q.find({ useMasterKey: true });

    const promises = [];

    for (const wallet of wallets) {
      const acl = new Moralis.ACL();
      acl.setPublicReadAccess(false);
      acl.setPublicWriteAccess(false);

      acl.setRoleWriteAccess(STAFF_ROLE, false);
      acl.setRoleReadAccess(STAFF_ROLE, false);

      acl.setRoleWriteAccess(ADMIN_ROLE, false);
      acl.setRoleReadAccess(ADMIN_ROLE, true);

      wallet.setACL(acl);

      promises.push(wallet.save(null, { useMasterKey: true }));
    }

    await Promise.all(promises);
    LOG('success');
  } catch (error) {
    ERROR(`Update wallets error : ${error}`);
  }
});
