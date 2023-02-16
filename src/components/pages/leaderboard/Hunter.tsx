import { LeaderboardUser } from '@/server/routes/users/getLeaderboardUsers';

export function Hunter({
  user,
  rank,
}: {
  user: LeaderboardUser;
  rank: number;
}) {
  return (
    <div
      className={`grid grid-cols-12 place-items-baseline rounded-lg ${
        rank % 2 !== 0 ? ' bg-surface' : ''
      }`}
    >
      <div className="col-span-1 w-full place-self-center py-5">{rank}</div>
      <div className="col-span-3 w-full place-self-center border-l-2 border-on-surface-disabled py-5 tablet:border-0">
        {user.username}
      </div>
      <div className="col-span-2 w-full place-self-center border-l-2 border-on-surface-disabled py-5 tablet:border-0">
        {user.totalBounty}
      </div>
      <div className="col-span-2 w-full place-self-center border-l-2 border-on-surface-disabled py-5 tablet:border-0">
        {user.highestBounty}
      </div>
      <div className="col-span-2 w-full place-self-center border-l-2 border-on-surface-disabled py-5 tablet:border-0">
        {user.acceptedCount}
      </div>
      <div className="col-span-2 w-full place-self-center border-l-2 border-on-surface-disabled py-5 tablet:border-0">
        {user.totalSubmissions}
      </div>
    </div>
  );
}
