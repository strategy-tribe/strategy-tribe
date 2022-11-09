import { getSubmissions } from '@/server/routes/submission/getSubmissions';

import { router } from '../procedures';
import { canUserSubmit } from '../routes/submission/canUserSubmit';
import { getSubmission } from '../routes/submission/getSubmission';
import { getSubmitterInfo } from '../routes/submission/getSubmitterInfo';
import { postSubmission } from '../routes/submission/postSubmission';

export const submissionRouter = router({
  post: postSubmission,
  getSubmissions: getSubmissions,
  getSubmission: getSubmission,
  getSubmitterInfo: getSubmitterInfo,
  canUserSubmit: canUserSubmit,
});
