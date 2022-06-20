import Link from 'next/link';
import React from 'react';
import Icon from './Icon';

export enum ButtonStyle {
  Hollow = 'text-white border-2 border-purpleDark hover:bg-purpleDark',
  HollowDark = 'text-white border-2 border-black hover:bg-black hover:text-white',
  Filled = 'bg-purpleDark text-white hover:bg-purpleLight hover:text-black border-2 border-purpleDark disabled:text-disabled disabled:bg-dark disabled:border-dark',
  Text = 'text-white hover:text-purpleLight disabled:hover:text-text disabled:text-text',
  TextPurple = 'text-purpleLight hover:text-purpleDark disabled:hover:text-unactive disabled:text-unactive',
}

export interface ButtonInformation {
  isALink?: string;
  onClick?: () => void;
  style: ButtonStyle;
  label?: string;
  icon?: string;
  disabled?: boolean;
  className?: string;
  iconClasses?: string;
  labelClasses?: string;
  align?: string;
  removePadding?: boolean;
  removeMinWidth?: boolean;
}

export function Button({ info }: { info: ButtonInformation }) {
  const {
    removePadding,
    className,
    label,
    icon,
    iconClasses,
    labelClasses,
    style,
    removeMinWidth,
    isALink,
  } = info;

  const padding = removePadding ? '' : 'py-3 px-5 tablet:px-6';
  const colors = style.toString();
  const font = 'label';
  const align = info.align ? info.align : 'justify-center';
  const others = 'z-10 flex items-center gap-2 rounded-full group';
  const size = removeMinWidth ? `min-h-[24px]` : 'min-w-[6rem] min-h-[24px]';

  const innerContent = (
    <>
      {icon && (
        <Icon
          icon={icon}
          displayClasses={`${!label && 'hidden'} tablet:block`}
          className={iconClasses}
        />
      )}
      {label && (
        <span className={`font-medium font-grotesk ${labelClasses}`}>
          {label}
        </span>
      )}
    </>
  );

  if (isALink) {
    return (
      <Link href={isALink}>
        <a
          className={` ${padding} ${font} ${others} ${colors} ${className} ${align} ${size}`}
        >
          {innerContent}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        className={`${className} ${padding} ${font} ${others} ${colors} ${align} ${size}`}
        onClick={() => {
          if (info.onClick) info.onClick();
        }}
        disabled={info.disabled}
      >
        {innerContent}
      </button>
    );
  }
}
