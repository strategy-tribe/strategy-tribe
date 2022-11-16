import { useGetSubmissions } from '@/lib/hooks/submission/useGetSubmissions';

import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';

import { useAuth } from '@/auth/AuthContext';

export function AccountSubmissions() {
  const { userId, userInfo } = useAuth();

  const { submissions } = useGetSubmissions({});

  if (!userInfo || !userId || !submissions)
    return (
      <div className="w-full">
        <div className="border-b-1 border-surface pb-4">
          <span className="body-sm text-on-surface-unactive">
            Your submissions will show up here
          </span>
        </div>
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <div className="border-b-1 border-surface pb-4">
        <span className="body-sm body translate-x-0.5 text-on-surface-unactive">
          {submissions.length}{' '}
          {submissions.length === 1 ? 'submission' : 'submissions'}
        </span>
      </div>

      {submissions &&
        submissions?.map((s, i) => {
          return <SubmissionListEntry submission={s} key={i} />;
        })}
    </div>
  );
}
