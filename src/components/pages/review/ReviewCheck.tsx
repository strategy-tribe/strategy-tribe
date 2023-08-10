import React from 'react';
import Switch from 'react-switch';

import Icon, { IconSize } from '@/components/utils/Icon';

import { NumberSelector } from './NumberSelector';

export function ReviewCheck({
  num,
  question,
  check,
  children,
}: {
  question: string;
  num: number;
  check?: {
    setValue?: (v: boolean) => void;
    value?: boolean;
    whenOn: string;
    whenOff: string;
    disabled?: boolean;
  };
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <NumberSelector num={num} />
        <h2 className="body text-on-surface-unactive">{question}</h2>
      </div>

      {check && (
        <div className="flex w-full items-center justify-between space-y-2 text-on-surface-p0">
          <div className="pl-2">
            {check.value && (
              <div className="flex items-center gap-2">
                <Icon
                  icon="check"
                  size={IconSize.Small}
                  className="text-success"
                />
                <p>{check.whenOn}</p>
              </div>
            )}
            {!check.value && (
              <div className="flex items-center gap-2">
                <Icon
                  icon="close"
                  size={IconSize.Small}
                  className="text-error"
                />
                <p>{check.whenOff}</p>
              </div>
            )}
          </div>

          {typeof check.value !== 'undefined' && check.setValue && (
            <Switch
              disabled={check.disabled}
              onChange={() => {
                if (check.setValue) check.setValue(!check.value);
              }}
              checked={check.value}
              onColor="#A29BFE"
              onHandleColor="#6C5CE7"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={16}
              width={32}
            />
          )}
        </div>
      )}

      <div className="pt-6">{children}</div>
    </div>
  );
}
