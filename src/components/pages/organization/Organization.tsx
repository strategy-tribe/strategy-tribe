import { OrganizationStats } from './OrganizationStats';
import { OrganizationHeader } from './OrganizationHeader';
import { DonationPopUp } from '@/components/donations/DonationPopUp';
import Navbar from '@/components/navbar/Navbar';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';
import { Organization as OrganizationData } from '@/lib/models/organizations/organization';
import { useAuth } from 'auth/AuthContext';
import { useMemo, useState } from 'react';
import { OrganizationContextProvider } from './OrganizationContext';
import { OrganizationBounties } from './OrganizationBounties';

export const Organization = ({ org }: { org: OrganizationData }) => {
  //*Auth
  const { isAuthenticated, isStaff, LogIn } = useAuth();

  //*UI
  const [showDonation, setShowDonation] = useState(false);

  //*CTA
  const ctaButton: ButtonInformation | undefined = useMemo(() => {
    if (!isAuthenticated)
      return {
        label: 'Connect wallet',
        icon: 'loging',
        iconClasses: 'laptop:hidden',
        onClick: LogIn,
        style: ButtonStyle.Filled,
      };
  }, [isAuthenticated, isStaff]);

  return (
    <OrganizationContextProvider org={org}>
      <Navbar
        className="bg-black text-text flex flex-col gap-12 pb-16 min-h-screen"
        setUp={{
          useBackArrow: true,
          leftLabel: org ? org.name : 'Loading...',
          useOverflowMenu: !!isAuthenticated,
          rightButtonInfo: ctaButton ? [ctaButton] : undefined,
        }}
      >
        <OrganizationHeader />
        <OrganizationStats showDonations={() => setShowDonation(true)} />
        <OrganizationBounties />
      </Navbar>

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
