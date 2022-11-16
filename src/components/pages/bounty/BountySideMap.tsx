import { BountyView } from '@/lib/models/BountyView';

import { useBountyContext } from './BountyContext';

export function BountySideMap() {
  const { view, setView } = useBountyContext();
  const pages = Object.entries(BountyView);

  function goToPage(view: BountyView) {
    setView(view);
  }

  return (
    <aside className="flex w-[240px] flex-col gap-2">
      {pages.map((pair, i) => {
        const label = pair[0];
        const value = pair[1];
        return (
          <button
            className={`${
              value === view
                ? 'border-2 border-main text-on-surface-p0'
                : 'border-bg hover:bg-surface-dark'
            } label rounded p-4 pr-8 text-left`}
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
