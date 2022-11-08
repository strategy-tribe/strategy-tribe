import { Bounty } from '@prisma/client';

import Icon from '@/components/utils/Icon';
import { MoreInfo } from '@/components/utils/MoreInfo';

import { GetDateInString } from '@/utils/DateHelpers';

export default function BountyStates({ bounty }: { bounty: Bounty }) {
  // const ETHERSCAN_LINK = process.env.NEXT_PUBLIC_ETHERSCAN_URL;

  const stateInfo = () => {
    switch (bounty.status) {
      case 'Open':
        return 'All findings being submitted will be taken into consideration until one matches the requirements.';

      case 'Closed':
        return 'The bounty has closed and is not accepting any submissions.';

      case 'PaymentNeeded':
        return "The bounty's requirements have been fulfilled by a submission and it is currently transfering the rewards.";

      default:
        return 'The bounty will receive funds shortly.';
    }
  };

  const calculateIcon = () => {
    if (bounty.status === 'Closed') return 'lock';
    else if (bounty.status === 'Open') return 'travel_explore';
    else if (bounty.status === 'PaymentNeeded') return 'price_check';
    else if (bounty.status === 'WaitingForFunds') return 'hourglass_empty';
    else return 'icon';
  };

  return (
    <div className="flex gap-6 text-on-surface-unactive">
      <div className="group relative flex  cursor-default items-center gap-1">
        <Icon icon={calculateIcon()} />
        <span>{bounty.status}</span>
        <MoreInfo content={stateInfo()} />
      </div>
      <div className="group relative flex  cursor-default items-center gap-1">
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
