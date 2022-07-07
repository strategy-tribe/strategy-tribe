export const GoToLandingPage = () => '/';

export const GoTo404Page = () => '/404';

export const GoTobBountiesPage = () => '/bounties';

export const GoToGeneralDonationsPage = () => '/support';

export const GoToOrganizationsPage = () => '/app/organizations';

export const GoToSearchPage = () => '/app/search';

export const GoToRulesPage = () => '/app/rules';

export const GoToAboutusPage = () => '/about';

export const GoToFAQPage = () => '/faq';

export const GoToWaitingPage = () => '/app/waiting';

export const GoToWaitingForReview = () => '/app/review';

export const GoToNewBountyPage = () => '/app/bounty/new';

export const GoToUserPage = () => '/app/user';
export const GoToSubsPage = () => '/app/user/subscriptions';

export const GoToOrgPage = (orgId: string) => `/app/${orgId}`;

export const GoToBountyPage = (bountyId: string) => `/app/bounty/${bountyId}`;

export const GoToSubmissionPage = (bountyId: string, submissionId: string) =>
  `/app/bounty/${bountyId}/${submissionId}`;

export const GoToBeforeNewSubmissionPage = (bountyId: string) =>
  `/app/bounty/${bountyId}/before_new`;

export const GoToNewSubmissionPage = (bountyId: string) =>
  `/app/bounty/${bountyId}/new`;

export const GoToReviewSubmissionPage = (
  bountyId: string,
  submissionId: string
) => `/app/bounty/${bountyId}/${submissionId}/review`;
