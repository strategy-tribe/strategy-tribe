import { useGetSubmissionsFromBounty } from '@/hooks/submissionHooks';
import { GoToBeforeNewSubmissionPage } from '@/utils/Routes';
import Link from 'next/link';
import { useAuth } from 'auth/AuthContext';
import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { SubmissionEntry } from './SubmissionEntry';

export function UserSubmissions({ id }: { id: string }) {
  const { userId } = useAuth();

  const { submissions: userSubmissions, isLoading } =
    useGetSubmissionsFromBounty(
      userId as string,
      id,
      Boolean(userId as string)
    );

  if (isLoading) return <Loading small={true} />;

  return (
    <div className="space-y-4 laptop:pb-32 px-2">
      <Title title="Your Submissions" />
      {!userSubmissions ||
        (userSubmissions.length === 0 && (
          <>
            <p className="text-on-surface-unactive text-sm font-medium body">
              {'You have not submitted findings to this bounty.'}
              <br />
              <Link href={GoToBeforeNewSubmissionPage(id)}>
                <a className="underline text-main-light font-medium">
                  You can submit your findings here.
                </a>
              </Link>
            </p>
          </>
        ))}
      {!!userSubmissions && (
        <>
          {userSubmissions
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((s, i) => {
              return <SubmissionEntry key={i} submission={s} />;
            })}
        </>
      )}
    </div>
  );
}
