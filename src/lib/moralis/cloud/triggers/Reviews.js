//*Reviews
Moralis.Cloud.beforeSave(REVIEWS_TABLE, async function (request) {
  LOG(`REVIEWS_TABLE beforeSave running, ${request.object.id}`);

  async function GetOwnerOfSubmission(submissionId) {
    const q = new Moralis.Query(SUBMISSIONS_TABLE);

    q.equalTo('objectId', submissionId);

    const submissionRef = await q.first({ useMasterKey: true });

    if (!submissionRef) {
      ERROR(`No submission found for ${submissionId}`, true);
    }

    return submissionRef.get('owner');
  }

  try {
    const {
      object: review,
      context: { userId, key },
      user: curr_user,
    } = request;

    //is the reviewer legit?
    const reviewer = review.get('reviewerId');
    const _key = await GetKey();

    const nokey = !key || key !== _key;
    const wrongUser = !curr_user?.id || curr_user?.id !== reviewer;

    if (nokey && wrongUser) {
      ERROR(
        `Unauthorized: user has no auth. ${JSON.stringify({
          nokey,
          wrongUser,
        })}`,
        true
      );
    }

    const auth = await GetUserRole(reviewer, request);

    if (nokey && !auth.isAdmin && !auth.isStaff) {
      ERROR(`Unauthorized: user has no auth`, true);
    }

    //is the userId owner of the submission?
    const submissionOwner = await GetOwnerOfSubmission(
      review.get('submissionId')
    );

    if (!submissionOwner || submissionOwner !== userId) {
      ERROR('Unauthorized: submission is not valid', true);
    }

    const reviewACL = new Moralis.ACL();

    //public
    reviewACL.setPublicWriteAccess(false);
    reviewACL.setPublicReadAccess(false);

    //staff
    reviewACL.setRoleWriteAccess(STAFF_ROLE, false);
    reviewACL.setRoleReadAccess(STAFF_ROLE, true);

    //user
    reviewACL.setReadAccess(userId, true);

    //admin
    reviewACL.setRoleWriteAccess(ADMIN_ROLE, true);
    reviewACL.setRoleReadAccess(ADMIN_ROLE, true);

    review.setACL(reviewACL);
  } catch (error) {
    ERROR(`Applying ACL to Review. Reason: \n${error}`, true);
  } finally {
    LOG('REVIEWS_TABLE beforeSave finished ran');
  }
});

Moralis.Cloud.afterSave(REVIEWS_TABLE, async function (request) {
  LOG(`REVIEWS_TABLE afterSave running, ${request.object.id}`);

  try {
    //*Connect the review and the submission
    //get the submission
    const reviewRef = request.object;
    const submissionId = reviewRef.get('submissionId');
    const submissionRef = await GetSubmissionByID(submissionId);

    if (!submissionRef) {
      ERROR('Error finding submission', true);
    }

    //check the grade of the review
    let submissionState = SUBMISSION_REJECTED_STATE;

    const reviewGrade = reviewRef.get('grade');

    if (
      reviewGrade !== SUBMISSION_ACCEPTED_STATE &&
      reviewGrade !== SUBMISSION_REJECTED_STATE
    ) {
      ERROR(`Review not valid`, true);
    }
    if (reviewGrade === SUBMISSION_ACCEPTED_STATE) {
      submissionState = SUBMISSION_WAITING_FOR_PAYMENT_STATE;
    }

    submissionRef.set('state', submissionState);
    submissionRef.set('review', reviewRef);

    try {
      //saving the submission
      const key = await GetKey();
      await submissionRef.save(null, { useMasterKey: true, context: { key } });

      //notif
      const userId = submissionRef.get('owner');
      const users = [userId];
      const message = 'Your submission has been reviewed';
      const BASE_URL = await GetBaseUrl();

      const url = `${BASE_URL}/submission/${submissionId}`;
      await CreateNotification(users, message, url);
    } catch (error) {
      throw error;
    } finally {
      LOG('REVIEWS_TABLE afterSave finished ran');
    }
  } catch (error) {
    ERROR(
      `REVIEWS_TABLE afterSave:\nReason:${JSON.stringify(error, null, 2)}`,
      true
    );
  }
});
