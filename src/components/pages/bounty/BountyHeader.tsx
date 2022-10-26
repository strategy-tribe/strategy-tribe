import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useGetOrganizationByName } from '@/lib/hooks/organizationHooks';
import { useCanUserSubmit } from '@/lib/hooks/submissionHooks';
import { ParseBountyTitle } from '@/lib/utils/BountyHelpers';
import { GoToBeforeNewSubmissionPage, GoToOrgPage } from '@/lib/utils/Routes';

import { useBountyContext } from '@/components/pages/bounty/BountyContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import FromOrganization from '@/components/utils/FromOrganization';
import { Stat } from '@/components/utils/Stat';

import { Section } from '../landing/Section';
import BountyStates from './BountyStates';

export function BountyHeader() {
  const { bounty } = useBountyContext();

  const ETHERSCAN_LINK = process.env.NEXT_PUBLIC_ETHERSCAN_URL;
  const { organization } = useGetOrganizationByName(
    bounty?.target.org.name as string,
    Boolean(bounty?.target.org.name as string)
  );
  const [showDonation, setShowDonation] = useState(false);

  const { isStaff, isFetchingUserInfo } = useAuth();

  const parsedTitle = ParseBountyTitle(bounty);

  return (
    <>
      <header className="border-y-2 border-main py-14 space-y-14">
        <Section>
          <div className="flex gap-6">
            {organization && (
              <Button
                info={{
                  style: ButtonStyle.TextPurple,
                  removeMinWidth: true,
                  removePadding: true,
                  label: bounty.target.org.name,
                  labelClasses: 'capitalize',
                  isALink: GoToOrgPage(organization?.name as string),
                }}
              />
            )}
            {bounty.tags?.map((tag, i) => {
              return (
                <Button
                  key={i}
                  info={{
                    style: ButtonStyle.TextPurple,
                    removeMinWidth: true,
                    removePadding: true,
                    label: tag.name,
                    labelClasses: 'capitalize',
                  }}
                />
              );
            })}
          </div>

          <div className="flex justify-between gap-10">
            <h1 className="laptop:h2 h3">{parsedTitle}</h1>

            <div className=" flex flex-col gap-4 items-end justify-start shrink-0">
              {/* <a
                href={ETHERSCAN_LINK + bounty.wallet.address}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 items-center text-main-light hover:text-main cursor-pointer"
              >
                <Icon icon="emoji_events" size={IconSize.Large} />
                <span className="h4 font-medium">
                  {bounty.wallet.balance} MATIC
                </span>
              </a> */}
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
          </div>

          <div className="pt-4">
            <BountyStates bounty={bounty} />
          </div>
        </Section>

        {/* Details */}
        <Section className="space-y-8">
          <Stat title="target" content={bounty.target.name} />
          <Stat
            title="requirements"
            contents={bounty.requirements
              .filter((r) => !r.optional)
              .map((r) => r.title)}
          />
          <FromOrganization orgName={organization?.name as string} />
        </Section>

        {/* CTAs */}
        <Section className="flex justify-end gap-6">
          {!isStaff && !isFetchingUserInfo && (
            <div className="flex flex-col items-end gap-2">
              <SubmitButton />
              <SubmitMessages />
            </div>
          )}
        </Section>
      </header>
      {/* <DonationPopUp
        show={showDonation}
        hide={() => setShowDonation(false)}
        recipient={bounty}
        description={`Bigger rewards mean more eyes and more OSINT hunters.\nBy donating to this bounty you're directly contributing to bringing this bounty to fruition.\n\nAll donations go directly to the hunter who fulfills the bounty requirements.`}
      /> */}
    </>
  );
}

function SubmitMessages() {
  const { bounty } = useBountyContext();

  const { userId } = useAuth();

  // const { data } = useCanUserSubmit(
  //   userId as string,
  //   bounty?.id as string,
  //   Boolean(userId as string) && Boolean(bounty?.id)
  // );

  const canSubmit = false;
  const spacesLeft = 0;

  const isOpen =
    bounty.status === 'WaitingForFunds' || bounty.status === 'Open';

  return (
    <>
      <div className="pr-2 label text-right pt-1">
        {isOpen ? (
          <>
            {(spacesLeft ?? 0) > 0 && (
              <span>Submissions left today: {spacesLeft}</span>
            )}

            {!canSubmit && userId && (
              <span className="text-error-light whitespace-pre-wrap">
                {`You have used all your submissions for today.\nPlease wait 24 hours.`}
              </span>
            )}

            {!userId && (
              <span className="text-error-light">
                Connect your wallet to join the hunt
              </span>
            )}
          </>
        ) : (
          <>
            <span className="text-error-light whitespace-pre-wrap">
              This bounty is closed
            </span>
          </>
        )}
      </div>
    </>
  );
}

function SubmitButton() {
  const router = useRouter();

  const { bounty } = useBountyContext();

  const { userId } = useAuth();

  const { data } = useCanUserSubmit(
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
        disabled: true,
        onClick: () => router.push(GoToBeforeNewSubmissionPage(bounty.id)),
      }}
    />
  );
}
