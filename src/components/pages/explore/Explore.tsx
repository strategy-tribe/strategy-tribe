import { MapData } from '@/lib/models/MapData';

import { Section } from '../landing/Section';
import { PageControls } from '../search/PageControls';
import { BountyBoard } from './BountyBoard';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import { ExploreFilters } from './filters/ExploreFilters';

// const Map = dynamic(import('./map/MapProjection'), {
//   ssr: false,
// });

export function Explore({ data }: { data: MapData | undefined }) {
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
  const bounties = bountyFetch?.bounties ?? [];
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

        <div className="gap-y-8 flex flex-col w-full min-h-screen ">
          <>
            <Section className="w-full">
              <ExploreFilters />
            </Section>
            <div className="space-y-8">
              <PageNumber />
              <BountyBoard />
            </div>
            <div className="flex justify-center items-end basis-0 grow ">
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
