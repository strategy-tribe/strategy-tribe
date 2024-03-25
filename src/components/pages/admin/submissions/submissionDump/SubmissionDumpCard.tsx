import Link from 'next/link';

import { useGetFile } from '@/lib/hooks/fileHooks';
import { GoToBountyPage } from '@/lib/utils/Routes';

import { Tag } from '@/components/pages/explore/bounty card/BountyCardTags';
import Icon, { IconSize } from '@/components/utils/Icon';

import { SmallSubmissionDump } from '@/server/routes/submission/submissionDump/getSubmissionDump';

export function SubmissionDumpCard({
  submission,
}: {
  submission: SmallSubmissionDump;
}) {
  const animClasses = 'transition-all duration-[250] ease-out';
  const moveToLeft = 'hover:-translate-x-4';
  const moveBgtoLeft = 'group-hover:-translate-x-3';
  const expandBg = 'group-hover:scale-x-[1.15] group-hover:scale-y-[1.15]';

  const { fileUrl } = useGetFile([
    `targets/thumbnails/${submission.Target.toLowerCase()
      .split(' ')
      .join('_')}.jpeg`,
    `targets/orgs/${submission.Organisation.toLowerCase()
      .split(' ')
      .join('_')}.jpeg`,
  ]);

  return (
    <article className={`group relative h-full ${moveToLeft} ${animClasses}`}>
      <div
        className={`absolute inset-0 z-0 origin-left rounded group-hover:bg-surface ${expandBg} ${animClasses} ${moveBgtoLeft}`}
      ></div>
      <div className={`relative z-10 flex flex-col gap-1 ${animClasses}`}>
        <div className="flex items-center">
          <div className="mr-2 mt-2 gap-y-2">
            {fileUrl && (
              <img
                src={fileUrl}
                className="mb-2 h-[80px] w-[80px] object-cover"
                alt="preview for image"
              />
            )}
            <a
              href={window.URL.createObjectURL(
                new Blob([JSON.stringify(submission, null, 4)], {
                  type: 'application/json',
                })
              )}
              className="label mb-2 flex items-center gap-x-1 rounded bg-surface p-2 text-[0.5rem] hover:bg-main"
              download={`${
                submission.Target
              }_${new Date().toLocaleDateString()}`}
            >
              <Icon size={IconSize.Small} icon="download" />
              Download
            </a>
          </div>
          <div className="grid">
            <Tag tag={`Org: ${submission.Organisation}`} />
            {submission.Countries && (
              <div className="col-span-3 inline space-x-1">
                {submission.Countries.map((c, i) => {
                  return (
                    <button
                      className={`label-sm ${
                        i < (submission.Countries?.length ?? 0) - 1
                          ? 'border-r-2 '
                          : ''
                      }border-surface pr-1 text-on-surface-unactive`}
                      key={i}
                      // TODO: Add countries to filter
                      // onClick={() => console.log('dsdsd')}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            )}
            <Link
              href={GoToBountyPage(submission.Slug ?? '')}
              className="title-xs text-left group-hover:underline"
            >
              <span className="breakWord h6 text-main-light group-hover:text-on-surface-p0">
                {submission.Bounty}
              </span>
            </Link>
            {submission.Tags && (
              <div className="col-span-3 inline space-x-1">
                {submission.Tags.map((tag, i) => {
                  return (
                    <span
                      className={`label-sm ${
                        i < (submission.Tags?.length ?? 0) - 1
                          ? 'border-r-2 '
                          : ''
                      }border-surface pr-1 text-on-surface-unactive`}
                      key={i}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {Object.entries(submission.Data).map((entry) => (
          <div className="pl-1" key={entry[0]}>
            <span className="text-xs">{entry[0]}</span>:
            {entry[1] && (
              <div className="col-span-3 ml-2 inline space-x-1">
                {entry[1].map((e, i) => {
                  return (
                    <span
                      className={`label-sm break-words ${
                        i < (entry[1].length ?? 0) - 1 ? 'border-r-2 ' : ''
                      }border-surface pr-1 text-on-surface-unactive`}
                      key={i}
                    >
                      {e}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
