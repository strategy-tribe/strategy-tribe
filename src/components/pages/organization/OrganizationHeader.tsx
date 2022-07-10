import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon from '@/components/utils/Icon';
import { useAuth } from 'auth/AuthContext';
import React, { useState } from 'react';
import { Section } from '../landing/Section';
import { useOrganizationContext } from './OrganizationContext';

export function OrganizationHeader() {
  const { org } = useOrganizationContext();

  const { userId } = useAuth();

  const [fullDescription, setFullDescription] = useState(false);

  return (
    <Section className="w-full bg-darker rounded-lg text-text px-6 py-6 space-y-6 flex flex-col whitespace-pre-line">
      {/* Header */}
      <div className="laptop:flex justify-between space-y-5 laptop:space-y-0">
        <div className="space-y-2 laptop:space-y-0">
          <h1 className="h5 laptop:h4">{org?.name}</h1>
          <div className="flex gap-2 text-unactive">
            <Icon icon="pin_drop" />
            <span>{org?.countries}</span>
          </div>
        </div>
        <SubToOrgButton
          userId={userId}
          orgName={org?.name}
          useLabel
          containerClass="hidden laptop:flex"
        />
      </div>

      {/* Bio */}
      {org?.bio && (
        <>
          <p className={`${!fullDescription && 'line-clamp-4'}`}>{org.bio}</p>
          <div className="w-fit">
            {org?.bio && (
              <Button
                info={{
                  label: fullDescription ? 'Less' : 'Read more',
                  onClick: () => setFullDescription(!fullDescription),
                  style: ButtonStyle.TextPurple,
                  icon: fullDescription ? 'unfold_less' : 'unfold_more',
                  removePadding: true,
                  align: 'justify-start',
                }}
              />
            )}
          </div>
        </>
      )}

      {/* Tags */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 flex-wrap items-center">
          {org?.tags &&
            org.tags.map((tag, i) => {
              return (
                <div className="label text-unactive" key={i}>
                  <span>{tag}</span>
                </div>
              );
            })}
        </div>

        <SubToOrgButton
          userId={userId}
          orgName={org?.name}
          useLabel
          containerClass="laptop:hidden"
        />
      </div>
    </Section>
  );
}
