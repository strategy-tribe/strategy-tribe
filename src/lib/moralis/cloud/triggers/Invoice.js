//*Bounties
Moralis.Cloud.beforeSave(INVOICE_TABLE, async function (request) {
  const {
    object: invoice,
    context: { isNew, userId },
  } = request;

  if (isNew) {
    if (!userId) {
      ERROR(
        `Error setting ACL for Invoice. Did not get the user id for the submission`,
        true
      );
    }
    try {
      const invoiceACL = new Moralis.ACL();

      invoiceACL.setPublicWriteAccess(false);
      invoiceACL.setPublicReadAccess(false);

      invoiceACL.setRoleWriteAccess(STAFF_ROLE, false);
      invoiceACL.setRoleReadAccess(STAFF_ROLE, false);

      invoiceACL.setRoleWriteAccess(ADMIN_ROLE, true);
      invoiceACL.setRoleReadAccess(ADMIN_ROLE, true);
      invoiceACL.setWriteAccess(userId, false);
      invoiceACL.setReadAccess(userId, true);

      invoice.setACL(invoiceACL);
    } catch (error) {
      ERROR(`Error setting ACL for Invoice. Reason: ${error}`, true);
    }
  }
});

Moralis.Cloud.afterSave(INVOICE_TABLE, async function (request) {
  const { object: invoice } = request;

  const invoiceStatus = invoice.get('status');

  if (invoiceStatus !== INVOICE_UNPAID_STATE) {
    try {
      const submissionId = invoice.get('submission').id;
      const submission = await GetSubmissionByID(submissionId);
      const userId = submission.get('owner');

      const message =
        invoiceStatus === INVOICE_PAID_STATE
          ? 'An invoice to your account is being processed'
          : 'There has been an error related to an invoice';

      const url = `/submission/${submissionId}`;

      await CreateNotification([userId], message, url);
    } catch (error) {
      ERROR(`Error notifying user of their invoice. Reason: ${error}`, true);
    }
  }
});
