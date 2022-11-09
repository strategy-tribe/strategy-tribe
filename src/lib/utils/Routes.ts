import { AccountView } from '@/lib/models/AccountView';

export const GoToLandingPage = () => '/';

export const GoTo404Page = () => '/404';

export const GoToBountiesPage = () => '/bounties';

export const GoToGeneralDonationsPage = () => '/support';

export const GoToOrganizationsPage = () => '/organizations';

export const GoToSearchPage = () => '/search';

export const GoToRulesPage = () => '/rules';

export const GoToAboutusPage = () => '/about';

export const GoToFAQPage = () => '/faq';

export const GoToWaitingForReview = () => '/review';

export const GoToNewBountyPage = () => '/bounty/new';

export const GoToAccountPage = (view?: AccountView) => {
  if (!view) return '/account';
  else return `/account?view=${view}`;
};

export const GoToOrgPage = (orgId: string) => `/organization/${orgId}`;

export const GoToOrgBountiesPage = (orgName: string) =>
  `/organization/${orgName}/bounties`;

export const GoToBountyPage = (slug: string) => `/bounty/${slug}`;

export const GoToSubmissionPage = (submissionId: string) =>
  `/submission/${submissionId}`;

export const GoToBeforeNewSubmissionPage = (slug: string) =>
  `/bounty/${slug}/rules`;

export const GoToNewSubmissionPage = (slug: string) => `/bounty/${slug}/submit`;

export const GoToReviewSubmissionPage = (submissionId: string) =>
  `/submission/${submissionId}/review`;

export const GoToWaitingForFunds = () => {
  return `/admin/fund`;
};

export const GoToReviewsPage = () => {
  return `/admin/review`;
};

export const GoToInvoicesPage = () => {
  return `/admin/invoices`;
};
