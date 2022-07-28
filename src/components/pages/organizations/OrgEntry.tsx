import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';

import { Organization } from '@/lib/models/organizations/organization';

import { GoToOrgPage } from '@/utils/Routes';

export function OrgEntry({
  org,
  variants,
}: {
  org: Organization;
  variants?: Variants;
}) {
  const router = useRouter();
  return (
    <motion.div
      variants={variants}
      className="space-y-2 cursor-pointer bt:max-w-xl laptop:max-w-none group"
      onClick={() => router.push(GoToOrgPage(org.id as string))}
    >
      <div className="flex justify-between font-grotesk items-start gap-2">
        <h3 className="h5 font-grotesk capitalize group-hover:underline">
          {org.name}
        </h3>
        <span className="text-main-light shrink-0 label mt-1">
          {org.bounties} {org.bounties === 1 ? 'bounty' : 'bounties'}
        </span>
      </div>
      {org.bio && (
        <p className="text-on-surface-unactive line-clamp-3 max-w-sm body">
          {org.bio}
        </p>
      )}
    </motion.div>
  );
}
