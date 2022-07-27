import React from 'react';
import Icon, { IconSize } from '@/components/utils/Icon';

export function BountyCardWatchButton({
  animClasses,
}: {
  animClasses: string;
}) {
  return (
    <button
      className={`grid place-items-center h-fit text-main-light group-hover:pointer-events-auto pointer-events-none group-hover:opacity-100 opacity-0 ${animClasses}`}
    >
      <Icon icon="visibility" size={IconSize.Small} />
    </button>
  );
}
