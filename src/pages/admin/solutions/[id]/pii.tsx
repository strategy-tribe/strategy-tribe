import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { useGetPiiSolution } from '@/lib/hooks/solutionHooks';
import { toTitleCase } from '@/lib/utils/StringHelpers';

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

  const getMaxHeight = (svgString: string) => {
    const container = document.createElement('div');
    container.style.display = 'inline-block';
    container.style.width = '1px';
    container.style.height = '1px';
    container.innerHTML = svgString;
    document.body.appendChild(container);
    const svgElement = container.querySelector('svg');
    if (svgElement) {
      const ariaRoleDescription = svgElement.getAttribute(
        'aria-roledescription'
      );
      const maxHeight = svgElement.getBBox().height;
      document.body.removeChild(container);
      return [maxHeight, ariaRoleDescription];
    }
    return ['', ''];
  };

  function getImage(piechart: boolean, svgString: string, targetName: string) {
    let max;
    let osElement;
    if (!piechart) {
      const [maxWidth, element] = getMaxHeight(svgString);
      if (element === 'osint' || element === 'osint-elk') {
        max = maxWidth;
        osElement = element;
      }
    }
    let logoHeightPercentage = '7.5%';
    let imgHeight = '4.5%';
    let logoWidth = '5%';
    let createdTextHt = '5%';
    if (osElement && osElement === 'osint-elk') {
      logoWidth = '10%';
      createdTextHt = '18%';
      logoHeightPercentage = '20.5%';
      imgHeight = '18%';
      if (max && max > 1150) {
        createdTextHt = '19%';
        imgHeight = '19%';
      }
    }
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');

    //heading text
    const headingText = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    headingText.setAttribute('x', '50%');
    headingText.setAttribute('y', '0%');
    headingText.textContent = `Data point Stats for ${toTitleCase(targetName)}`;
    headingText.style.fill = 'white';
    headingText.setAttribute('text-anchor', 'middle');

    //created by text
    const createdText = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    createdText.setAttribute('x', piechart ? '50%' : logoWidth);
    createdText.setAttribute('y', piechart ? '101.5%' : createdTextHt);
    createdText.textContent = 'Created by';
    createdText.style.fontSize = '11px';
    createdText.style.fill = 'dimgray';

    //Logo text
    const logoText = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );
    logoText.setAttribute('x', piechart ? '50%' : logoWidth);
    logoText.setAttribute('y', piechart ? '106%' : `${logoHeightPercentage}`);
    logoText.textContent = 'StrategyTribe';
    logoText.style.fill = 'white';

    //Logo image
    const logoImage = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );
    logoImage.setAttribute(
      'x',
      piechart ? 'calc(50% + 50px)' : `calc(${logoWidth} + 100px)`
    );
    logoImage.setAttribute('y', piechart ? '101%' : `${imgHeight}`);
    logoImage.setAttribute('width', '30');
    logoImage.setAttribute('height', '30');
    logoImage.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      window.origin + '/images/logo.svg'
    );
    logoImage.style.fill = 'white';

    if (svgDoc && svgDoc.querySelector('svg')) {
      const svgElement = svgDoc.querySelector('svg');
      if (svgElement) {
        if (piechart) {
          svgElement.appendChild(headingText);
          logoText.setAttribute('text-anchor', 'middle');
          createdText.setAttribute('text-anchor', 'middle');
        }
        svgElement.appendChild(createdText);
        svgElement.appendChild(logoText);
        svgElement.appendChild(logoImage);
      }
      const modifiedSvgString = new XMLSerializer().serializeToString(svgDoc);
      return window.URL.createObjectURL(
        new Blob([modifiedSvgString], { type: 'image/svg+xml' })
      );
    } else {
      console.error('Could not find SVG element in the document.');
    }
  }

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
                href={getImage(true, solution.pieSvg, solution.target.name)}
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
                href={getImage(false, solution.dataSvg, solution.target.name)}
                className="label rounded bg-surface py-2 px-5 hover:bg-main"
                download={`${solution.target.name
                  .replaceAll('.', '')
                  .replaceAll(',', '')
                  .split(' ')
                  .join('_')}_pii`}
              >
                Download PII Solution
              </a>
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
