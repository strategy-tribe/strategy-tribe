import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { Explore } from '@/components/pages/explore/Explore';

import { NextPageWithLayout } from './_app';

// const getMapData = async (): Promise<MapData | undefined> => {
// const moralis_serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
// const moralis_appId = process.env.NEXT_PUBLIC_APP_ID;
// await Moralis.start({
//   serverUrl: moralis_serverUrl,
//   appId: moralis_appId,
// });
// const res = await Moralis.Cloud.run('getMapStats');
// if (!res) {
//   throw new Error('Attemped to run "getMapStats". Got no response.');
// }
// const mapData: CountriesData = {
//   id: res.id,
//   createdAt: res.attributes.createdAt,
//   countries: res.attributes.stats,
// };
// const getEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/data/features.json`;
// const featuresRes = await fetch(getEndpoint);
// const features = await featuresRes.json();
// return { mapData, features: features.features };
//   return undefined;
// };

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     //*Map data
//     const data = await getMapData();
//     //*Return props
//     return {
//       props: {
//         data: JSON.parse(JSON.stringify(data)),
//       },
//       revalidate: 10,
//     };
//   } catch (error) {
//     console.error('error:\n', error);
//     return {
//       notFound: true,
//     };
//   }
// };

const BountiesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>ST | Home</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Explore data={undefined} />
    </>
  );
};

export default BountiesPage;

BountiesPage.getLayout = function getLayout(page) {
  return <AppLayout hideBgOnScroll>{page}</AppLayout>;
};
