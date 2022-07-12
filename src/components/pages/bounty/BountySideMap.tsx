import { BountyView } from '../../../lib/models/bounty/BountyPage';
import { useBountyContext } from './BountyContext';

export function BountySideMap() {
  const { view, setView } = useBountyContext();
  const pages = Object.entries(BountyView);

  function goToPage(view: BountyView) {
    setView(view);
  }

  return (
    <aside className="w-[240px] flex flex-col gap-2">
      {pages.map((pair, i) => {
        const label = pair[0];
        const value = pair[1];
        return (
          <button
            className={`${
              value === view ? 'bg-darker text-white' : 'hover:bg-darker'
            } rounded text-left pr-8 p-4 label`}
            key={i}
            onClick={() => goToPage(value as BountyView)}
          >
            {label}
          </button>
        );
      })}
    </aside>
  );
}
