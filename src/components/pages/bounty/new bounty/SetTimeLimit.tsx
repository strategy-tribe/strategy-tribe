import React, { useEffect, useMemo, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { Title } from '@/components/utils/Title';
('../../utils/Title');
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GetDateInString } from '@/utils/DateHelpers';
import Toggle from '@/components/utils/Toggle';

export const SetTimeLimit = ({
  date,
  hasDeadline,
  setDate,
  setHasDeadline,
}: {
  hasDeadline: boolean;
  setHasDeadline: (s: boolean) => void;
  date: Date | undefined;
  setDate: (s: Date) => void;
}) => {
  const timeLeft = useMemo(
    () => (date ? GetDateInString(date, true) : undefined),
    [date]
  );

  const dataIsValid = useMemo(
    () => !!date && date?.getTime() > new Date().getTime(),
    [date]
  );

  return (
    <div className="flex flex-col space-y-5">
      <Title title="Set a deadline" pos={1} />

      {/* Toggle */}
      <Toggle
        whenOn="Time limit"
        whenOff="No time limit"
        value={hasDeadline}
        setValue={setHasDeadline}
      />

      {/* Date picker */}
      {hasDeadline && (
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          disabled={!hasDeadline}
          className="bg-black border-0 border-b-2 border-disabled focus:border-purpleDar"
        />
      )}

      {/* Message */}
      {hasDeadline && (
        <>
          {timeLeft && dataIsValid && (
            <p className="label">
              This bounty will stop accepting submissions in {timeLeft}
            </p>
          )}
          {!dataIsValid && (
            <p className="text-redLight font-semibold label">
              Date must be after today
            </p>
          )}
        </>
      )}
    </div>
  );
};
