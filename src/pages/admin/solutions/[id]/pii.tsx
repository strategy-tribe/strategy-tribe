import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { useGetPiiSolution } from '@/lib/hooks/solutionHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { SolutionData } from '@/components/pages/solution/SolutionData';
import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';

import { NextPageWithLayout } from '@/pages/_app';
import prisma from '@/server/prisma/prismaClient';

export const getStaticPaths: GetStaticPaths = async () => {
  const solutions = await prisma.solution.findMany({
    select: {
      id: true,
    },
  });
  const ids = solutions.reduce((acc, curr) => {
    return acc.concat({
      params: {
        id: curr.id,
      },
    });
  }, [] as { params: { id: string } }[]);

  return {
    paths: ids,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  if (!id) {
    console.error('no id detected, returning 404');
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
    },
    revalidate: 60 * 2, //every 2 minutes
  };
};

const SolutionPiiPage: NextPageWithLayout<{ id: string }> = ({
  id,
}: {
  id: string;
}) => {
  const { isLoading, solution } = useGetPiiSolution(id);

  const downloadFile = async (svg: string, fileName: string) => {
    if (solution) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.className = 'hidden';
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Head>
        <title>Solution Data</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
        OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {solution && (
        <div className="mx-auto min-h-screen max-w-7xl space-y-8 p-4">
          <div className="sticky top-[5rem] z-20 flex justify-between border-b-2 border-surface bg-bg py-4">
            <Title title="PII Solution" useBorder={true} big={true} />
            <div className="flex items-center gap-6">
              <a
                href={window.URL.createObjectURL(
                  new Blob([solution.pieSvg], { type: 'image/svg+xml' })
                )}
                className="label rounded bg-surface py-2 px-5 hover:bg-main"
                download={`${solution.target.name
                  .replaceAll('.', '')
                  .replaceAll(',', '')
                  .split(' ')
                  .join('_')}_piechat`}
              >
                Download PieChart
              </a>
              <a
                href={window.URL.createObjectURL(
                  new Blob([solution.dataSvg], { type: 'image/svg+xml' })
                )}
                className="label rounded bg-surface py-2 px-5 hover:bg-main"
                download={`${solution.target.name
                  .replaceAll('.', '')
                  .replaceAll(',', '')
                  .split(' ')
                  .join('_')}_pii`}
              >
                Download PII Solution
              </a>
              {/* <button
                // onClick={() => }
                className={`label rounded py-2 px-5 bg-surface hover:bg-main`}
              >
                Download PieChart
              </button>
              <button
                // onClick={() => setView(entry[1])}
                className={`label rounded py-2 px-5 bg-surface hover:bg-main`}
                // className={`label rounded py-2 px-5 ${
                //   active ? 'bg-surface' : 'hover:bg-surface-dark'
                // }`}
              >
                Download PII Solution
              </button> */}
            </div>
          </div>
          <SolutionData
            solution={{ ...solution, labelSvg: solution.dataSvg, content: '' }}
          />
        </div>
      )}
      {!solution && !isLoading && <div>Invalid report id</div>}
      {isLoading && <Loading small />}
    </>
  );
};

export default SolutionPiiPage;
SolutionPiiPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
