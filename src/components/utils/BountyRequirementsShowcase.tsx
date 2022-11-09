import { Requirement, RequirementType } from '@prisma/client';
import { useEffect, useState } from 'react';

import { GetWordCount } from '@/lib/utils/StringHelpers';

import { FullBounty } from '@/server/routes/bounties/getBounty';

import Icon from './Icon';
import { MessageForUser } from './MessageForUser';
import { Stat } from './Stat';

export function BountyRequirementsShowcase({
  bounty,
}: {
  bounty: FullBounty;
  size?: string;
}) {
  const requeriedConditions = bounty.requirements?.filter((f) => !f.optional);
  const optionalConditions = bounty?.requirements?.filter((f) => f.optional);

  return (
    <div className="space-y-8">
      <Stat
        title="Requirements"
        contents={requeriedConditions?.map((f) => f.title)}
        content={requeriedConditions?.length ? undefined : 'None'}
      />
      <Stat
        title="Optional"
        contents={optionalConditions?.map((f) => f.title)}
        content={optionalConditions?.length ? undefined : 'None'}
      />
      <MessageForUser
        text="More evidence and better reports increase the chances of your submission
        being approved."
      />
    </div>
  );
}

export function BountyRequirementsChecker({
  requirements,
  checks,
  setChecks,
  content,
  files,
}: {
  requirements: Requirement[];
  size?: string;
  checks: Check[];
  setChecks: (s: Check[]) => void;
  //
  content: string;
  files: File[];
}) {
  const requeriedConditions = requirements?.filter((f) => !f.optional);
  const optionalConditions = requirements.filter((f) => f.optional);

  function ManageNewValue(requirement: Requirement, passed: boolean) {
    const newChecks = checks.filter(
      (check) => check.requirement !== requirement
    );
    newChecks.push({ requirement, passed });
    setChecks(newChecks);
  }

  return (
    <>
      <div>
        <h3 className="font-grotesk font-semibold text-on-surface-p0">
          Requirements
        </h3>
        {requeriedConditions.map((requirement, i) => {
          return (
            <RequirementChecker
              key={i}
              requirement={requirement}
              content={content}
              files={files}
              setPassed={(passed) => ManageNewValue(requirement, passed)}
              //
            />
          );
        })}
      </div>
      {optionalConditions.length > 0 && (
        <div>
          <h3 className="font-grotesk font-semibold text-on-surface-p0">
            Optional
          </h3>
          {optionalConditions.map((requirement, i) => {
            return (
              <RequirementChecker
                key={i}
                requirement={requirement}
                content={content}
                files={files}
                setPassed={(passed) => ManageNewValue(requirement, passed)}
                //
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export type Check = {
  requirement: Requirement;
  passed: boolean;
};

function RequirementChecker({
  requirement,
  content,
  files,
  size = 'text-base',
  setPassed,
}: {
  requirement: Requirement;
  setPassed: (val: boolean) => void;
  content: string;
  files: File[];
  size?: string;
}) {
  const { title, type, optional } = requirement;
  const [_passed, _setPassed] = useState<boolean>(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPassed(_passed);
  }, [_passed, setPassed]);

  useEffect(() => {
    switch (type) {
      case RequirementType.EMAIL:
        _setPassed(optional ? true : content.includes('@'));
        setMessage('Your input must contain an email address.');
        break;
      case RequirementType.IMAGE:
        _setPassed(optional ? true : files.length > 0);
        setMessage('You must attach at least one image.');
        break;
      case RequirementType.REPORT: {
        const wordCount = GetWordCount(content);
        _setPassed(optional ? true : wordCount > 200);
        setMessage('Your input must be longer than 200 words');
        break;
      }
      case RequirementType.DOMAIN:
        _setPassed(
          optional
            ? true
            : content.includes('http://') || content.includes('https://')
        );
        setMessage('Your input must be http link');
        break;
      case RequirementType.WALLET:
        _setPassed(optional ? true : content.length > 12);
        setMessage('Your input must contain a wallet address');
        break;
      default:
        throw 'Unknown type ';
    }
  }, [content, files, optional, type]);

  return (
    <div className="label-lg group flex min-w-[10rem] -translate-x-10 cursor-default items-center gap-4">
      {/* Icon */}
      <Icon
        className={`text-error-light ${!!_passed && 'invisible'} `}
        icon="close"
      />

      {/* Text */}
      <p className={`${!_passed && ''} ${size}`}>
        <span className={`${!_passed && 'group-hover:hidden'}`}>{title}</span>
        <span
          className={`hidden text-error-light ${
            !_passed && 'group-hover:inline '
          }`}
        >
          {message}
        </span>
      </p>
    </div>
  );
}
