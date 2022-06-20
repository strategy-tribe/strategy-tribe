import Icon from '@/components/utils/Icon';
import React from 'react';

export function MenuItem({
  icon,
  label,
  onClick,
  disabled,
  labelClass,
  containerClass,
}: {
  disabled: boolean;
  icon: string;
  label: string;
  onClick: () => void;
  //
  labelClass?: string;
  containerClass?: string;
}) {
  return (
    <li>
      <button
        className={`grid grid-cols-4 w-full group ${containerClass}`}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className={`text-left`} icon={icon} />
        <span
          className={`font-medium font-grotesk col-span-3 text-right group-hover:underline ${labelClass}`}
        >
          {label}
        </span>
      </button>
    </li>
  );
}
