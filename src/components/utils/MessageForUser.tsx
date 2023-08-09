import React from 'react';

export function MessageForUser({
  text,
  className,
  size = 'text-sm',
}: {
  className?: string;
  text: string;
  size?: string;
}) {
  return (
    <div
      className={`bg-on-surface-disabled p-4 font-semibold text-on-surface-p1 ${size} ${className} max-w-sm rounded-sm leading-6`}
    >
      <p>{text}</p>
    </div>
  );
}
