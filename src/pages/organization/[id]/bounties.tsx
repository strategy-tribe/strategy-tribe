import AppLayout from '@/components/layouts/AppLayout';
import { BountyCard, DummyBountyCard } from '@/components/pages/explore/bounty card/BountyCard';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { IconSize } from '@/components/utils/Icon';
import { useGetOrganization } from '@/hooks/organizationHooks';
import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { Order } from '@/lib/models/Order';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';
import { GoToOrgPage } from '@/lib/utils/Routes';
import { NextPageWithLayout } from '@/pages/_app';
import Head from 'next/head';
import { useRouter } from 'next/router';




const OrganizationBountiesPage: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const { id: orgId } = router.query;

  //*Queries
  const { organization: org, error } = useGetOrganization(
    orgId as string,
    Boolean(orgId as string)
  );

  const { bounties, isLoading: isLoadingBounties } = useGetBounties(
    {
      order: Order.Desc,
      orgId: orgId as string
    },
    !!org
  );

  // if (!org || error) return <MessageForUser text={`${error}`} />;

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

      <div className="flex max-w-[85rem] gap-x-16 ">
        <aside className="w-fit min-w-[20%]  min-h-screen border-main border-r-2 px-8 ">
          <div className="sticky h-fit top-24">
            <Button
              info={{
                className: 'max-w-[100%]',
                labelClasses: 'capitalize whitespace-pre-wrap',
                label: `${org?.name}`,
                icon: 'arrow_back',
                iconSize: IconSize.Small,
                style: ButtonStyle.Text,
                isALink: GoToOrgPage(org?.id ?? ''),
              }}
            />
          </div>
        </aside>

        <div className="grid grid-cols-3 gap-16 py-8 h-fit">
          {!isLoadingBounties &&
            bounties &&
            bounties.map((b) => {
              return <BountyCard key={b.id} bounty={b} />;
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
OrganizationBountiesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
