import { Wallet } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useGetOrganization } from '@/lib/hooks/organizationHooks';
import { useCanUserSubmit } from '@/lib/hooks/submission';
import { ParseBountyTitle } from '@/lib/utils/BountyHelpers';
import { GoToBeforeNewSubmissionPage, GoToOrgPage } from '@/lib/utils/Routes';

import { DonationPopUp } from '@/components/donations/DonationPopUp';
import { useBountyContext } from '@/components/pages/bounty/BountyContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import FromOrganization from '@/components/utils/FromOrganization';
import Icon, { IconSize } from '@/components/utils/Icon';
import { Stat } from '@/components/utils/Stat';

import { useAuth } from '@/auth/AuthContext';

import BountyStatusShowcase from './BountyStatusShowcase';
import { Section } from '../landing/Section';

export function BountyHeader() {
  const { bounty } = useBountyContext();

  const ETHERSCAN_LINK = process.env.NEXT_PUBLIC_ETHERSCAN_URL;
  const { organization } = useGetOrganization(
    {
      name: bounty?.target?.org?.name ?? '',
    },
    { enabled: !!bounty?.target?.org?.name }
  );
  const [showDonation, setShowDonation] = useState(false);

  const parsedTitle = ParseBountyTitle(bounty);

  return (
    <>
      <header className="space-y-14 border-b-2 border-main py-14">
        <Section>
          <div className="flex flex-wrap gap-x-6 tablet:gap-6">
            {organization && (
              <Button
                info={{
                  style: ButtonStyle.TextPurple,
                  removeMinWidth: true,
                  removePadding: true,
                  label: organization.name,
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

          <div className="justify-between gap-10 tablet:flex">
            <div>
              <h1 className="laptop:h2 h3">{parsedTitle}</h1>
              <h2 className="body-lg my-4 max-w-2xl">
                Bounties are curated at the discretion of Strategy Tribe to only
                include entities, individuals or groups currently under{' '}
                <a
                  className="underline hover:text-main-light"
                  href="https://www.gov.uk/government/publications/the-uk-sanctions-list"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sanction
                </a>{' '}
                or to aid in the progress of public safety and good.
              </h2>
            </div>

            <div className="flex shrink-0 flex-col justify-start gap-4 tablet:items-end">
              <a
                href={`${ETHERSCAN_LINK}${bounty.wallet?.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-4 text-main-light hover:text-main"
              >
                <Icon icon="emoji_events" size={IconSize.Large} />
                <span className="h4 font-medium">
                  {bounty.wallet?.balance} MATIC
                </span>
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
          </div>

          <div className="pt-4">
            <BountyStatusShowcase
              closesAt={bounty.closesAt}
              status={bounty.status}
            />
          </div>
        </Section>

        {/* Details */}
        <Section className="space-y-8">
          <Stat title="target" content={bounty?.target?.name} />
          <Stat
            title="requirements"
            contents={bounty.requirements
              ?.filter((r) => !r.optional)
              ?.map((r) => r.title)}
          />
          {organization ? (
            <FromOrganization orgName={organization?.name} />
          ) : (
            <div className="h-9 w-60 animate-pulse rounded bg-surface-dark" />
          )}
        </Section>

        {/* CTAs */}
        <Section className="flex justify-end gap-6">
          <div className="flex flex-col items-end gap-2">
            <SubmitButtonWithMessages />
          </div>
        </Section>
      </header>
      <DonationPopUp
        show={showDonation}
        hide={() => setShowDonation(false)}
        recipient={{ wallet: bounty.wallet! as Wallet }}
        description={`Bigger rewards mean more eyes and more OSINT hunters.\nBy donating to this bounty you're directly contributing to bringing this bounty to fruition.\n\nAll donations go directly to the hunter who fulfills the bounty requirements.`}
      />
    </>
  );
}

function SubmitButtonWithMessages() {
  const router = useRouter();
  const { bounty } = useBountyContext();

  const { userId, isFetchingUserInfo } = useAuth();

  const { canSubmit, spacesLeft, isLoading } = useCanUserSubmit(bounty.slug);

  const isOpen =
    bounty.status === 'WaitingForFunds' || bounty.status === 'Open';

  if (isLoading || isFetchingUserInfo)
    return (
      <div className="h-[72px] w-[220px] animate-pulse rounded bg-surface-dark" />
    );

  return (
    <>
      <Button
        info={{
          style: ButtonStyle.Filled,
          label: 'Start new submission',
          icon: 'arrow_forward',
          disabled: !canSubmit,
          onClick: () => router.push(GoToBeforeNewSubmissionPage(bounty.slug)),
        }}
      />
      <div className="label pt-1 pr-2 text-right">
        {isOpen ? (
          <>
            {(spacesLeft ?? 0) > 0 && (
              <span>Submissions left today: {spacesLeft}</span>
            )}

            {!canSubmit && userId && (
              <span className="whitespace-pre-wrap text-error-light">
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
            <span className="whitespace-pre-wrap text-error-light">
              This bounty is closed
            </span>
          </>
        )}
      </div>
    </>
  );
}
