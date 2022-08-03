async function CreateInvoice(submission) {
  const id = submission.id;
  const state = submission.get('state');

  try {
    if (state !== SUBMISSION_WAITING_FOR_PAYMENT_STATE) {
      ERROR(
        `Can't create an invoice for a submission that is not waiting for payment. Submission ID: ${id}`,
        true
      );
    }

    const invoiceRef = new Moralis.Object(INVOICE_TABLE);

    const bountyId = submission.get('bountyId');
    const bounty = await GetBountyByID(bountyId);

    invoiceRef.set('submission', submission);
    invoiceRef.set('bounty', bounty);
    invoiceRef.set('status', INVOICE_UNPAID_STATE);

    const key = await GetKey();
    const context = {
      isNew: true,
      userId: submission.get('owner'),
      key,
    };
    await invoiceRef.save(null, { useMasterKey: true, context: context });
  } catch (error) {
    ERROR(
      `Error creating an invoice for submission: ${id}. Reason: ${error}`,
      true
    );
  }
}
