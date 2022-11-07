import { Requirement, Tag } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';

import { FullTarget } from '@/lib/types';

import { Title } from '@/components/utils/Title';

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
    <div className="space-y-8 text-on-surface-p1 max-w-6xl">
      <div className="-mb-4">
        <Title title="Review before publishing" />
      </div>

      {/* <Step4Details /> */}
    </div>
  );
};
