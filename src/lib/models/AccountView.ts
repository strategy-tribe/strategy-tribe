export enum AccountView {
  Account = 'account',
  Watching = 'watching',
  Submissions = 'submissions',
  Rewards = 'rewards',
  Notifications = 'notifications',
  Reviews = 'reviews',
}

export const VIEWS_FOR_STAFF = [AccountView.Reviews];

export const VIEWS_FOR_USER = [AccountView.Rewards, AccountView.Submissions];
