import Submissions from '@/components/utils/Submissions';
import { Title } from '@/components/utils/Title';
import { UserSubmissions } from '@/components/utils/UserSubmissions';
('@/components/utils/Title');
import { useAuth } from 'auth/AuthContext';
import { useBountyContext } from './BountyContext';

export function BountySubmissions({ className }: { className?: string }) {
  const { bounty, sectionInView } = useBountyContext();
  const { userId: user, isStaff } = useAuth();

  return (
    <div
      className={`${
        sectionInView === 'submissions' ? '' : 'laptop:hidden'
      } laptop:max-w-2xl`}
    >
      {!user && (
        <div className="space-y-2">
          <Title title="Submissions" />
          <p className="text-sm font-medium text-disabled">
            Connect your wallet to see your submissions
          </p>
        </div>
      )}
      {isStaff && bounty && Boolean(bounty.id as string) && (
        <Submissions bountyId={bounty.id as string} />
      )}
      {!isStaff && user && bounty.id && (
        <UserSubmissions id={bounty.id as string} />
      )}
    </div>
  );
}
