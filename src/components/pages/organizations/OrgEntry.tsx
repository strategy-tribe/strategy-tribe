import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';

import { FullOrganization } from '@/lib/types';

import { GoToOrgPage } from '@/utils/Routes';

export function OrgEntry({
  org,
  variants,
}: {
  org: FullOrganization;
  variants?: Variants;
}) {
  const router = useRouter();
  return (
    <motion.div
      variants={variants}
      className="space-y-2 cursor-pointer bt:max-w-xl laptop:max-w-none group"
      onClick={() => router.push(GoToOrgPage(org.id as string))}
    >
      <div className="flex items-start justify-between gap-2 font-grotesk">
        <h3 className="capitalize h5 font-grotesk group-hover:underline">
          {org.name}
        </h3>
        <span className="mt-1 text-main-light shrink-0 label">
          {org.targets
            ?.map((target: any) => target._count.bounties)
            ?.reduce((sum: any, count: any) => sum + count, 0)
            ?.toString()}{' '}
          {org.targets
            ?.map((target: any) => target._count.bounties)
            ?.reduce((sum: any, count: any) => sum + count, 0) === 1
            ? 'bounty'
            : 'bounties'}
        </span>
      </div>
      {org.bio && (
        <p className="max-w-lg text-on-surface-unactive line-clamp-3 body">
          <p className="whitespace-pre-wrap first-letter:capitalize">
            {org.bio}
          </p>
        </p>
      )}
    </motion.div>
  );
}
