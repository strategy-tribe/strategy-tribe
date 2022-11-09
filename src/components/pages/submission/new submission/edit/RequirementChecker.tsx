import { Requirement, RequirementType } from '@prisma/client';
import { useEffect, useState } from 'react';

import { GetWordCount } from '@/lib/utils/StringHelpers';

import Icon, { IconSize } from '@/components/utils/Icon';

import { CheckInput } from '../checkers';
import { useNewSubmissionContext } from '../NewSubmissionContext';

export function RequirementChecker({
  requirement,
  input,
}: {
  requirement: Requirement;
  input?: string | File[] | string[];
}) {
  const { title, type, optional } = requirement;
  const [passed, setPassed] = useState(false);
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
  }, [input, optional, type]);

  useEffect(() => {
    answerChanged(requirement, passed);
  }, [passed]);

  return (
    <div className="sticky top-40 z-30 min-w-[10rem] bg-surface-dark py-2">
      <div className="label-lg group flex -translate-x-6 cursor-default items-center gap-2">
        <Icon
          icon="close"
          className={`text-error-light ${!!passed && 'invisible'}`}
          size={IconSize.Small}
        />

        <div className="label w-full space-y-4">
          {/* Label of the req */}
          <div className="flex items-center justify-between">
            <div>
              <span className={`${!passed && 'group-hover:hidden'}`}>
                {title}
              </span>

              <span
                className={`hidden text-error-light ${
                  !passed && 'group-hover:inline '
                }`}
              >
                {message}
              </span>
            </div>
            {typeof input === 'string' && (
              <span
                className={`${type !== RequirementType.REPORT && 'invisible'}`}
              >
                {GetWordCount(input as string)}{' '}
                {GetWordCount(input as string) === 1 ? 'word' : 'words'}
              </span>
            )}
          </div>

          {/* Error message for mobile */}
          <span
            className={`text-error-light laptop:hidden ${passed && 'hidden'}`}
          >
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}
