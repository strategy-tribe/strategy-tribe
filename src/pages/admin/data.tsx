import AppLayout from '@/components/layouts/AppLayout';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';
import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { useGetAllOrganizations } from '@/lib/hooks/organizationHooks';
import { useGetWallets } from '@/lib/hooks/useGetWallets';
import { Bounty } from '@/lib/models';
import { Organization } from '@/lib/models/organizations/organization';
import {
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queries/BountyQueryParams';
import { Order } from '@/lib/models/queries/Order';
import {
  Wallet,
  WalletQueryParams,
} from '@/lib/moralis/serverMethods/getWallets';
import { GoToBountyPage } from '@/lib/utils/Routes';
import Head from 'next/head';
import { useState } from 'react';
import { NextPageWithLayout } from '../_app';
('@/components/utils/Title');

const DataPage: NextPageWithLayout = () => {
  const [search, setSearch] = useState('');
  const [orgs, setOrgs] = useState<string[]>([]);

  const walletQuery: WalletQueryParams = {
    amount: 3000,
    page: 0,
    paginate: false,
  };

  const bountyQuery: BountyQueryParams = {
    amount: 3000,
    order: Order.Desc,
    orderBy: BountyOrderBy.CreatedAt,
    relatedTo: orgs,
  };

  function addToOrgs(org: string) {
    setOrgs([...orgs, org.toLocaleLowerCase().trim()]);
  }

  const {
    wallets,
    isLoading: isLoadingWallets,
    error,
  } = useGetWallets(walletQuery);

  const { bounties, isLoading: isLoadingBounties } =
    useGetBounties(bountyQuery);

  const { organizations, isLoading: isLoadingOrgs } = useGetAllOrganizations();

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

        <div className="flex flex-col gap-8 items-center">
          <input
            type="text"
            className="w-full body-sm bg-bg border-b-2 border-0 focus:border-main focus:ring-0"
            placeholder="Search for an org"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-10">
            <Button
              info={{
                style: ButtonStyle.Filled,
                label: 'Apply',
                className: 'w-fit',
                onClick: () => {
                  addToOrgs(search);
                  setSearch('');
                },
              }}
            />

            <Button
              info={{
                style: ButtonStyle.Hollow,
                label: 'Reset',
                className: 'w-fit',
                onClick: () => {
                  setSearch('');
                  setOrgs([]);
                },
              }}
            />
          </div>
        </div>

        <div className="p-8 bg-surface-dark space-y-4">
          <p className="title-xs text-center">Filters</p>
          <div className="grid grid-cols-2 place-items-center">
            <div>
              <span>Wallets</span>
              {Object.entries(walletQuery).map((entry, i) => {
                return (
                  <div key={i}>
                    {entry[0]} : {entry[1]}
                  </div>
                );
              })}
            </div>
            <div>
              <span>Bounties</span>
              {Object.entries(bountyQuery).map((entry, i) => {
                return (
                  <div key={i} className="border w-full whitespace-pre-wrap">
                    {entry[0]} : {entry[1]}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Exporter
          wallets={wallets}
          bounties={bounties}
          organizations={organizations}
        />

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

function Exporter({
  bounties,
  organizations,
  wallets,
}: {
  bounties: Bounty[];
  wallets: Wallet[];
  organizations: Organization[];
}) {
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
          const wallet = wallets.find((w) => w.assigned === b.id);

          if (wallet?.address !== b.wallet)
            throw new Error('Address dont match');
          return {
            title: b.title,
            'wallet address': wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic,
            chain: 'Polygon Mainnet',
            token: 'MATIC',
            amount: '$200 (USD)',
            'org name': b.organizationName,
            url: 'strategytribe.io' + GoToBountyPage(b.id!),
            // id: b.id,
            // created: b.createdAt?.toLocaleDateString(),
            // 'related to (org name)': b.organizationName,
            // state: b.state,
            // submissions: b.submissions,
            // type: b.type,
            // countries: b.countries?.toString(),
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

  return (
    <div className="grid grid-cols-3 place-items-center gap-x-8">
      <div className="flex flex-col items-center gap-4 p-8 bg-surface-dark rounded-xl w-full">
        <p className="label-lg text-center">
          Wallets
          <br />
          <span className="text-main pt-1 block">{wallets?.length}</span>
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

      <div className="flex flex-col items-center gap-4 p-8 bg-surface-dark rounded-xl w-full">
        <p className="label-lg text-center">
          Bounties
          <br />
          <span className="text-main pt-1 block">{bounties?.length}</span>
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

      <div className="flex flex-col items-center gap-4 p-8 bg-surface-dark rounded-xl w-full">
        <p className="label-lg text-center">
          Organisations
          <br />
          <span className="text-main pt-1 block">{organizations?.length}</span>
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
  );
}

DataPage.getLayout = function getLayout(page) {
  return (
    <ProtectedLayout>
      <AppLayout>{page}</AppLayout>
    </ProtectedLayout>
  );
};
export default DataPage;
