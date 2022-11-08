import { Requirement, Tag } from '@prisma/client';

import { FullTarget } from '@/lib/types';

import { Title } from '@/components/utils/Title';

import { useAuth } from '@/auth/AuthContext';

interface iReviewStep {
  //target
  target: FullTarget;
  //bounty
  title: string;
  //requirements
  requirements: Requirement[];
  //deadline
  date?: Date;
  tags: Tag[];
}

export const Review = ({
  target,
  title,
  requirements,
  date,
  tags,
}: iReviewStep) => {
  const { userId } = useAuth();

  return (
    <div className="max-w-6xl space-y-8 text-on-surface-p1">
      <div className="-mb-4">
        <Title title="Review before publishing" />
      </div>

      {/* <Step4Details /> */}
    </div>
  );
};
