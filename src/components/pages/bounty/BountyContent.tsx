import { useAuth } from 'auth/AuthContext';

import { BountyView } from '../../../lib/models/BountyView';
import { Section } from '../landing/Section';
import { useBountyContext } from './BountyContext';
import { BountyMoreDetails } from './BountyMoreDetails';
import { BountySideMap } from './BountySideMap';
import { BountySubmissions } from './BountySubmissions';

export function BountyContent() {
  const { view } = useBountyContext();

  const { userId } = useAuth();

  return (
    <Section className="flex gap-24 min-h-[20rem]">
      <BountySideMap />

      {view === BountyView.Submissions && (
        <>
          <BountySubmissions userId={userId} />
        </>
      )}

      {view === BountyView['Details'] && (
        <>
          <BountyMoreDetails />
        </>
      )}
    </Section>
  );
}
