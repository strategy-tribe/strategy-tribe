import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetOrganization } from '@/lib/hooks/organizationHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { Organization } from '@/components/pages/organization/Organization';
import Loading from '@/components/utils/Loading';
import { MessageForUser } from '@/components/utils/MessageForUser';

import { NextPageWithLayout } from '@/pages/_app';

const OrganizationPage: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const name = decodeURI(router.query.name as string);

  //*Queries
  const {
    organization: org,
    isLoading,
    error,
  } = useGetOrganization({ name }, Boolean(name as string));

  if (isLoading) return <Loading />;

  if (!org || error) return <MessageForUser text={`${error}`} />;

  return (
    <>
      <Head>
        <title>ST | Organization</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Organization org={org} />
    </>
  );
};

export default OrganizationPage;
OrganizationPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
