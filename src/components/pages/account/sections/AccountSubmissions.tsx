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
      {submissions?.map((s, i) => {
        return <SubmissionListEntry submission={s} key={i} />;
      })}
    </div>
  );
}
