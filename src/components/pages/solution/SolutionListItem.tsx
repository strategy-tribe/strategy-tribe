import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetFile } from '@/lib/hooks/fileHooks';
import { GoToSolutionPage } from '@/lib/utils/Routes';
import { capitalizeSentence } from '@/lib/utils/StringHelpers';

import { useAuth } from '@/auth/AuthContext';
import { SmallSolution } from '@/server/routes/solutions/getSolutions';

export function SolutionListItem({ solution }: { solution: SmallSolution }) {
  const { isAdmin, isStaff } = useAuth();
  const { fileUrl } = useGetFile([
    `targets/thumbnails/${solution.target.name.split(' ').join('_')}.jpeg`,
    `targets/orgs/${solution.target.org?.name.split(' ').join('_')}.jpeg`,
  ]);
  const router = useRouter();

  return (
    <Link href={GoToSolutionPage(solution.id as string)} className="flex">
      {fileUrl && (
        <img
          src={fileUrl}
          className="m-2 h-[100px] w-[100px] object-cover"
          alt="preview for image"
        />
      )}
      <div className="w-full self-center">
        <div className="flex w-full items-start justify-between gap-2 font-grotesk">
          <h3 className="h5 breakWord font-grotesk capitalize group-hover:underline">
            {solution.target.name}
          </h3>
          <span className="label mt-1 shrink-0 text-main-light">
            {solution.target._count.bounties.toString()}{' '}
            {solution.target._count.bounties === 1 ? 'bounty' : 'bounties'}
          </span>
        </div>
        {solution.target.org && (
          <p className="body max-w-lg text-on-surface-unactive line-clamp-3">
            <span className="whitespace-pre-wrap font-bold capitalize">
              Organization: {solution.target.org.name}
            </span>
          </p>
        )}
        {solution.target.bio && (
          <p className="body max-w-lgx text-on-surface-unactive line-clamp-3">
            <span className="whitespace-pre-wrap">
              {capitalizeSentence(solution.target.bio)}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
