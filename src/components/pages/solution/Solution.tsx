import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useGetFile } from '@/lib/hooks/fileHooks';
import {
  GoToBountyPage,
  GoToNewSolutionPage,
  GoToSolutionEditPage,
  GoToSolutionPIIPage,
  GoToTargetPage,
} from '@/lib/utils/Routes';
import { toTitleCase } from '@/lib/utils/StringHelpers';

import { useAuth } from '@/auth/AuthContext';
import { FullSolution } from '@/server/routes/solutions/getSolution';

import { SolutionData } from './SolutionData';

export function Solution({ solution }: { solution: FullSolution }) {
  const { isAdmin, isStaff, userId, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && solution.content.includes('Loading...')) {
      router.reload();
    }
  }, [isAuthenticated]);

  const { fileUrl } = useGetFile([
    `targets/thumbnails/${solution.target.name.split(' ').join('_')}.jpeg`,
    `targets/orgs/${solution.target.org?.name.split(' ').join('_')}.jpeg`,
  ]);
  const tags = solution.target.bounties.reduce(
    (acc, b) => acc.concat(b?.tags.map((tag) => tag.name) ?? []),
    [] as string[]
  );

  return (
    <div className="mx-auto mt-2 min-h-screen max-w-7xl space-y-4 border-2 border-surface p-8">
      {(isAdmin || isStaff) && (
        <div className="flex space-x-16">
          <button
            onClick={() => router.push(GoToSolutionPIIPage(solution.id))}
            className="label w-full rounded bg-surface py-2 px-5 hover:bg-main"
          >
            View PII
          </button>
          <button
            onClick={() => router.push(GoToSolutionEditPage(solution.id))}
            className="label w-full rounded bg-surface py-2 px-5 hover:bg-main"
          >
            Edit this solution
          </button>
          <button
            onClick={() => router.push(GoToNewSolutionPage())}
            className="label w-full rounded bg-surface py-2 px-5 hover:bg-main"
          >
            Add new solution
          </button>
        </div>
      )}

      <div className="flex flex-wrap content-center justify-center text-center">
        {fileUrl && (
          <img
            src={fileUrl}
            alt="Solution Image"
            className="mx-4 h-[200px] object-cover"
          ></img>
        )}
        <div className="self-center">
          <Link href={GoToTargetPage(solution.target.name)}>
            <div className="text-3xl font-bold text-main hover:text-main-light">
              {toTitleCase(solution.target.name)}
            </div>
          </Link>
          <div className="flex flex-wrap gap-4">
            {tags
              .filter(
                (tag: string, index: number) => tags.indexOf(tag) === index
              )
              .map((tag) => {
                return (
                  <span
                    key={tag}
                    className="label text-base capitalize text-on-surface-unactive"
                  >
                    {tag}
                  </span>
                );
              })}
          </div>
          {(isAdmin || isStaff) && (
            <div className={solution.publish ? 'text-success' : 'text-error'}>
              {solution.publish ? 'Published' : 'Unpublished'}
            </div>
          )}
        </div>
      </div>

      <SolutionData solution={solution} />

      <h1 className="h2 mt-3 w-fit pt-3 text-main">Request References Table</h1>
      <p className="mb-4 font-grotesk leading-6">
        For each flowchart, the reference table identifies the pieces of data
        given, and substitutes e.g “domain1” with the true values.
        <br />
        We provide references tables to law enforcement and journalists free of
        charge - if this is of interest, email from your work domain to:{' '}
        <a
          className="text-main-light underline hover:text-main"
          href="mail:references@strategytribe.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          references@strategytribe.io
        </a>{' '}
        - with a link to this page.
      </p>
      <h1 className="h2 mt-3 w-fit pt-3 text-main">Appendix</h1>
      <div className="space-y-4 px-2">
        <h1 className="h3 mt-3 w-fit pt-3 text-wait-bounty">Bounties</h1>
        <div>
          <span>Bounty Paid: </span>
          <span className="font-bold">
            {solution.target.bounties
              .map((bounty) => bounty.wallet.balance)
              ?.reduce((sum, count) => sum + count, 0)
              ?.toFixed(2)
              ?.toString()}
          </span>
          <span> MATIC</span>
        </div>
        <ul className="list-disc pl-[2rem]">
          {solution.target.bounties.map((bounty) => (
            <li key={bounty.slug}>
              <Link href={GoToBountyPage(bounty.slug)}>
                <span className="text-left text-main-light underline hover:text-main">
                  {bounty.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <h1 className="h3 mt-3 w-fit pt-3 text-wait-bounty">
          Solution Symbology
        </h1>
        <div className="flex gap-x-8 px-4">
          <div className="border-2 p-4">Process</div>
          <div className="parallelogram border-2 p-4">Data found</div>
        </div>
        <h1 className="h3 mt-3 w-fit pt-3 text-wait-bounty">
          How Data is archived
        </h1>
        <ul className="list-disc pl-[2rem]">
          <li>
            Links are archived with{' '}
            <a
              className="text-main-light underline hover:text-main"
              href="https://web.archive.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              wayback machine
            </a>
            .
          </li>
          <li>
            All pages visited in step-through are stored with corresponding
            screenshots and timestamps via{' '}
            <a
              className="text-main-light underline hover:text-main"
              href="https://www.hunch.ly/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hunchly
            </a>
            .
          </li>
        </ul>
        <h1 className="h3 mt-3 w-fit pt-3 text-wait-bounty">
          How Data is used
        </h1>
        <a
          className="my-2 text-main-light underline hover:text-main"
          href="https://www.strategytribe.io/faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.strategytribe.io/faq
        </a>
      </div>
    </div>
  );
}
