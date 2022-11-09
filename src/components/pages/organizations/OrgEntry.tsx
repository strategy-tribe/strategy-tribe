import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';

import { GoToOrgPage } from '@/lib/utils/Routes';

import { SmallOrg } from '@/server/routes/organizations/getOrgs';

export function OrgEntry({
  org,
  variants,
}: {
  org: SmallOrg;
  variants?: Variants;
}) {
  const router = useRouter();
  return (
    <motion.div
      variants={variants}
      className="group cursor-pointer space-y-2 bt:max-w-xl laptop:max-w-none"
      onClick={() => router.push(GoToOrgPage(org.id as string))}
    >
      <div className="flex items-start justify-between gap-2 font-grotesk">
        <h3 className="h5 font-grotesk capitalize group-hover:underline">
          {org.name}
        </h3>
        <span className="label mt-1 shrink-0 text-main-light">
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
        <p className="body max-w-lg text-on-surface-unactive line-clamp-3">
          <p className="whitespace-pre-wrap first-letter:capitalize">
            {org.bio}
          </p>
        </p>
      )}
    </motion.div>
  );
}
