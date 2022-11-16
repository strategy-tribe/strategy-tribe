import { BountyState } from '@prisma/client';

import { GetDateInString } from '@/lib/utils/DateHelpers';

import Icon from '@/components/utils/Icon';
import { MoreInfo } from '@/components/utils/MoreInfo';

export default function BountyStatusShowcase({
  status,
  closesAt,
}: {
  status: BountyState;
  closesAt: Date;
}) {
  // const ETHERSCAN_LINK = process.env.NEXT_PUBLIC_ETHERSCAN_URL;

  const stateInfo = () => {
    switch (status) {
      case 'Open':
        return 'All findings being submitted will be taken into consideration until one matches the requirements.';

      case 'Closed':
        return 'The bounty has closed and is not accepting any submissions.';

      default:
        return 'The bounty will receive funds shortly.';
    }
  };

  const calculateIcon = () => {
    if (status === 'Closed') return 'lock';
    else if (status === 'Open') return 'travel_explore';
    else if (status === 'WaitingForFunds') return 'hourglass_empty';
    else return 'icon';
  };

  return (
    <div className="flex gap-6 text-on-surface-unactive">
      <div className="group relative flex  cursor-default items-center gap-1">
        <Icon icon={calculateIcon()} />
        <span>{status}</span>
        <MoreInfo content={stateInfo()} />
      </div>
      <div className="group relative flex  cursor-default items-center gap-1">
        <Icon icon="timer" />
        <span>
          {closesAt ? `${GetDateInString(closesAt, false)}` : 'Never'}
        </span>
        {closesAt && (
          <MoreInfo
            content={` The bounty will stop accepting submissions in 
        ${GetDateInString(closesAt, true)}.`}
          />
        )}
        {!closesAt && (
          <MoreInfo
            content={` The bounty will continuously accept new submissions until one fulfill its requirements.`}
          />
        )}
      </div>
    </div>
  );
}
