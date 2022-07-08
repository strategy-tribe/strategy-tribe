import { Button, ButtonStyle } from '@/components/utils/Button';
import { TargetType } from '@/lib/models/targetType';
import React from 'react';
import { Section } from '../landing/Section';
import { useOrganizationContext } from './OrganizationContext';
import { BountiesLists } from './BountiesLists';

export function OrganizationBounties() {
  const {
    orgBounties,
    isLoadingBounties,
    amountOfBounties,
    goToMoreBounties,
    viewing,
    setViewing,
  } = useOrganizationContext();

  return (
    <Section className="laptop:pl-4 w-full max-w-4xl laptop:max-w-5xl mx-auto space-y-8">
      {/* Navigation */}
      <div className="flex gap-8">
        {Object.keys(TargetType).map((v, i) => {
          const isActive = v === viewing;
          return (
            <button
              key={i}
              className={`label-lg space-y-2 ${
                isActive ? 'text-text' : 'text-disabled hover:text-unactive'
              }`}
              onClick={() => setViewing(v as TargetType)}
            >
              <span>Target: {v}</span>
              <div
                className={`h-1 w-10 ${
                  isActive ? 'bg-purpleDark' : 'bg-black'
                }`}
              ></div>
            </button>
          );
        })}
      </div>

      {/* Bounties */}
      <BountiesLists
        bounties={orgBounties || []}
        isLoading={isLoadingBounties}
      />

      {orgBounties && !!orgBounties.length && (
        <Button
          info={{
            style: ButtonStyle.Text,
            label:
              (amountOfBounties || orgBounties.length) - orgBounties.length > 0
                ? `${amountOfBounties! - orgBounties.length} more`
                : 'More',
            removeMinWidth: true,
            removePadding: true,
            icon: 'arrow_forward',
            onClick: goToMoreBounties,
            disabled: orgBounties.length === 0,
          }}
        />
      )}
    </Section>
  );
}
