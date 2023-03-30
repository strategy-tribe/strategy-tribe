import countries from 'i18n-iso-countries';

import { FullFp } from '@/server/routes/fingerprint/getFingerprint';

import { BountyCard } from '../../explore/bounty card/BountyCard';

export function FpInfo({ fp }: { fp: FullFp }) {
  return (
    <div className="space-y-8 px-4">
      <div className="m-8 text-2xl font-bold">
        <div>Fingerprint: {fp.fingerprint}</div>
        <span className="inline-block h-1 w-64 -translate-y-1 bg-main"></span>
      </div>

      <div className="ml-6">
        <div className="m-8">
          <div>IP Details</div>
          <span className="inline-block h-1 w-12 -translate-y-1 bg-main"></span>

          {fp.ipDetails.map((ip) => (
            <div key={ip.ip} className="flex py-1">
              <span>{`-  IP: ${ip.ip}`}</span>
              <span className="mx-4">{`City: ${ip.city}`}</span>
              <span className="mx-4">{`Country: ${countries.getName(
                ip.countyrCode,
                'en'
              )}`}</span>
            </div>
          ))}
        </div>

        {fp.users && fp.users.length > 0 && (
          <div className="m-8">
            <div>User Details</div>
            <span className="inline-block h-1 w-12 -translate-y-1 bg-main"></span>

            {fp.users.map((user) => (
              <div key={user.address} className="flex py-1">
                <span>{`-  Address: ${user.address}`}</span>
                {user.username && (
                  <span className="mx-4">{`Username: ${user.username}`}</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="m-8">
          <div>Bounties visited</div>
          <span className="inline-block h-1 w-12 -translate-y-1 bg-main"></span>

          <section className="m-2 grid grid-cols-2 gap-x-10 gap-y-10 tablet:grid-cols-4 tablet:gap-x-16">
            {fp.bounties?.map((bounty, i) => {
              return <BountyCard bounty={bounty} key={i} />;
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
