import React from 'react';

export enum IconSize {
  Small = 'text-[18px]',
  Default = 'text-[24px]',
  Large = 'text-[36px]',
  Huge = 'text-[48px]',
}

export default function Icon({
  icon,
  className = '',
  size = IconSize.Default,
  displayClasses = '',
}: {
  icon: string;
  className?: string;
  displayClasses?: string;
  size?: IconSize;
}) {
  return (
    <span className={`icon ${className}`}>
      <span className={`${displayClasses} ${size}`}>{icon}</span>
    </span>
  );
}
