import { useAuth } from '@/auth/AuthContext';

import { useBountyContext } from './BountyContext';
import { BountyMoreDetails } from './BountyMoreDetails';
import { BountySideMap } from './BountySideMap';
import { BountySubmissions } from './BountySubmissions';
import { Section } from '../landing/Section';
import { BountyView } from '../../../lib/models/BountyView';

export function BountyContent() {
  const { view } = useBountyContext();

  const { userId } = useAuth();

  return (
    <Section className="min-h-[20rem] gap-24 tablet:flex">
      {userId && <BountySideMap />}

      {view === BountyView.Submissions && userId && (
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
