import dynamic from 'next/dynamic';

import { MapDataWithFeatures } from '@/lib/models/MapData';

import { BountyBoard } from './BountyBoard';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import { ExploreFilters } from './filters/ExploreFilters';
import { Section } from '../landing/Section';
import { PageControls } from '../search/PageControls';

const Map = dynamic(import('./map/MapProjection'), {
  ssr: false,
});

export function Explore({ data }: { data: MapDataWithFeatures | undefined }) {
  return (
    <>
      <ExploreContextProvider data={data}>
        <ExploreContent />
      </ExploreContextProvider>
    </>
  );
}

function ExploreContent() {
  const { bountyFetch } = useExploreContext();

  const error = bountyFetch?.error ?? '';

  if (error) {
    console.error(error);
    // router.push(GoTo404Page());
    return <></>;
  }

  return (
    <>
      <div>
        {/* <Section>{!!Map && <Map />}</Section> */}

        <Section>{!!Map && <Map />}</Section>

        <div className="flex min-h-screen w-full flex-col gap-y-8 ">
          <>
            <Section className="w-full">
              <ExploreFilters />
            </Section>
            <div className="space-y-8">
              <PageNumber />
              <BountyBoard />
            </div>
            <div className="flex grow basis-0 items-end justify-center ">
              <PageControls />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

function PageNumber() {
  const { bountyFetch } = useExploreContext();

  const lastPage = bountyFetch?.numOfPages;
  if (!lastPage) return <></>;

  return (
    <Section>
      <span className="label text-main-light">
        Page {(bountyFetch?.page ?? 0) + 1} of {lastPage}
      </span>
    </Section>
  );
}
