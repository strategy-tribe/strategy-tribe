//*Submissions
Moralis.Cloud.beforeSave(SUBMISSIONS_TABLE, async function (request) {
  const bountyId = request.object.get('bountyId');
  const userId = request.object.get('owner');

  const isNew = request.context.isNew;

  if (isNew) {
    const { userHasUploadedInLessThanADay, bountyIsClosed } =
      await UserCanSubmitChecks(userId, bountyId);

    if (userHasUploadedInLessThanADay) {
      ERROR(
        'Validation Error: Users cannot submit findings to the same bounty more than once per day.',
        true
      );
    } else if (bountyIsClosed) {
      ERROR(
        'Validation Error: Cannot submit findings to a bounty that is not open.',
        true
      );
    } else {
      LOG('Submission passed checks');
    }
  }
});

Moralis.Cloud.afterSave(SUBMISSIONS_TABLE, async function (request) {
  const submission = request.object;
  const submissionState = submission.get('state');
  const bountyId = submission.get('bountyId');
  const bounty = await GetBountyByID(bountyId);

  if (!bounty) {
    ERROR('Validation error: Bounty not found for submission', true);
  }

  if (submissionState === SUBMISSION_WAITING_FOR_PAYMENT_STATE) {
    //needs to pay
    bounty.set('state', BOUNTY_PAYMENT_NEEDED_STATE);
    await bounty.save(null, { useMasterKey: true });
    await CreateInvoice(submission);
  } else if (submissionState === SUBMISSION_ACCEPTED_STATE) {
    //close
    bounty.set('state', BOUNTY_CLOSED_STATE);
    await bounty.save(null, { useMasterKey: true });
  } else if (submissionState === SUBMISSION_WAITING_FOR_REVIEW_STATE) {
    //keep the same state, just recount bounty's submissions
    const count = await CountBountySubmissions(bountyId);
    bounty.set('submissions', count);
    await bounty.save(null, { useMasterKey: true });
  }
});

Moralis.Cloud.afterDelete(SUBMISSIONS_TABLE, async function (request) {
  const bountyId = request.object.get('bountyId');
  const bounty = await GetBountyByID(bountyId);

  if (!bounty) {
    ERROR('Validation error: Bounty not found for submission', true);
  }

  const count = await CountBountySubmissions(bountyId);
  bounty.set('submissions', count);
  await bounty.save(null, { useMasterKey: true });
});
