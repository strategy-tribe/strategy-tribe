import React, { useMemo } from 'react';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { useNewSubmissionContext } from './NewSubmissionContext';
import { UserInput } from './UserInput';
import { RequirementEditor } from './edit/RequirementEditor';
import { RequirementType } from '@/lib/models/requirement';

export function EditSubmission() {
  //*Context
  const { userAnswers, setUserAnswers } = useNewSubmissionContext();

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

    setUserAnswers([...newList]);
  }

  return (
    <div className="space-y-7">
      {/* Required  */}
      <div>
        {/* Remove this commponent */}
        <Title title="Requirements" />
        {requirements.map((userAnswer, i) => {
          return (
            <RequirementEditor
              key={i}
              requirement={userAnswer.requirement}
              input={userAnswer.input}
              setInput={(newInput) => ManageNewAnswer(userAnswer, newInput)}
            />
          );
        })}
      </div>

      {/* Optional  */}
      <div>
        <Title title="Optionals" />
        {optionals.map((userAnswer, i) => {
          return (
            <RequirementEditor
              key={i}
              requirement={userAnswer.requirement}
              input={userAnswer.input}
              setInput={(newInput) => ManageNewAnswer(userAnswer, newInput)}
            />
          );
        })}
      </div>
    </div>
  );
}
