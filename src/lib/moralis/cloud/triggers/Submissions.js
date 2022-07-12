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
  //*check if the bounty state should change
  const submissionState = request.object.get('state');
  const bountyId = request.object.get('bountyId');
  const bounty = await GetBountyByID(bountyId);

  if (!bounty) {
    ERROR('Validation error: Bounty not found for submission', true);
  }

  if (submissionState === "was accepted and it's waiting for payment") {
    //needs to pay
    bounty.set('state', 'Payment needed');
    await bounty.save(null, { useMasterKey: true });
  } else if (submissionState === 'was fully accepted') {
    //close
    bounty.set('state', 'closed');
    await bounty.save(null, { useMasterKey: true });
  } else if (submissionState === 'is waiting for review') {
    //keep the same state, just reco
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
