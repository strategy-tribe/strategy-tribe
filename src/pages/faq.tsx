import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { GoToAccountPage, GoToRulesPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { FAQuestion } from '@/components/pages/faq/FAQuestion';
import { AfterRead, ReadingSection } from '@/components/reading/utils';

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

const FAQPage: NextPageWithLayout<{ submissionsPerDay: number }> = ({
  // eslint-disable-next-line react/prop-types
  submissionsPerDay,
}) => {
  return (
    <>
      <Head>
        <title>ST | FAQ</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-4">
        <ReadingSection title="FAQ">
          <div className="space-y-8">
            <FAQuestion
              question="Can anyone submit information?"
              answer={
                <p>
                  Yes, you can see our rules{' '}
                  <Link href={GoToRulesPage()}>
                    <span className="text-main-light underline hover:text-main">
                      here
                    </span>
                  </Link>
                  .
                </p>
              }
            />
            <FAQuestion
              question="How does the payments work?"
              height="h-20"
              answer={
                <p>
                  Once your submission gets verified, all of the funds from the
                  bounty wallets will be send to the wallet you signup with. You
                  can{' '}
                  <Link href={GoToAccountPage()}>
                    <span className="text-main-light underline hover:text-main">
                      review your address here
                    </span>
                  </Link>
                  .
                </p>
              }
            />
            <FAQuestion
              question="How many times I can submit my findings?"
              answer={`${submissionsPerDay} ${
                submissionsPerDay === 1 ? 'time' : 'times'
              } per day`}
            />

            <FAQuestion
              question="What is the maximum payout?"
              answer="There is no maximum."
            />
          </div>
        </ReadingSection>
        <AfterRead />
      </div>
    </>
  );
};

FAQPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default FAQPage;
