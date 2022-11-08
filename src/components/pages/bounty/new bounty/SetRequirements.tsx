import { Requirement, RequirementType } from '@prisma/client';
import { useEffect, useState } from 'react';
import Switch from 'react-switch';

import Icon from '@/components/utils/Icon';
import { Title } from '@/components/utils/Title';

interface iSetRequirements {
  requirements: Requirement[];
  setRequirements: (e: Requirement[]) => void;
}

export const SetRequirements = ({
  requirements,
  setRequirements,
}: iSetRequirements) => {
  return (
    <div className="space-y-16">
      <div className="space-y-1">
        <Title title="Bounty deliverables" pos={3} />
      </div>

      <div className="space-y-16">
        {requirements.map((r, index) => {
          return (
            <div className="space-y-16" key={index}>
              <div className="flex w-full gap-16">
                <RequirementInput num={index} requirement={r} />
                {requirements.length >= 2 && (
                  <button
                    className="group relative grid h-10 w-10 shrink-0 grow-0 place-items-center rounded-full bg-surface"
                    onClick={() => {
                      setRequirements(
                        requirements.filter((f, j) => j !== index)
                      );
                    }}
                    on-surface-disabled={requirements.length < 2}
                  >
                    <Icon
                      icon="remove"
                      className="group-hover:text-on-surface-p0"
                    />

                    <p className="label absolute min-w-[10rem] translate-x-24 opacity-0 group-hover:opacity-100">
                      Delete requirement
                    </p>
                  </button>
                )}
              </div>
              <hr className="w-full text-surface" />
            </div>
          );
        })}
      </div>

      <button
        className="group flex items-center gap-4 text-main-light "
        onClick={() => {
          setRequirements([
            ...requirements,
            { title: '', type: 'WALLET', id: '', optional: true, bountyId: '' },
          ]);
        }}
      >
        <Icon icon="add" />
        <span className="group-hover:underline">Add condition</span>
      </button>
    </div>
  );
};

function RequirementInput({
  num,
  requirement,
}: {
  num: number;
  requirement: Requirement;
}) {
  const [optional, setOptional] = useState(false);
  const [title, setTitle] = useState(requirement.title);
  const [type, setType] = useState(requirement.type);
  useEffect(() => {
    requirement.title = title;
    requirement.type = type;
    requirement.optional = optional;
  }, [title, type, optional, requirement]);

  return (
    <div className="min-w-[40rem] space-y-4">
      {/* Requirement num */}
      <h2 className="font-grotesk font-semibold text-on-surface-p0">
        Condition #{num + 1}
      </h2>

      {/* Title */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="label"
          className="label-lg flex min-w-[10rem] -translate-x-10 items-center gap-4"
        >
          <Icon
            icon="close"
            className={`text-error-light ${!!title && 'invisible'}`}
          />
          <span className={`${!title && 'text-error-light'}`}>Label</span>
        </label>
        <input
          type="text"
          name="label"
          id="label"
          placeholder="Wallet address, email address, url..."
          className="w-full border-0 border-b-2 border-on-surface-disabled bg-bg p-0 pb-2   pt-2 pr-0 text-on-surface-p0 ring-0 transition-all first-letter:capitalize  placeholder:text-on-surface-disabled focus:border-main focus:ring-0"
          value={title}
          onChange={(e) => {
            const value = e.target.value;
            setTitle(value);
          }}
        />
      </div>

      {/* Type */}
      <div className="flex items-center gap-4">
        <label htmlFor="type" className="label-lg min-w-[10rem]">
          Type
        </label>
        <select
          name="type"
          id="type"
          className="min-w-[14rem] shrink-0 grow-0 border-0 border-b-2 border-on-surface-disabled bg-bg p-0 pb-2 pt-2 focus:border-main focus:ring-0"
          value={type}
          onChange={(e) => {
            const value = e.target.value as RequirementType;
            setType(value);
          }}
        >
          <option value="EMAILS">EMAILS</option>
          <option value="WALLET">WALLET</option>
          <option value="DOMAIN">DOMAIN</option>
          <option value="IMAGE">IMAGE</option>
          <option value="REPORT">REPORT</option>
          <option value="PHONE_NUMBER">PHONE_NUMBER</option>
          <option value="SOCIAL_MEDIA_ACCOUNT">SOCIAL_MEDIA_ACCOUNT</option>
        </select>
      </div>

      {/* Required or optional */}
      <div className="flex items-center gap-4 pt-4">
        <label htmlFor="required" className="label-lg min-w-[10rem]">
          {optional ? 'Optional' : 'Required'}
        </label>
        <Switch
          onChange={() => {
            if (num !== 0) setOptional(!optional);
          }}
          on-surface-disabled={num === 0}
          checked={num === 0 ? false : !optional}
          onColor="#A29BFE"
          onHandleColor="#6C5CE7"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
        />

        {num === 0 && (
          <p className="label text-on-surface-unactive">
            Bounties must have at least one required deliverable.
          </p>
        )}
      </div>
    </div>
  );
}
