//*Submissions
Moralis.Cloud.beforeSave(SUBMISSIONS_TABLE, async function (request) {
  try {
    const { isNew, key } = request.context;
    const submissionRef = request.object;
    const usedMasterKey = request.master;
    const userId = submissionRef.get('owner');
    const status = submissionRef.get('state');
    const bountyId = submissionRef.get('bountyId');

    LOG(`Submission log:\n${JSON.stringify(request, null, 2)}`);

    if (isNew) {
      if (
        status !== SUBMISSION_WAITING_FOR_REVIEW_STATE ||
        !userId ||
        !bountyId
      ) {
        ERROR('Unauthorized', true);
      }

      IsAuthorized(request, userId);

      const { userSubmittedTooSoon, bountyIsClosed } =
        await UserCanSubmitChecks(userId, bountyId);

      if (userSubmittedTooSoon) {
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
        const acl = new Moralis.ACL();

        acl.setPublicWriteAccess(false);
        acl.setPublicReadAccess(false);

        acl.setRoleWriteAccess(STAFF_ROLE, false);
        acl.setRoleReadAccess(STAFF_ROLE, true);

        acl.setRoleWriteAccess(ADMIN_ROLE, false);
        acl.setRoleReadAccess(ADMIN_ROLE, true);

        acl.setReadAccess(userId, true);

        submissionRef.setACL(acl);
      }
    }

    if (!isNew) {
      const _key = await GetKey();
      if (!usedMasterKey && (!key || key !== _key)) {
        ERROR(`Unauthorized.`, true);
      }
    }
  } catch (error) {
    ERROR(`beforeSave SUBMISSIONS_TABLE\n${error}`, true);
  }
});

Moralis.Cloud.afterSave(SUBMISSIONS_TABLE, async function (request) {
  try {
    const submission = request.object;
    const submissionState = submission.get('state');
    const bountyId = submission.get('bountyId');
    const bounty = await GetBountyByID(bountyId);

    if (!bounty) {
      ERROR('Validation error: Bounty not found for submission', true);
    }

    if (submissionState === SUBMISSION_WAITING_FOR_PAYMENT_STATE) {
      //needs to pay
      const { key } = request.context;
      const internalKey = await GetKey();

      if (!key || key !== internalKey) {
        ERROR('Unauthorized', true);
      }

      await CreateInvoice(submission);

      bounty.set('state', BOUNTY_PAYMENT_NEEDED_STATE);

      await bounty.save(null, {
        useMasterKey: true,
        context: { acceptedSubmissionID: submission.id },
      });
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
  } catch (error) {
    ERROR(`\nafterSave SUBMISSIONS_TABLE.\nReason: ${error}`);
  }
});

Moralis.Cloud.beforeDelete(SUBMISSIONS_TABLE, async function (request) {
  ERROR(`Cannot delete a submission.`);
  const auth = await GetUserRole(request.user.id, request);

  if (!auth.isAdmin || !auth.isStaff) {
    ERROR('Unauthorized', true);
  }
});

Moralis.Cloud.afterDelete(SUBMISSIONS_TABLE, async function (request) {
  ERROR(`Cannot delete a submission.`);

  const bountyId = request.object.get('bountyId');
  const bounty = await GetBountyByID(bountyId);

  if (!bounty) {
    ERROR('Validation error: Bounty not found for submission', true);
  }

  const count = await CountBountySubmissions(bountyId);
  bounty.set('submissions', count);
  await bounty.save(null, { useMasterKey: true });
});
