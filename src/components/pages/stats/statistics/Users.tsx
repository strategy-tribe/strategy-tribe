import { UsersCountData } from '@/server/routes/statistics/getUsersCount';

export default function Users({
  avgSubmissionPayout,
  usersCount,
}: {
  avgSubmissionPayout: number | undefined;
  usersCount: UsersCountData | undefined;
}) {
  if (!usersCount && !avgSubmissionPayout) return <></>;
  return (
    <div className="flex w-full flex-row gap-4 gap-y-8 pt-7">
      <div className="flex h-24 w-1/2 flex-col rounded border bg-purple pt-3 pl-2">
        <span>Users</span>
        <span className="pt-3 text-2xl">{usersCount}</span>
      </div>
      <div className="flex h-24 w-1/2 flex-col rounded border bg-purple pt-3 pl-2">
        <span>Avg submission payout</span>
        <span className="pt-3 text-2xl">
          {avgSubmissionPayout ? avgSubmissionPayout.toFixed(2) : 0} Matic
        </span>
      </div>
    </div>
  );
}
