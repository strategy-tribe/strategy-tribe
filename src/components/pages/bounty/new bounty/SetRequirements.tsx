import React, { useEffect, useState } from 'react';
import { Title } from '@/components/utils/Title';
('../../utils/Title');
import Switch from 'react-switch';
import { Requirement, RequirementType } from '@/lib/models/requirement';
import Icon from '@/components/utils/Icon';

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
              <div className="flex gap-16 w-full">
                <RequirementInput num={index} requirement={r} />
                {requirements.length >= 2 && (
                  <button
                    className="rounded-full h-10 w-10 grow-0 shrink-0 grid place-items-center bg-surface relative group"
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

                    <p className="absolute translate-x-24 opacity-0 group-hover:opacity-100 label min-w-[10rem]">
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
        className="flex items-center gap-4 text-main-light group "
        onClick={() => {
          setRequirements([
            ...requirements,
            { title: '', type: RequirementType.Wallet },
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
    <div className="space-y-4 min-w-[40rem]">
      {/* Requirement num */}
      <h2 className="font-grotesk font-semibold text-on-surface-p0">
        Condition #{num + 1}
      </h2>

      {/* Title */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="label"
          className="label-lg min-w-[10rem] flex items-center gap-4 -translate-x-10"
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
          className="border-0 p-0 pb-2 pt-2 border-b-2 border-on-surface-disabled focus:border-main   bg-bg placeholder:text-on-surface-disabled text-on-surface-p0 ring-0 w-full focus:ring-0  transition-all pr-0 first-letter:capitalize"
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
          className="bg-bg border-0 p-0 pb-2 pt-2 border-b-2 border-on-surface-disabled focus:ring-0 focus:border-main shrink-0 grow-0 min-w-[14rem]"
          value={type}
          onChange={(e) => {
            const value = e.target.value as RequirementType;
            setType(value);
          }}
        >
          <option value={RequirementType.Email}>{RequirementType.Email}</option>
          <option value={RequirementType.Wallet}>
            {RequirementType.Wallet}
          </option>
          <option value={RequirementType.Domain}>
            {RequirementType.Domain}
          </option>
          <option value={RequirementType.Image}>{RequirementType.Image}</option>
          <option value={RequirementType.Report}>
            {RequirementType.Report}
          </option>
          <option value={RequirementType.PhoneNumber}>
            {RequirementType.PhoneNumber}
          </option>
          <option value={RequirementType.SocialMediaAccount}>
            {RequirementType.SocialMediaAccount}
          </option>
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
