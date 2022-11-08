import React from 'react';

import Icon, { IconSize } from '@/components/utils/Icon';

export function BountyCardWatchButton({
  animClasses,
}: {
  animClasses: string;
}) {
  return (
    <button
      className={`pointer-events-none grid h-fit place-items-center text-main-light opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 ${animClasses}`}
    >
      <Icon icon="visibility" size={IconSize.Small} />
    </button>
  );
}
