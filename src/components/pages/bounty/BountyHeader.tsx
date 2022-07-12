import { Button, ButtonStyle } from '@/components/utils/Button';
import { useCanUserSubmit } from '@/lib/hooks/submissionHooks';
import { GoToBeforeNewSubmissionPage, GoToOrgPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { useState } from 'react';
import { useGetOrganizationByName } from '@/lib/hooks/organizationHooks';
import BountyStates from '@/components/pages/bounty/BountyStates';
import { Stat } from '../submission/Stat';
import FromOrganization from '@/components/utils/FromOrganization';
import { Section } from '../landing/Section';
import Icon, { IconSize } from '@/components/utils/Icon';
import { DonationPopUp } from '@/components/donations/DonationPopUp';
import { useBountyContext } from './BountyContext';
import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';
import { useRouter } from 'next/router';

export function BountyHeader() {
  const { bounty } = useBountyContext();

  const ETHERSCAN_LINK = process.env.NEXT_PUBLIC_ETHERSCAN_URL;
  const { organization } = useGetOrganizationByName(
    bounty?.organizationName as string,
    Boolean(bounty?.organizationName as string)
  );
  const [showDonation, setShowDonation] = useState(false);

  const { isStaff } = useAuth();

  const parsedTitle = bounty.title.replace(
    bounty.organizationName.toLocaleLowerCase(),
    CapitalizeFirstLetter(bounty.organizationName)
  );

  return (
    <>
      <header className="border-y-2 border-purpleDark py-14 space-y-14">
        <Section className="flex justify-between gap-6">
          {/* Left side */}
          <div>
            <div className="flex gap-6">
              {organization && (
                <Button
                  info={{
                    style: ButtonStyle.TextPurple,
                    removeMinWidth: true,
                    removePadding: true,
                    label: bounty.organizationName,
                    labelClasses: 'capitalize',
                    isALink: GoToOrgPage(organization?.id as string),
                  }}
                />
              )}
              {bounty.tags?.map((tag, i) => {
                return (
                  <Button
                    info={{
                      style: ButtonStyle.TextPurple,
                      removeMinWidth: true,
                      removePadding: true,
                      label: tag,
                      labelClasses: 'capitalize',
                    }}
                  />
                );
              })}
            </div>
            <h1 className="h4">{parsedTitle}</h1>
            <div className="pt-4">
              <BountyStates bounty={bounty} />
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-4 items-end">
            <a
              href={ETHERSCAN_LINK + bounty.wallet}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-purpleLight hover:text-purpleDark cursor-pointer"
            >
              <Icon icon="emoji_events" size={IconSize.Large} />
              <span className="title">{bounty.funds} ETH</span>
            </a>
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
          </div>
        </Section>

        {/* Details */}
        <Section className="space-y-8">
          <Stat title="target" content={bounty.name} />
          <Stat
            title="requirements"
            contents={bounty.requirements
              .filter((r) => !r.optional)
              .map((r) => r.title)}
          />
          <FromOrganization orgName={organization?.name as string} />
        </Section>

        {/* CTAs */}
        <Section className="flex justify-between gap-6">
          <Button
            info={{
              style: ButtonStyle.Text,
              label: 'Watch this bounty',
              icon: 'visibility',
              removePadding: true,
            }}
          />

          {!isStaff && (
            <div className="flex flex-col items-end gap-2">
              <SubmitButton />
              {/* warning messages */}
              <SubmitMessages />
            </div>
          )}
        </Section>
      </header>
      <DonationPopUp
        show={showDonation}
        hide={() => setShowDonation(false)}
        recipient={bounty}
        description={`Bigger rewards mean more eyes and more OSINT hunters.\nBy donating to this bounty you're directly contributing to bringing this bounty to fruition.\n\nAll donations go directly to the hunter who fulfills the bounty requirements.`}
      />
    </>
  );
}

function SubmitMessages() {
  const { bounty } = useBountyContext();

  const { userId } = useAuth();

  const { canSubmit } = useCanUserSubmit(
    userId as string,
    bounty?.id as string,
    Boolean(userId as string) && Boolean(bounty?.id)
  );

  return (
    <div className="pr-2">
      {!canSubmit && userId && (
        <span className="text-redLight">
          You need to wait 24 hours between submissions
        </span>
      )}

      {!userId && (
        <span className="text-redLight">Log in to joint the hunt</span>
      )}
    </div>
  );
}

function SubmitButton() {
  const router = useRouter();

  const { bounty } = useBountyContext();

  const { userId } = useAuth();

  const { canSubmit } = useCanUserSubmit(
    userId as string,
    bounty?.id as string,
    Boolean(userId as string) && Boolean(bounty?.id)
  );

  return (
    <Button
      info={{
        style: ButtonStyle.Filled,
        label: 'Start new submission',
        icon: 'arrow_forward',
        disabled: !canSubmit,
        onClick: () => router.push(GoToBeforeNewSubmissionPage(bounty.id!)),
      }}
    />
  );
}
