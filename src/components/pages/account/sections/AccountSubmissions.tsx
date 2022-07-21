import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import { useGetUserSubmissions } from '@/lib/hooks/submissionHooks';
import { useAuth } from 'auth/AuthContext';

export function AccountSubmissions() {
  const { userId, userInfo } = useAuth();

  const { submissions } = useGetUserSubmissions(
    userId as string,
    Boolean(userId as string)
  );

  if (!userInfo || !userId || !submissions) return <></>;

  return (
    <div className="w-full space-y-6">
      <div className="pb-4 border-b-1 border-dark">
        <span className="body translate-x-0.5 text-unactive">
          {submissions.length}{' '}
          {submissions.length === 1 ? 'submission' : 'submissions'}
        </span>
      </div>

      {submissions?.map((s, i) => {
        return <SubmissionListEntry submission={s} key={i} />;
      })}
    </div>
  );
}
