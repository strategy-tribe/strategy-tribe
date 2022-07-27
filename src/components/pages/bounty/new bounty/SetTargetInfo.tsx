import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon from '@/components/utils/Icon';
import Toggle from '@/components/utils/Toggle';
import { useGetAllOrganizations } from '@/hooks/organizationHooks';
import { Organization } from '@/lib/models/organizations/organization';
import { TargetType } from '@/lib/models/targetType';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Title } from '@/components/utils/Title';
('../../utils/Title');

interface iTargetInfo {
  name: string;
  setName: (s: string) => void;
  organization: string;
  setOrganization: (s: string) => void;
  content: string;
  setContent: (s: string) => void;
  targetType: TargetType;
  setTargetType: (s: TargetType) => void;
}

export const SetTargetInfo = ({
  name,
  setName,
  organization,
  setOrganization,
  content,
  setContent,
  targetType,
  setTargetType,
}: iTargetInfo) => {
  const { organizations } = useGetAllOrganizations();

  return (
    <div className="space-y-16 text-on-surface-p1">
      {/* Header */}
      <div className="space-y-4">
        <Title title="Describe the target" pos={2} />

        {/* Checks */}
        <div className="space-y-4">
          <h4 className="text-on-surface-p0 font-grotesk text-sm font-medium">
            Requirements
          </h4>
          {targetType === TargetType.Individual && (
            <>
              <div className="flex items-center gap-2">
                <Icon icon={name ? 'check' : 'close'} />
                <span
                  className={` text-sm font-medium w-fit ${
                    name ? 'text-on-surface-unactive' : 'text-error-light'
                  }`}
                >
                  {`Target's Name`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={organization ? 'check' : 'close'} />

                <span
                  className={` text-sm font-medium w-fit ${
                    organization
                      ? 'text-on-surface-unactive'
                      : 'text-error-light'
                  }`}
                >
                  {`Target's Affiliation`}
                </span>
              </div>
            </>
          )}
          {targetType === TargetType.Organization && (
            <>
              <div className="flex items-center gap-2">
                <Icon icon={organization ? 'check' : 'close'} />
                <span
                  className={` text-sm font-medium w-fit ${
                    organization
                      ? 'text-on-surface-unactive'
                      : 'text-error-light'
                  }`}
                >
                  {`Organization's Name`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={name ? 'check' : 'close'} />
                <span
                  className={` text-sm font-medium w-fit ${
                    name ? 'text-on-surface-unactive' : 'text-error-light'
                  }`}
                >
                  Target information
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="w-full h-0.5 text-surface" />

      <div className="space-y-16">
        <Toggle
          whenOn="The target is an individual"
          whenOff="The target is an organization"
          value={targetType === TargetType.Individual}
          setValue={() => {
            if (targetType === TargetType.Individual)
              setTargetType(TargetType.Organization);
            else setTargetType(TargetType.Individual);
          }}
        />
        {targetType === TargetType.Individual && (
          <IndividualTarget
            name={name}
            affiliation={organization}
            setName={setName}
            setAffiliation={setOrganization}
            content={content}
            setContent={setContent}
            existingOrganizations={organizations}
          />
        )}
        {targetType === TargetType.Organization && (
          <OrganizationTarget
            name={name}
            affiliation={organization}
            setName={setName}
            setAffiliation={setOrganization}
            content={content}
            setContent={setContent}
            existingOrganizations={organizations}
          />
        )}
      </div>
    </div>
  );
};

function IndividualTarget({
  name,
  affiliation,
  setName,
  existingOrganizations,
  setAffiliation,
  content,
  setContent,
}: {
  name: string;
  setName: (s: string) => void;
  affiliation: string;
  setAffiliation: (s: string) => void;
  content: string;
  setContent: (s: string) => void;
  existingOrganizations?: Organization[];
}) {
  const [createNewOrg, setCreateNewOrg] = useState(false);

  return (
    <>
      {/* target name */}
      <div className="space-y-6">
        <h2 className="text-on-surface-p1 text-xl font-semibold">
          {`Target's Name`}
        </h2>
        {/* target description */}
        <TextareaAutosize
          placeholder="Type here"
          className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 capitalize whitespace-pre-wrap"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      {/* target affiliation */}
      <div className="space-y-6">
        <h2 className="text-on-surface-p1 text-xl font-semibold">
          {`Target's Affiliation`}
        </h2>

        {existingOrganizations && !createNewOrg && (
          <select
            name="type"
            id="type"
            className="bg-bg border-0 p-0 pb-2 pt-2 border-b-2 border-on-surface-disabled focus:ring-0 focus:border-main shrink-0 grow max-w-[30rem] w-1/2"
            value={affiliation}
            onChange={(e) => {
              const value = e.target.value;
              setAffiliation(value);
            }}
          >
            {existingOrganizations.map((o, i) => {
              return (
                <option key={i} value={o.name}>
                  {o.name} ({o.bounties})
                </option>
              );
            })}
          </select>
        )}

        {createNewOrg && (
          <TextareaAutosize
            placeholder="Type here"
            className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 first-letter:capitalize whitespace-pre-wrap"
            value={affiliation}
            onChange={(e) => {
              setAffiliation(e.target.value);
            }}
          />
        )}

        <Button
          info={{
            label: createNewOrg
              ? 'Use existing one'
              : 'Create new organization',
            style: ButtonStyle.Text,
            icon: createNewOrg ? 'undo' : 'add',
            onClick: () => setCreateNewOrg(!createNewOrg),
            removePadding: true,
          }}
        />
      </div>
      {/* target description */}
      <div className="space-y-6 ">
        <h2 className="text-on-surface-p1 text-xl font-semibold">
          Extra information about the target
        </h2>

        <TextareaAutosize
          placeholder="Type here"
          className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 first-letter:capitalize whitespace-pre-wrap"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </>
  );
}

function OrganizationTarget({
  name,
  affiliation,
  setName,
  setAffiliation,
  content,
  setContent,
  existingOrganizations,
}: {
  name: string;
  setName: (s: string) => void;
  affiliation: string;
  setAffiliation: (s: string) => void;
  content: string;
  existingOrganizations?: Organization[];
  setContent: (s: string) => void;
}) {
  const [createNewOrg, setCreateNewOrg] = useState(false);
  return (
    <>
      {/* target affiliation */}
      <div className="space-y-6">
        <h2 className="text-on-surface-p1 text-xl font-semibold">
          {`Target's Affiliation`}
        </h2>

        {existingOrganizations && !createNewOrg && (
          <select
            name="type"
            id="type"
            className="bg-bg border-0 p-0 pb-2 pt-2 border-b-2 border-on-surface-disabled focus:ring-0 focus:border-main shrink-0 grow max-w-[30rem] w-1/2"
            value={affiliation}
            onChange={(e) => {
              const value = e.target.value;
              setAffiliation(value);
            }}
          >
            {existingOrganizations.map((o, i) => {
              return (
                <option key={i} value={o.name}>
                  {o.name} ({o.bounties})
                </option>
              );
            })}
          </select>
        )}

        {createNewOrg && (
          <TextareaAutosize
            placeholder="Type here"
            className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 first-letter:capitalize whitespace-pre-wrap"
            value={affiliation}
            onChange={(e) => {
              setAffiliation(e.target.value);
            }}
          />
        )}

        <Button
          info={{
            label: createNewOrg
              ? 'Use existing one'
              : 'Create new organization',
            style: ButtonStyle.Text,
            icon: createNewOrg ? 'undo' : 'add',
            onClick: () => setCreateNewOrg(!createNewOrg),
            removePadding: true,
          }}
        />
      </div>
      {/* target name */}
      <div className="space-y-6">
        <h2 className="text-on-surface-p1 text-xl font-semibold">
          {`Organization's intelligence we are looking for`}
        </h2>
        {/* target description */}
        <TextareaAutosize
          placeholder="Telegram account, wallet address, phone numbers..."
          className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 whitespace-pre-wrap"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      {/* target description */}
      <div className="space-y-6">
        <h2 className="text-on-surface-p1 text-xl font-semibold">
          Extra information
        </h2>

        <TextareaAutosize
          placeholder="Type here"
          className="bg-bg text-on-surface-p1 border-0 w-full font-inter  focus:ring-0 first-letter:capitalize whitespace-pre-wrap"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </>
  );
}
