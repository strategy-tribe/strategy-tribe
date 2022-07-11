import { useEffect, useState } from 'react';
import { useNotification } from '../notifications/NotificationContext';
import { BountyRequirementsShowcase } from './BountyRequirementsShowcase';
import { useGetOrganizationByName } from '@/hooks/organizationHooks';
import FromOrganization from './FromOrganization';
import BountyStates from '../pages/bounty/BountyStates';
import { Bounty } from '@/lib/models/bounty';
import { DonationPopUp } from '../donations/DonationPopUp';
import { Button, ButtonStyle } from './Button';
import { Stat } from '../pages/submission/Stat';
import { useBountyContext } from '../pages/bounty/BountyContext';

export function BountyDetails() {
  const { bounty } = useBountyContext();

  const { sectionInView } = useBountyContext();
  const hidden = sectionInView !== 'details';

  const { organization } = useGetOrganizationByName(
    bounty?.organizationName as string,
    Boolean(bounty?.organizationName as string)
  );

  const [copied, setCopied] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    if (copied) {
      notify({ title: 'Copied', content: bounty?.wallet as string });
      setCopied(false);
    }
  }, [copied]);

  return (
    <>
      <div
        className={`${
          hidden ? 'laptop:hidden' : ''
        } space-y-8 max-w-6xl laptop:pb-16 px-2`}
      >
        {/* header */}
        <BountyDetails_Header bounty={bounty} />

        {/* Details */}
        <div className="flex flex-col laptop:grid laptop:grid-cols-4 gap-8">
          {/* Target details */}
          <div className="col-span-2 space-y-8">
            <Stat title="Target" content={bounty.name} copyable={true} />

            <FromOrganization orgName={organization?.name as string} />

            <Stat
              title="More details"
              content={!!bounty.description ? bounty.description : 'None'}
            />
          </div>

          {/* Requirements */}
          <BountyRequirementsShowcase bounty={bounty} />

          {/* Bounty info */}
          <div className="space-y-8">
            <Stat
              title="Bounty ID"
              content={`${bounty.id as string}`}
              copyable={true}
              copyThis={bounty.id as string}
            />
            <Stat
              title="Funds address"
              content={`${bounty.wallet?.slice(0, 24)}...`}
              copyThis={bounty.wallet || ''}
              copyable={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function BountyDetails_Header({ bounty }: { bounty: Bounty }) {
  //*Donation
  const [showDonation, setShowDonation] = useState(false);

  return (
    <>
      <div
        className={`
      bg-black text-text
      border-2 border-purpleDark rounded-xl
      px-4 pb-6 pt-5
      flex flex-col space-y-6
      max-w-lg`}
      >
        <Button
          info={{
            label: 'Support this bounty',
            style: ButtonStyle.Text,
            icon: 'toll',
            onClick: () => setShowDonation(true),
            className: 'w-fit',
            removeMinWidth: true,
            removePadding: true,
          }}
        />
        <div className="space-y-3">
          {/* Title */}
          <h1 className="h5 laptop:h4">{bounty?.title}</h1>

          {/* Stats */}
          <div className="flex gap-x-8 laptop:gap-x-8 gap-y-2 flex-wrap">
            <BountyStates bounty={bounty} />
          </div>
        </div>
      </div>

      <DonationPopUp
        show={showDonation}
        hide={() => setShowDonation(false)}
        recipient={bounty}
        description={`Bigger rewards mean more eyes and more OSINT hunters.\nBy donating to this bounty you're directly contributing to bringing this bounty to fruition.\n\nAll donations go directly to the hunter who fulfills the bounty requirements.`}
      />
    </>
  );
}
