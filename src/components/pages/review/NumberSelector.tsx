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
      className={`${colors} grid place-items-center h-6 w-6 rounded grow-0 shrink-0 label`}
    >
      {num}
    </span>
  );
}
