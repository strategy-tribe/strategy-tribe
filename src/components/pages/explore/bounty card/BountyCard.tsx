import Link from 'next/link';

import { GoToBountyPage } from '@/lib/utils/Routes';

import { SmallBounty } from '@/server/routes/bounties/getBounties';

import { BountyCardFooter } from './BountyCardFooter';
import { BountyCardReward } from './BountyCardReward';
import { BountyCardTags } from './BountyCardTags';
import { BountyCardTitle } from './BountyCardTitle';

export function BountyCard({ bounty }: { bounty: SmallBounty }) {
  const animClasses = 'transition-all duration-[250] ease-out';
  const moveToLeft = 'hover:-translate-x-4';
  const moveBgtoLeft = 'group-hover:-translate-x-3';
  const expandBg = 'group-hover:scale-x-[1.15] group-hover:scale-y-[1.15]';

  return (
    <article className={`group relative h-fit ${moveToLeft} ${animClasses}`}>
      <div
        className={`absolute inset-0 z-0 origin-left rounded group-hover:bg-surface ${expandBg} ${animClasses} ${moveBgtoLeft}`}
      ></div>

      <Link href={GoToBountyPage(bounty.slug)}>
        <span className={`relative z-10 flex flex-col gap-4 ${animClasses}`}>
          <header className="flex justify-between gap-4">
            <div>
              <BountyCardTags
                org={bounty.target.org?.name ?? 'Unknown organization'}
                requirements={bounty.requirements}
              />

              <BountyCardTitle bounty={bounty} />
            </div>

            {/* <BountyCardWatchButton animClasses={animClasses} /> */}
          </header>

          <BountyCardReward reward={bounty.wallet?.balance ?? 0} />

          <div className="flex flex-wrap gap-4">
            {bounty.tags.map((tag) => {
              return (
                <span
                  key={tag.name}
                  className="label capitalize text-on-surface-unactive"
                >
                  {tag.name}
                </span>
              );
            })}
          </div>

          <BountyCardFooter
            amountOfSubs={bounty._count.submissions}
            closesAt={bounty.closesAt}
            status={bounty.status}
          />
        </span>
      </Link>
    </article>
  );
}

export function DummyBountyCard() {
  return (
    <div className="h-24 w-full min-w-[18rem] animate-pulse rounded-lg bg-surface-dark" />
  );
}
