import React from 'react';

export function NumberSelector({
  num,
  colors = 'bg-main text-on-surface-p0',
}: {
  num: number;
  colors?:
    | 'bg-main text-on-surface-p0'
    | 'bg-surface text-on-surface-p0'
    | 'bg-surface-dark text-on-surface-p0';
}) {
  return (
    <span
      className={`${colors} label grid h-6 w-6 shrink-0 grow-0 place-items-center rounded`}
    >
      {num}
    </span>
  );
}
