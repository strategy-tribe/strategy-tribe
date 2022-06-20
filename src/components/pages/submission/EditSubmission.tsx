import Loading from '@/components/utils/Loading';
import { useGetBounty } from '@/hooks/bountyHooks';
import {
  useNewSubmissionContext,
  UserInput,
} from '@/pages/app/bounty/[id]/new';
import React, { useMemo, useState } from 'react';
import FromBounty from '@/components/utils/FromBounty';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { RequirementEditor } from './editSubmission/RequirementEditor';
import { Stat } from './Stat';

export function EditSubmission() {
  //*Context
  const { userAnswers, setUserAnswers, bountyId, requirementsFullfiled } =
    useNewSubmissionContext();

  //*State
  const { bounty, isLoading } = useGetBounty(bountyId);

  const [expandDetails, setExpandDetails] = useState(false);

  const [viewingRequirements, setViewingRequirements] = useState(true);

  //*Memoized
  const requirements = useMemo(
    () => userAnswers.filter((c) => !c.requirement.optional),
    [userAnswers]
  );

  const optionals = useMemo(
    () => userAnswers.filter((c) => c.requirement.optional),
    [userAnswers]
  );

  //*Methods
  function ManageNewAnswer(oldAnswer: UserInput, newInput: string | File[]) {
    const index = userAnswers.indexOf(oldAnswer);

    const newAnswer = { ...oldAnswer, input: newInput };

    const newList = [
      ...userAnswers.slice(0, index),
      newAnswer,
      ...userAnswers.slice(index + 1),
    ];

    setUserAnswers(newList);
  }

  if (isLoading || !userAnswers) return <Loading />;

  return (
    <div className="space-y-8">
      {bounty && (
        <div className="space-y-2">
          <Title title="About the bounty" />
          <div className="space-y-8">
            {/* Bounty name */}
            <FromBounty bountyId={bountyId as string} />
            <Stat
              title="Target"
              content={bounty.name}
              copyable={true}
              size="text-sm"
            />

            <Stat
              title="Affiliated with"
              content={bounty.organizationName}
              copyable={true}
              size="text-sm"
            />

            {bounty.description && (
              <div className="">
                <Stat
                  title="More details"
                  size="text-sm"
                  content={bounty.description}
                  className={`${!expandDetails && 'line-clamp-4'}`}
                />
                {bounty.description.length > 500 && (
                  <button
                    className="text-purpleDark hover:text-purpleLight text-sm font-semibold"
                    onClick={() => setExpandDetails(!expandDetails)}
                  >
                    {expandDetails ? 'Less' : 'Read more'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <hr className="w-full h-0.5 text-dark" />

      {/* Navigation */}
      <div className="flex gap-8 items-center text-disabled -translate-x-4">
        <button
          onClick={() => setViewingRequirements(true)}
          className={`${
            viewingRequirements ? 'text-white' : ''
          } title-sm flex gap-2`}
        >
          <span
            className={`text-redLight ${requirementsFullfiled && 'invisible'}`}
          >
            *
          </span>

          <span>Requirements</span>
        </button>
        {optionals.length > 0 && (
          <button
            onClick={() => setViewingRequirements(false)}
            className={`${!viewingRequirements ? 'text-white' : ''} title-sm`}
            disabled={optionals.length === 0}
          >
            Optional
          </button>
        )}
      </div>

      {/* Input fields */}
      <div className="space-y-4">
        {viewingRequirements &&
          requirements.map((userAnswer, i) => {
            return (
              <RequirementEditor
                key={i}
                requirement={userAnswer.requirement}
                input={userAnswer.input}
                setInput={(newInput) => ManageNewAnswer(userAnswer, newInput)}
              />
            );
          })}

        {!viewingRequirements &&
          optionals.map((userAnswer, i) => {
            return (
              <RequirementEditor
                key={i}
                requirement={userAnswer.requirement}
                //
                input={userAnswer.input}
                setInput={(newInput) => ManageNewAnswer(userAnswer, newInput)}
              />
            );
          })}
      </div>
    </div>
  );
}
