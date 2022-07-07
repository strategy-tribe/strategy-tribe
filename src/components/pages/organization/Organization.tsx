import { OrganizationStats } from './OrganizationStats';
import { OrganizationHeader } from './OrganizationHeader';
import { DonationPopUp } from '@/components/donations/DonationPopUp';
import { Organization as OrganizationData } from '@/lib/models/organizations/organization';
import { useState } from 'react';
import { OrganizationContextProvider } from './OrganizationContext';
import { OrganizationBounties } from './OrganizationBounties';

export const Organization = ({ org }: { org: OrganizationData }) => {
  //*UI
  const [showDonation, setShowDonation] = useState(false);

  //*CTA

  return (
    <OrganizationContextProvider org={org}>
      <div className="bg-black text-text flex flex-col gap-12 pb-16 min-h-screen">
        <OrganizationHeader />
        <OrganizationStats showDonations={() => setShowDonation(true)} />
        <OrganizationBounties />
      </div>

      {/* Donation pop up */}
      {org && (
        <DonationPopUp
          show={showDonation}
          hide={() => setShowDonation(false)}
          recipient={org}
          title={`Support bounties on ${org.name}`}
          description={`Bigger rewards mean more eyes and more OSINT hunters.\n\nBy donating to this bounty you're directly contributing to all bounties related to the ${org.name}.\n\nAll funds donated will be equally distributed across all bounties related to this organization.`}
        />
      )}
    </OrganizationContextProvider>
  );
};
