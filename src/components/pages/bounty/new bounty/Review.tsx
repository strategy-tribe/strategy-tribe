import { Requirement } from '@/lib/models/requirement';
import { BountyState } from '@/lib/models/status';
import { Target } from '@/lib/models/target';
import React from 'react';
import { useAuth } from 'auth/AuthContext';
import { Step4Details } from './Details';
import { Title } from '@/components/utils/Title';
('../../utils/Title');

interface iStep4 {
  //target
  target: Target;
  //bounty
  title: string;
  //requirements
  requirements: Requirement[];
  //deadline
  date?: Date;
}

export const Review = ({ target, title, requirements, date }: iStep4) => {
  const { userId } = useAuth();

  return (
    <div className="space-y-8 text-on-surface-p1 max-w-6xl">
      <div className="-mb-4">
        <Title title="Review before publishing" />
      </div>

      <Step4Details
        bounty={{
          name: target.name,
          organizationName: target.organizationName,
          type: target.type,
          alsoKnownAs: target.alsoKnownAs,
          countries: target.countries,
          tags: target.tags,
          description: target.description,
          requirements,
          state: BountyState.WaitingForFunds,
          title,
          funds: 0,
          staffCreatorId: userId as string,
          submissions: 0,
          wallet: '',
          closesAt: date,
        }}
      />
    </div>
  );
};
