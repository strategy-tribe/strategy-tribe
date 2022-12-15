import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { useGetOrganization } from '@/lib/hooks/organizationHooks';
import { Order } from '@/lib/models/Order';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';
import { GoTo404Page, GoToOrgPage } from '@/lib/utils/Routes';

import {
  BountyCard,
  DummyBountyCard,
} from '@/components/pages/explore/bounty card/BountyCard';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { MessageForUser } from '@/components/utils/MessageForUser';

import { NextPageWithLayout } from '@/pages/_app';

const OrganizationBountiesPage: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const name = decodeURI(router.query.name as string);

  useEffect(() => {
    if (!name) {
      router.push(GoTo404Page());
    }
  }, [name, router]);

  //*Queries
  const {
    organization: org,
    isLoading: isLoadingOrgs,
    error,
  } = useGetOrganization({ name }, { enabled: Boolean(name) });

  const { bounties, isLoading: isLoadingBounties } = useGetBounties(
    {
      order: Order.Desc,
      orgName: [name],
    },
    !!org
  );

  if (isLoadingBounties || isLoadingOrgs) return <Loading />;
  if ((!isLoadingOrgs && !org) || error)
    return <MessageForUser text={`${error}`} />;

  return (
    <>
      <Head>
        <title className="capitalize">ST | {org?.name} Bounties</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-[85rem] gap-x-16 p-4 tablet:flex">
        <aside className="min-w-[20%] border-b-2  border-main px-8 tablet:min-h-screen tablet:w-fit tablet:border-r-2 tablet:border-b-0 ">
          <div className="sticky top-24 h-fit">
            <Button
              info={{
                className: 'max-w-[100%]',
                labelClasses: 'capitalize whitespace-pre-wrap',
                label: `${org?.name}`,
                icon: 'arrow_back',
                iconSize: IconSize.Small,
                style: ButtonStyle.Text,
                isALink: GoToOrgPage(org?.name ?? ''),
              }}
            />
          </div>
        </aside>

        <div className="grid h-fit grid-cols-3 gap-10 py-8 tablet:gap-16">
          {!isLoadingBounties &&
            bounties &&
            bounties.map((b) => {
              return <BountyCard key={b.slug} bounty={b} />;
            })}
          {isLoadingBounties &&
            !bounties &&
            ArrayOfNumbers(21).map((n) => {
              return <DummyBountyCard key={n} />;
            })}
        </div>
      </div>
    </>
  );
};

export default OrganizationBountiesPage;
