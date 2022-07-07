import Icon from '@/components/utils/Icon';
import { Requirement, RequirementType } from '@/lib/models/requirement';

import { GetWordCount } from '@/utils/StringHelpers';
import React, { useEffect, useState } from 'react';
import { useNewSubmissionContext } from '../NewSubmissionContext';
import CheckInput from './checkers';

export function RequirementChecker({
  requirement,
  input,
}: {
  requirement: Requirement;
  input?: string | File[];
}): JSX.Element {
  const { title, type, optional } = requirement;
  const [passed, setPassed] = useState<boolean>(false);
  const [message, setMessage] = useState('');

  const { answerChanged } = useNewSubmissionContext();

  useEffect(() => {
    if (typeof input === 'string') {
      const { isValid, errorMsg } = CheckInput(input, type);
      setPassed(optional || isValid);
      setMessage(errorMsg);
    } else {
      setMessage('You must attach at least one image.');
      if (optional) setPassed(true);
      else {
        setPassed(input ? input.length > 0 : false);
      }
    }
  }, [input]);

  useEffect(() => {
    answerChanged(requirement, passed);
  }, [passed]);

  return (
    <div
      className={`group cursor-default label-lg min-w-[10rem] flex items-center gap-4 -translate-x-10`}
    >
      <Icon
        icon="close"
        className={`text-redLight ${!!passed && 'invisible'}`}
      />

      <div className="space-y-4 label w-full">
        {/* Label of the req */}
        <p className="flex justify-between items-center">
          <div>
            <span className={`${!passed && 'group-hover:hidden'}`}>
              {title}
            </span>

            <span
              className={`text-redLight hidden ${
                !passed && 'group-hover:inline '
              }`}
            >
              {message}
            </span>
          </div>
          {
            <span
              className={`${type !== RequirementType.Report && 'invisible'}`}
            >
              {GetWordCount(input as string)}{' '}
              {GetWordCount(input as string) === 1 ? 'word' : 'words'}
            </span>
          }
        </p>

        {/* Error message for mobile */}
        <span className={`text-redLight laptop:hidden ${passed && 'hidden'}`}>
          {message}
        </span>
      </div>
    </div>
  );
}
