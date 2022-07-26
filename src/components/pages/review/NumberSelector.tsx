import React from 'react';

export function NumberSelector({
  num,
  colors = 'bg-purpleDark text-white',
}: {
  num: number;
  colors?:
    | 'bg-purpleDark text-white'
    | 'bg-dark text-white'
    | 'bg-darker text-white';
}) {
  return (
    <span
      className={`${colors} grid place-items-center h-6 w-6 rounded grow-0 shrink-0`}
    >
      {num}
    </span>
  );
}
