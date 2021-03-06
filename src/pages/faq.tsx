import Head from 'next/head';
import Link from 'next/link';

import { GoToAccountPage, GoToRulesPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { FAQuestion } from '@/components/pages/faq/FAQuestion';
import { Title } from '@/components/utils/Title';

import { NextPageWithLayout } from './_app';

const FAQPage: NextPageWithLayout = () => {
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

      <div className="max-w-5xl mx-auto space-y-8 pb-32 laptop:pb-0">
        <Title title="FAQ" />
        <FAQuestion
          question="Can anyone submit information?"
          answer={
            <p>
              Yes, you can see our rules{' '}
              <Link href={GoToRulesPage()}>
                <a className="underline text-main-light hover:text-main">
                  here
                </a>
              </Link>
              .
            </p>
          }
        />
        <FAQuestion
          question="How does the payments work?"
          height="h-16"
          answer={
            <p>
              Once your submission gets verified, all of the funds from the
              bounty wallets will be send to the wallet you signup with. You can{' '}
              <Link href={GoToAccountPage()}>
                <a className="underline text-main-light hover:text-main">
                  review your address here
                </a>
              </Link>
              .
            </p>
          }
        />
        <FAQuestion
          question="How many times I can submit my findings?"
          answer="Once per day."
        />
        {/* <FAQuestion
          question="Where do I find example submissions?"
          answer={
            <p>
              You can see our examples{' '}
              <Link href={GoToRulesPage()}>
                <a className="underline text-main-light hover:text-main">
                  here
                </a>
              </Link>
              .
            </p>
          }
        /> */}
        <FAQuestion
          question="What is the maximum payout?"
          answer="There is no maximum."
        />
      </div>
    </>
  );
};

FAQPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default FAQPage;
