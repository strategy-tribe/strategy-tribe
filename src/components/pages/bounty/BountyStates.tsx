import { Bounty } from '@/lib/models/bounty';
import { BountyState } from '@/lib/models/status';
import { GetDateInString } from '@/utils/DateHelpers';
import React from 'react';

import { MoreInfo } from '@/components/utils/MoreInfo';
import Icon from '@/components/utils/Icon';

export default function BountyStates({ bounty }: { bounty: Bounty }) {
  const ETHERSCAN_LINK = process.env.NEXT_PUBLIC_ETHERSCAN_URL;

  const stateInfo = () => {
    switch (bounty.state) {
      case BountyState.Open:
        return 'All findings being submitted will be taken into consideration until one matches the requirements.';

      case BountyState.Closed:
        return 'The bounty has closed and is not accepting any submissions.';

      case BountyState.PaymentNeeded:
        return "The bounty's requirements have been fulfilled by a submission and it is currently transfering the rewards.";

      default:
        return 'The bounty will receive funds shortly.';
    }
  };

  const calculateIcon = () => {
    if (bounty.state === BountyState.Closed) return 'lock';
    else if (bounty.state === BountyState.Open) return 'travel_explore';
    else if (bounty.state === BountyState.PaymentNeeded) return 'price_check';
    else if (bounty.state === BountyState.WaitingForFunds)
      return 'hourglass_empty';
    else return 'iocn';
  };

  return (
    <div className="flex gap-6 text-on-surface-unactive">
      <div className="flex gap-1 items-center  relative group cursor-default">
        <Icon icon={calculateIcon()} />
        <span>{bounty.state}</span>
        <MoreInfo content={stateInfo()} />
      </div>
      <div className="flex gap-1 items-center  relative group cursor-default">
        <Icon icon="timer" />
        <span>
          {bounty.closesAt
            ? `${GetDateInString(bounty.closesAt, false)}`
            : 'Never'}
        </span>
        {bounty.closesAt && (
          <MoreInfo
            content={` The bounty will stop accepting submissions in 
        ${GetDateInString(bounty.closesAt, true)}.`}
          />
        )}
        {!bounty.closesAt && (
          <MoreInfo
            content={` The bounty will continuously accept new submissions until one fulfill its requirements.`}
          />
        )}
      </div>
    </div>
  );
}
