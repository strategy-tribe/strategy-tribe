import { useBountyUrl } from '@/lib/hooks/useBountyUrl';
import { useAuth } from 'auth/AuthContext';
import { Section } from '../landing/Section';
import { useBountyContext } from './BountyContext';
import { BountyMoreDetails } from './BountyMoreDetails';
import { BountySideMap } from './BountySideMap';
import { BountySubmissions } from './BountySubmissions';
import { BountyPage } from '../../../lib/models/bounty/BountyPage';

export function BountyContent() {
  const { bounty } = useBountyContext();

  const {
    query: { view },
  } = useBountyUrl();

  const { userId } = useAuth();

  return (
    <Section className="flex gap-24 min-h-[20rem]">
      <BountySideMap bounty={bounty} />

      {view === BountyPage.Submissions && (
        <>
          <BountySubmissions userId={userId} />
        </>
      )}

      {view === BountyPage['More details'] && (
        <>
          <BountyMoreDetails />
        </>
      )}
    </Section>
  );
}
