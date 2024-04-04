import Link from 'next/link';

import { GoToBountySubmissionGraphPage } from '@/lib/utils/Routes';

import { SmallSubmissionGraph } from '@/server/routes/submissionGraph/getBountySubGraphs';

export function SubmissionGraphCard({
  submissionGraph,
}: {
  submissionGraph: SmallSubmissionGraph;
}) {
  const animClasses = 'transition-all duration-[250] ease-out';
  const moveToLeft = 'hover:-translate-x-4';
  const moveBgtoLeft = 'group-hover:-translate-x-3';
  const expandBg = 'group-hover:scale-x-[1.15] group-hover:scale-y-[1.15]';

  return (
    <article
      className={`group relative h-fit pt-2 ${moveToLeft} ${animClasses}`}
    >
      <div
        className={`absolute inset-0 z-0 origin-left rounded border-t-2 border-main-light group-hover:bg-surface ${expandBg} ${animClasses} ${moveBgtoLeft}`}
      ></div>

      <Link
        className=""
        href={GoToBountySubmissionGraphPage(submissionGraph.slug)}
      >
        <span className={`relative z-10 flex flex-col gap-4 ${animClasses}`}>
          {submissionGraph.SubmissionGraph ? (
            <img
              className="h-[12rem]"
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                submissionGraph.SubmissionGraph.dataSvg
              )}`}
            />
          ) : (
            <img
              src="/images/logo.svg"
              alt="logo"
              className="totext max-h-[12rem] pt-3"
            />
          )}

          <h5 className="breakWord text-center group-hover:text-on-surface-p0">
            {submissionGraph.title}
          </h5>
        </span>
      </Link>
    </article>
  );
}
