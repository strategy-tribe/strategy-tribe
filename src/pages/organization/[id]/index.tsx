import AppLayout from '@/components/layouts/AppLayout';
import { Organization } from '@/components/pages/organization/Organization';
import Loading from '@/components/utils/Loading';
import { MessageForUser } from '@/components/utils/MessageForUser';
import { useGetOrganization } from '@/hooks/organizationHooks';
import { NextPageWithLayout } from '@/pages/_app';
import Head from 'next/head';
import { useRouter } from 'next/router';




const OrganizationPage: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const { id: orgId } = router.query;

  //*Queries
  const {
    organization: org,
    isLoading,
    error,
  } = useGetOrganization(orgId as string, Boolean(orgId as string));

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
