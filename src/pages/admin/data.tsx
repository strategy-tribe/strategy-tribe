import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';
import AppLayout from '@/components/layouts/AppLayout';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { useGetWallets } from '@/lib/hooks/useGetWallets';
import { WalletQueryParams } from '@/lib/moralis/serverMethods/getWallets';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { useGetBounties, useGetBounty } from '@/lib/hooks/bountyHooks';
import { Order } from '@/lib/models/queries/Order';
import { BountyOrderBy } from '@/lib/models/queries/BountyQueryParams';
import { useGetAllOrganizations } from '@/lib/hooks/organizationHooks';
import { Organization } from '@/lib/models/organizations/organization';

const DataPage: NextPageWithLayout = () => {
  const query: WalletQueryParams = {
    amount: 3000,
    page: 0,
    paginate: false,
  };

  const { wallets, isLoading: isLoadingWallets, error } = useGetWallets(query);

  const { bounties, isLoading: isLoadingBounties } = useGetBounties({
    order: Order.Desc,
    orderBy: BountyOrderBy.CreatedAt,
    amount: 3000,
  });

  const { organizations, isLoading: isLoadingOrgs } = useGetAllOrganizations();

  const exportWallets = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(
        wallets?.map((w) => {
          return {
            address: w.address,
            mnemnic: w.mnemonic,
            key: w.privateKey,
            type: w.type,
            'creation date': w.createdAt,
            'assigned to': w.assigned,
          };
        })
      )
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    const date = new Date().toLocaleDateString();
    link.download = `wallets - [${date}].json`;

    link.click();
  };

  const exportBounties = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(
        bounties?.map((b) => {
          return {
            title: b.title,
            'wallet address': b.wallet,
            id: b.id,
            created: b.createdAt?.toLocaleDateString(),
            'related to (org name)': b.organizationName,
            state: b.state,
            submissions: b.submissions,
            type: b.type,
            countries: b.countries?.toString(),
          };
        })
      )
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    const date = new Date().toLocaleDateString();
    link.download = `bounties - [${date}].json`;

    link.click();
  };

  const exportOrgs = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(
        organizations?.map((o) => {
          const fileStructure = {
            name: o.name,
            id: o.id,
            'wallet address': o.wallet,
            countries: o.countries?.toString(),
            bounties: o.bounties,
          };

          return fileStructure;
        })
      )
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    const date = new Date().toLocaleDateString();
    link.download = `organisations - [${date}].json`;

    link.click();
  };

  if (isLoadingWallets || isLoadingBounties || isLoadingOrgs) {
    return <Loading small />;
  }

  return (
    <>
      <Head>
        <title>ST | Wallets</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-5xl min-h-screen space-y-8">
        <p className="title text-center">Data</p>
        <div className="grid grid-cols-3 place-items-center gap-x-8">
          <div className="flex flex-col items-center gap-4 p-8 bg-darker rounded-xl w-full">
            <p className="label-lg text-center">
              Wallets
              <br />
              <span className="text-purpleDark pt-1 block">
                {wallets?.length}
              </span>
            </p>

            <Button
              info={{
                icon: 'download',
                label: 'Download',
                style: ButtonStyle.Hollow,
                onClick: exportWallets,
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-4 p-8 bg-darker rounded-xl w-full">
            <p className="label-lg text-center">
              Bounties
              <br />
              <span className="text-purpleDark pt-1 block">
                {bounties?.length}
              </span>
            </p>

            <Button
              info={{
                icon: 'download',
                label: 'Download',
                style: ButtonStyle.Hollow,
                onClick: exportBounties,
              }}
            />
          </div>

          <div className="flex flex-col items-center gap-4 p-8 bg-darker rounded-xl w-full">
            <p className="label-lg text-center">
              Organisations
              <br />
              <span className="text-purpleDark pt-1 block">
                {organizations?.length}
              </span>
            </p>

            <Button
              info={{
                icon: 'download',
                label: 'Download',
                style: ButtonStyle.Hollow,
                onClick: exportOrgs,
              }}
            />
          </div>
        </div>

        {!!error && !isLoadingWallets && (
          <ImportantMessage
            message="There was an error."
            content={error as string}
            icon="warning"
          />
        )}
      </div>
    </>
  );
};

DataPage.getLayout = function getLayout(page) {
  return (
    <ProtectedLayout>
      <AppLayout>{page}</AppLayout>
    </ProtectedLayout>
  );
};
export default DataPage;
