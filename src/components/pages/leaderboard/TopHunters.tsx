import { LeaderboardUsers } from '@/server/routes/users/getLeaderboardUsers';

import { Hunter } from './Hunter';

export function TopHunters({ users }: { users: LeaderboardUsers }) {
  return (
    <section className="mx-auto min-h-screen min-w-[40rem] max-w-4xl p-4">
      <div className="text-center">
        <div className="m-8">
          <div className="h2 font-bold">Top Hunters</div>
          <span className="inline-block h-1 w-64 -translate-y-1 bg-main"></span>
        </div>
        <div>
          <div className="sticky top-[9.2rem] z-10 grid grid-cols-12 place-items-baseline bg-bg font-bold tablet:top-[5.2rem]">
            <div className="col-span-1 h-full w-full py-2">
              <br />#
            </div>
            <div className="col-span-3 h-full w-full border-main-light py-2">
              User’s <br /> Wallet Address
            </div>
            <div className="col-span-2 h-full w-full border-main-light py-2">
              Total Amount Recieved
            </div>
            <div className="col-span-2 h-full w-full border-main-light py-2">
              Higest Bounty Payment
            </div>
            <div className="col-span-2 h-full w-full border-main-light py-2">
              Accepted Submissions
            </div>
            <div className="col-span-2 h-full w-full border-main-light py-2">
              Total <br /> Submissions
            </div>
          </div>
          {users.map((user, i) => (
            <Hunter key={i} user={user} rank={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
