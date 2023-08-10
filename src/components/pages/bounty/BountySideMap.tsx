import { BountyView } from '@/lib/models/BountyView';

import { useAuth } from '@/auth/AuthContext';

import { useBountyContext } from './BountyContext';

export function BountySideMap() {
  const { view, setView } = useBountyContext();
  const { userId } = useAuth();

  const pages = Object.entries(BountyView).filter((entry) => {
    const showSubmissionsOnlyIfUserIsSignedIn = userId
      ? true
      : entry[1] !== BountyView.Submissions;

    return showSubmissionsOnlyIfUserIsSignedIn;
  });

  function goToPage(view: BountyView) {
    setView(view);
  }

  return (
    <aside className="flex gap-2 tablet:w-[240px] tablet:flex-col">
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
            {value === BountyView.Submissions ? 'Your submissions' : label}
          </button>
        );
      })}
    </aside>
  );
}
