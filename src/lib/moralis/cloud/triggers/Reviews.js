//*Reviews
Moralis.Cloud.beforeSave(REVIEWS_TABLE, async function (request) {
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
      context: { userId },
      user: curr_user,
    } = request;

    //is the reviewer legit?
    const reviewer = review.get('reviewerId');

    if (!curr_user.id || curr_user.id !== reviewer) {
      ERROR(`Unauthorized: user has no auth`, true);
    }

    const auth = await GetUserRole(reviewer, request);

    if (!auth.isAdmin && !auth.isStaff) {
      ERROR('Unauthorized: user has no auth', true);
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
  }
});

Moralis.Cloud.afterSave(REVIEWS_TABLE, async function (request) {
  LOG('REVIEWS_TABLE after save ran');

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
      ERROR(`Unauthorized: review grade not valid`, true);
    }
    if (reviewGrade === SUBMISSION_ACCEPTED_STATE) {
      submissionState = SUBMISSION_WAITING_FOR_PAYMENT_STATE;
    }

    submissionRef.set('state', submissionState);
    submissionRef.set('review', reviewRef);

    const key = await GetKey();

    const context = {
      key,
    };

    await submissionRef.save(null, { useMasterKey: true, context });

    //notif
    const bountyId = submissionRef.get('bountyId');
    const userId = submissionRef.get('owner');
    const users = [userId];
    const message = 'Your submission has been reviewed';
    const BASE_URL = await GetBaseUrl();
    const url = `${BASE_URL}/bounty/${bountyId}/${submissionId}`;
    await CreateNotification(users, message, url);
  } catch (error) {
    ERROR(`Error after save:\nReason:${JSON.stringify(error, null, 2)}`, true);
  }
});
