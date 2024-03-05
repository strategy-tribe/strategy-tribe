import Image from 'next/image';
import Link from 'next/link';

import { GoToBountiesPage, GoToLandingPage } from '@/lib/utils/Routes';

import { Section } from '@/components/pages/landing/Section';
import { HugeTitle } from '@/components/utils/HugeTitle';
import Icon from '@/components/utils/Icon';

export function NotFound() {
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER;

  return (
    <Section className="space-y-24 pb-48">
      {/* About us */}
      <div className="flex gap-16">
        <figure className="relative h-[10rem] min-w-[10rem]">
          <Image
            src="/illustrations/goal.svg"
            priority
            alt="illustration"
            width={150}
            height={100}
          />
        </figure>
        <div className="space-y-6 ">
          {/* Title */}
          <div>
            <HugeTitle title="404" />
          </div>
          {/* Content */}
          <div>
            <p className="body max-w-lg">{`Let's get you back on track.`}</p>
          </div>
          {/* CTA */}
          <div>
            <div className="-ml-6">
              <Link href={GoToBountiesPage()}>
                <span className="z-10 flex w-fit min-w-[6rem] items-center justify-center gap-2 rounded-full py-3 px-5 font-grotesk font-medium text-on-surface-p0 hover:text-main-light tablet:px-6">
                  <Icon icon="arrow_forward" />
                  <span>Check the bounties</span>
                </span>
              </Link>
              <Link href={GoToLandingPage()}>
                <span className="z-10 flex w-fit min-w-[6rem] items-center justify-center gap-2 rounded-full py-3 px-5 font-grotesk font-medium text-on-surface-p0 hover:text-main-light tablet:px-6">
                  <Icon icon="arrow_forward" />
                  <span>Home</span>
                </span>
              </Link>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="z-10 flex w-fit min-w-[6rem] items-center justify-center gap-2 rounded-full py-3 px-5 font-grotesk font-medium text-on-surface-p0 hover:text-main-light tablet:px-6"
              >
                <Icon icon="arrow_forward" />
                <span>Follow us on Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
