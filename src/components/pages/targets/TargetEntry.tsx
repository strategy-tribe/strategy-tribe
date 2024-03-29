import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

import { useGetFile } from '@/lib/hooks/fileHooks';
import { GoToTargetPage } from '@/lib/utils/Routes';
import { capitalizeSentence } from '@/lib/utils/StringHelpers';

import { SmallTarget } from '@/server/routes/targets/getTargets';

export function TargetEntry({
  target,
  variants,
}: {
  target: SmallTarget;
  variants?: Variants;
}) {
  const { fileUrl } = useGetFile([
    `targets/thumbnails/${target.name.split(' ').join('_')}.jpeg`,
    `targets/orgs/${target.org?.name.split(' ').join('_')}.jpeg`,
  ]);

  return (
    <motion.div
      variants={variants}
      className="group cursor-pointer space-y-2 border-b-2 border-surface p-2 tablet:border-b-0 bt:max-w-xl"
    >
      <Link href={GoToTargetPage(target.name as string)} className="flex">
        {fileUrl && (
          <img
            src={fileUrl}
            className="m-2 h-[100px] w-[100px] object-cover"
            alt="preview for image"
          />
        )}
        <div>
          <div className="flex items-start justify-between gap-2 font-grotesk">
            <h3 className="h5 breakWord font-grotesk capitalize group-hover:underline">
              {target.name}
            </h3>
            <span className="label mt-1 shrink-0 text-main-light">
              {target._count.bounties.toString()}{' '}
              {target._count.bounties === 1 ? 'bounty' : 'bounties'}
            </span>
          </div>
          {target.org && (
            <p className="body max-w-lg text-on-surface-unactive line-clamp-3">
              <span className="whitespace-pre-wrap font-bold capitalize">
                Organization: {target.org.name}
              </span>
            </p>
          )}
          {target.bio && (
            <p className="body max-w-lg text-on-surface-unactive line-clamp-3">
              <span className="whitespace-pre-wrap">
                {capitalizeSentence(target.bio)}
              </span>
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
