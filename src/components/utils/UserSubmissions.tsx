import Link from 'next/link';

import { useGetSubmissions } from '@/hooks/submissionHooks';

import Loading from '@/components/utils/Loading';
import { Title } from '@/components/utils/Title';

import { GoToBeforeNewSubmissionPage } from '@/utils/Routes';

export function UserSubmissions({ id }: { id: string }) {
  const { submissions: userSubmissions, isLoading } = useGetSubmissions({
    bounties: [id],
  });

  if (isLoading) return <Loading small={true} />;

  return (
    <div className="space-y-4 px-2 laptop:pb-32">
      <Title title="Your Submissions" />
      {!userSubmissions ||
        (userSubmissions.length === 0 && (
          <>
            <p className="body text-sm font-medium text-on-surface-unactive">
              You have not submitted findings to this bounty.
              <br />
              <Link href={GoToBeforeNewSubmissionPage(id)}>
                <span className="font-medium text-main-light underline">
                  You can submit your findings here.
                </span>
              </Link>
            </p>
          </>
        ))}
      {/* {!!userSubmissions && (
        <>
          {userSubmissions
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((s, i) => {
              return <SubmissionEntry key={i} submission={s} />;
            })}
        </>
      )} */}
    </div>
  );
}
