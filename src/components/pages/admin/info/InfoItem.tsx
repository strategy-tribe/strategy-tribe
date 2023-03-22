import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { GoToBountyPage, GoToFpPage } from '@/lib/utils/Routes';

import Icon from '@/components/utils/Icon';

import { UserInfo } from '@/server/routes/users/getInfo';

import { BountyCardFooter } from '../../explore/bounty card/BountyCardFooter';
import { BountyCardReward } from '../../explore/bounty card/BountyCardReward';

export function InfoItem({ bounty }: { bounty: UserInfo }) {
  countries.registerLocale(en);
  const [expanded, setExpanded] = useState(true);
  const router = useRouter();

  return (
    <div className="relative z-10 flex flex-col gap-2 border-b-[1px] border-main py-2">
      <div className="flex w-full">
        <button
          className="label items-center justify-between gap-2 p-2 text-on-surface-unactive hover:text-main"
          onClick={() => setExpanded(!expanded)}
        >
          <Icon icon={expanded ? 'expand_more' : 'chevron_right'} />
        </button>
        <div className="w-full text-left">
          <div className="flex gap-5">
            <span className="label-sm text-left capitalize text-main-light">
              {bounty.target.org?.name}
            </span>
            {bounty.target.org?.countries.map((country) => (
              <span
                key={country.name}
                className="label-sm text-left capitalize text-on-surface-unactive"
              >
                {country.name}
              </span>
            ))}
          </div>
          <div className="group">
            <button
              onClick={() => router.push(GoToBountyPage(bounty.slug))}
              className="title-xs text-left group-hover:underline"
            >
              {bounty.title}
            </button>

            <div className="pointer-events-none invisible absolute top-0 left-0 translate-x-12 -translate-y-8 rounded bg-surface-dark px-4 py-2 group-hover:pointer-events-auto group-hover:visible">
              Go to Bounty
            </div>
          </div>
          <div className="flex items-center justify-between text-xl">
            <BountyCardReward reward={bounty.wallet?.balance ?? 0} />

            <BountyCardFooter
              amountOfSubs={bounty._count.submissions}
              closesAt={bounty.closesAt}
              status={bounty.status}
            />
          </div>
        </div>
      </div>

      {expanded && (
        <div className="flex flex-wrap">
          {bounty.fingerprints.map((fp) => {
            if (fp.ipDetails.length) return <Fingerprint fingerprint={fp} />;
          })}
        </div>
      )}
    </div>
  );
}

function Fingerprint({
  fingerprint,
}: {
  fingerprint: {
    fingerprint: string;
    ipDetails: {
      ip: string;
      city: string;
      countyrCode: string;
    }[];
  };
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div
      key={fingerprint.fingerprint}
      className="label ml-4 border-t-2 border-surface py-2 capitalize text-on-surface-unactive"
    >
      <div className="flex items-center">
        <button
          className="label text-left text-on-surface-unactive hover:text-main"
          onClick={() => setExpanded(!expanded)}
        >
          <Icon icon={expanded ? 'expand_more' : 'chevron_right'} />
        </button>
        <Link
          href={GoToFpPage(fingerprint.fingerprint)}
          className="pl-1 text-sm font-bold hover:underline"
        >
          Fingerprint: {fingerprint.fingerprint}
        </Link>
      </div>
      {expanded && (
        <div className="ml-6">
          {fingerprint.ipDetails.map((ip) => (
            <div key={ip.ip} className="flex justify-between py-1">
              <span>{`-  IP: ${ip.ip}`}</span>
              <span>{`City: ${ip.city}`}</span>
              <span>{`Country: ${countries.getName(
                ip.countyrCode,
                'en'
              )}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
