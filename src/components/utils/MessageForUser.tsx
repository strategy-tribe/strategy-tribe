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
      className={`p-4 bg-disabled text-text font-semibold ${size} ${className} rounded-sm max-w-sm leading-6`}
    >
      <p>{text}</p>
    </div>
  );
}
