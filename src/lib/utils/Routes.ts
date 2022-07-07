export const GoToLandingPage = () => '/';

export const GoTo404Page = () => '/404';

export const GoTobBountiesPage = () => '/bounties';

export const GoToGeneralDonationsPage = () => '/support';

export const GoToOrganizationsPage = () => '/organizations';

export const GoToSearchPage = () => '/search';

export const GoToRulesPage = () => '/rules';

export const GoToAboutusPage = () => '/about';

export const GoToFAQPage = () => '/faq';

export const GoToWaitingPage = () => '/waiting';

export const GoToWaitingForReview = () => '/review';

export const GoToNewBountyPage = () => '/bounty/new';

export const GoToUserPage = () => '/user';
export const GoToSubsPage = () => '/user/subscriptions';

export const GoToOrgPage = (orgId: string) => `/org/${orgId}`;

export const GoToBountyPage = (bountyId: string) => `/bounty/${bountyId}`;

export const GoToSubmissionPage = (bountyId: string, submissionId: string) =>
  `/bounty/${bountyId}/${submissionId}`;

export const GoToBeforeNewSubmissionPage = (bountyId: string) =>
  `/bounty/${bountyId}/before_new`;

export const GoToNewSubmissionPage = (bountyId: string) =>
  `/bounty/${bountyId}/new`;

export const GoToReviewSubmissionPage = (
  bountyId: string,
  submissionId: string
) => `/bounty/${bountyId}/${submissionId}/review`;
