import { useBountyUrl } from '@/lib/hooks/useBountyUrl';
import { Bounty as BountyData } from '@/lib/models';
import { GoToBountyPage } from '@/lib/utils/Routes';
import { BountyPage } from '../../../lib/models/bounty/BountyPage';

export function BountySideMap({ bounty }: { bounty: BountyData }) {
  const { query, setQuery } = useBountyUrl();
  const pages = Object.entries(BountyPage);

  function goToPage(value: BountyPage) {
    setQuery({ view: value }, GoToBountyPage(bounty.id!));
  }

  return (
    <aside className="w-[240px] flex flex-col gap-2">
      {pages.map((pair, i) => {
        const label = pair[0];
        const value = pair[1];
        return (
          <button
            className={`${
              value === query.view && 'bg-darker text-white'
            } rounded text-left pr-8 p-4 label`}
            key={i}
            onClick={() => goToPage(value as BountyPage)}
          >
            {label}
          </button>
        );
      })}
    </aside>
  );
}
