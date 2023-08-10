import { GetStaticProps } from 'next';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { FAQs } from '@/components/pages/faq/FAQs';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const submissionsPerDay = parseInt(
      process.env.SUBMISSION_PER_DAY as string
    );

    if (!submissionsPerDay) {
      throw new Error('Unable to assess submissions per day');
    }

    return {
      props: {
        submissionsPerDay,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('error:\n', error);
    return {
      props: { submissionsPerDay: 3 },
      revalidate: 30,
    };
  }
};

const discordUrl = process.env.NEXT_PUBLIC_DISCORD;

const FAQPage: NextPageWithLayout<{ submissionsPerDay: number }> = ({
  // eslint-disable-next-line react/prop-types
  submissionsPerDay,
}) => {
  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FAQs
        submissionsPerDay={submissionsPerDay}
        discordUrl={discordUrl ?? ''}
      />
    </>
  );
};

FAQPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default FAQPage;
