import React from 'react';
import { Bounty } from '@/lib/models';
import { BountyCardFooter } from './BountyCardFooter';
import { BountyCardReward } from './BountyCardReward';
import { BountyCardTitle } from './BountyCardTitle';
import { BountyCardTags } from './BountyCardTags';
import { GoToBountyPage } from '@/lib/utils/Routes';
import Link from 'next/link';

export function BountyCard({ bounty }: { bounty: Bounty }) {
  const animClasses = 'transition-all duration-[250] ease-out';
  const moveToLeft = 'hover:-translate-x-4';
  const moveBgtoLeft = 'group-hover:-translate-x-3';
  const expandBg = 'group-hover:scale-x-[1.15] group-hover:scale-y-[1.15]';

  return (
    <article className={`relative group h-fit ${moveToLeft} ${animClasses}`}>
      <div
        className={`absolute inset-0 group-hover:bg-dark z-0 rounded origin-left ${expandBg} ${animClasses} ${moveBgtoLeft}`}
      ></div>

      <Link href={GoToBountyPage(bounty.id!)}>
        <a className={`relative flex flex-col gap-4 z-10 ${animClasses}`}>
          <header className="flex justify-between gap-4">
            <div>
              <BountyCardTags bounty={bounty} />

              <BountyCardTitle bounty={bounty} />
            </div>

            {/* <BountyCardWatchButton animClasses={animClasses} /> */}
          </header>

          <BountyCardReward reward={bounty.funds} />

          <BountyCardFooter bounty={bounty} />
        </a>
      </Link>
    </article>
  );
}

export function DummyBountyCard() {
  return (
    <div className="min-w-[18rem] w-full h-24 bg-darker animate-pulse rounded-lg" />
  );
}
