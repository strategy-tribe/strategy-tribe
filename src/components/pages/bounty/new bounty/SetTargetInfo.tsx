import { TargetType } from '@prisma/client';
import { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { useGetAllOrganizations } from '@/lib/hooks/organizationHooks';
import { FullOrganization } from '@/lib/types';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon from '@/components/utils/Icon';
import { Title } from '@/components/utils/Title';
import Toggle from '@/components/utils/Toggle';

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
          <h4 className="font-grotesk text-sm font-medium text-on-surface-p0">
            Requirements
          </h4>
          {targetType === 'INDIVIDUAL' && (
            <>
              <div className="flex items-center gap-2">
                <Icon icon={name ? 'check' : 'close'} />
                <span
                  className={` w-fit text-sm font-medium ${
                    name ? 'text-on-surface-unactive' : 'text-error-light'
                  }`}
                >
                  {`Target's Name`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={organization ? 'check' : 'close'} />

                <span
                  className={` w-fit text-sm font-medium ${
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
          {targetType === 'ORG' && (
            <>
              <div className="flex items-center gap-2">
                <Icon icon={organization ? 'check' : 'close'} />
                <span
                  className={` w-fit text-sm font-medium ${
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
                  className={` w-fit text-sm font-medium ${
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

      <hr className="h-0.5 w-full text-surface" />

      <div className="space-y-16">
        <Toggle
          whenOn="The target is an individual"
          whenOff="The target is an organization"
          value={targetType === 'INDIVIDUAL'}
          setValue={() => {
            if (targetType === 'INDIVIDUAL') setTargetType('ORG');
            else setTargetType('INDIVIDUAL');
          }}
        />
        {targetType === 'INDIVIDUAL' && (
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
        {targetType === 'ORG' && (
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
  existingOrganizations?: FullOrganization[];
}) {
  const [createNewOrg, setCreateNewOrg] = useState(false);

  return (
    <>
      {/* target name */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-on-surface-p1">
          {`Target's Name`}
        </h2>
        {/* target description */}
        <ReactTextareaAutosize
          placeholder="Type here"
          className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  capitalize text-on-surface-p1 focus:ring-0"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      {/* target affiliation */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-on-surface-p1">
          {`Target's Affiliation`}
        </h2>

        {existingOrganizations && !createNewOrg && (
          <select
            name="type"
            id="type"
            className="w-1/2 max-w-[30rem] shrink-0 grow border-0 border-b-2 border-on-surface-disabled bg-bg p-0 pb-2 pt-2 focus:border-main focus:ring-0"
            value={affiliation}
            onChange={(e) => {
              const value = e.target.value;
              setAffiliation(value);
            }}
          >
            {existingOrganizations.map((org, i) => {
              return (
                <option key={i} value={org.name}>
                  {org.name} ({org?._count?.targets})
                </option>
              );
            })}
          </select>
        )}

        {createNewOrg && (
          <ReactTextareaAutosize
            placeholder="Type here"
            className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  text-on-surface-p1 first-letter:capitalize focus:ring-0"
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
        <h2 className="text-xl font-semibold text-on-surface-p1">
          Extra information about the target
        </h2>

        <ReactTextareaAutosize
          placeholder="Type here"
          className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  text-on-surface-p1 first-letter:capitalize focus:ring-0"
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
  existingOrganizations?: FullOrganization[];
  setContent: (s: string) => void;
}) {
  const [createNewOrg, setCreateNewOrg] = useState(false);
  return (
    <>
      {/* target affiliation */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-on-surface-p1">
          {`Target's Affiliation`}
        </h2>

        {existingOrganizations && !createNewOrg && (
          <select
            name="type"
            id="type"
            className="w-1/2 max-w-[30rem] shrink-0 grow border-0 border-b-2 border-on-surface-disabled bg-bg p-0 pb-2 pt-2 focus:border-main focus:ring-0"
            value={affiliation}
            onChange={(e) => {
              const value = e.target.value;
              setAffiliation(value);
            }}
          >
            {existingOrganizations.map((o, i) => {
              return (
                <option key={i} value={o.name}>
                  {o.name} ({o?._count?.targets})
                </option>
              );
            })}
          </select>
        )}

        {createNewOrg && (
          <ReactTextareaAutosize
            placeholder="Type here"
            className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  text-on-surface-p1 first-letter:capitalize focus:ring-0"
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
        <h2 className="text-xl font-semibold text-on-surface-p1">
          {`Organization's intelligence we are looking for`}
        </h2>
        {/* target description */}
        <ReactTextareaAutosize
          placeholder="Telegram account, wallet address, phone numbers..."
          className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  text-on-surface-p1 focus:ring-0"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      {/* target description */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-on-surface-p1">
          Extra information
        </h2>

        <ReactTextareaAutosize
          placeholder="Type here"
          className="w-full whitespace-pre-wrap border-0 bg-bg font-inter  text-on-surface-p1 first-letter:capitalize focus:ring-0"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
    </>
  );
}
