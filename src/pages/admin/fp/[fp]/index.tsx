import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { FpInfo } from '@/components/pages/admin/info/FpInfo';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';
import {
  FullFp,
  ServerGetFp,
} from '@/server/routes/fingerprint/getFingerprint';

export const getStaticPaths: GetStaticPaths = async () => {
  const fingerprints = await prisma.fingerprint.findMany({
    select: {
      fingerprint: true,
    },
  });
  const fps = fingerprints.reduce((acc, curr) => {
    return acc.concat({
      params: {
        fp: curr.fingerprint,
      },
    });
  }, [] as { params: { fp: string } }[]);

  return {
    paths: fps,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fp = params?.fp as string;

  if (!fp) {
    console.error('no slug detected, returning 404');
    return {
      notFound: true,
    };
  }

  const fingerprint: FullFp | null = await ServerGetFp(prisma, {
    fp,
  });

  if (!fingerprint) {
    console.error(`not FP found for ${fp}, returning 404`);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      fingerprint: JSON.parse(JSON.stringify(fingerprint)),
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const FpPage: NextPageWithLayout<{ fingerprint: FullFp }> = ({
  fingerprint,
}: {
  fingerprint: FullFp;
}) => {
  return (
    <>
      <Head>
        <title>FP</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FpInfo fp={fingerprint}></FpInfo>
    </>
  );
};

export default FpPage;
FpPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
