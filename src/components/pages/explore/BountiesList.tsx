import { Button, ButtonStyle } from '@/components/utils/Button';
import { useGetBounties } from '@/hooks/bountyHooks';
import { useUrlSearchParams } from '@/hooks/useUrlSearchParams';
import { BountyQueryParams } from '@/lib/models/queryParams';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { AppearVariants } from '@/lib/framer/Variants';
import { motion } from 'framer-motion';
import Loading from '@/components/utils/Loading';
import { BountyEntry } from '@/components/utils/BountyEntry';

export const BountyList = ({
  query,
  title,
  fullSize = true,
}: {
  query: BountyQueryParams;
  title: string;
  fullSize?: boolean;
}) => {
  const { bounties, isLoading } = useGetBounties(query);

  const { applyQry: go } = useUrlSearchParams();

  if (isLoading) return <Loading fullScreen={false} />;

  if (!bounties || !bounties.length) return <></>;

  return (
    <motion.div
      className="space-y-4"
      variants={AppearVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-center gap-4">
        <Title title={title} />
        <Button
          info={{
            label: 'More',
            onClick: () => go({ ...query, amount: 10 }),
            style: ButtonStyle.TextPurple,
            removePadding: true,
            removeMinWidth: true,
          }}
        />
      </div>
      <div className="space-y-8">
        {bounties.map((p, i) => {
          return (
            <BountyEntry
              bounty={p}
              key={`bounty entry for ${p.id} ${i}`}
              variants={AppearVariants}
              fullSize={fullSize}
            />
          );
        })}
      </div>
    </motion.div>
  );
};
