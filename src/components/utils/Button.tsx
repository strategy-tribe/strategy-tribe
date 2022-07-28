import Link from 'next/link';

import Icon, { IconSize } from './Icon';

export enum ButtonStyle {
  Hollow = 'text-on-surface-p0 border-2 border-main hover:bg-main',
  HollowDark = 'text-on-surface-p0 border-2 border-bg hover:bg-bg hover:text-on-surface-p0',
  Filled = 'bg-main text-on-surface-p0 hover:bg-main-light hover:text-bg border-2 border-main on-surface-disabled:text-on-surface-disabled on-surface-disabled:bg-surface-dark on-surface-disabled:border-surface-dark',
  Text = 'text-on-surface-p1 hover:text-main-light on-surface-disabled:hover:text-on-surface-p1 on-surface-disabled:text-on-surface-p1',
  TextPurple = 'text-main-light hover:text-main on-surface-disabled:hover:text-on-surface-unactive on-surface-disabled:text-on-surface-unactive',
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
  iconSize?: IconSize;
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
    iconSize,
    onClick,
  } = info;

  const padding = removePadding ? '' : 'py-2 px-5 tablet:px-6';
  const colors = style.toString();
  const font = 'label';
  const align = info.align ? info.align : 'justify-center';
  const others =
    'z-10 flex items-center gap-2 rounded-full group whitespace-nowrap';
  const size = removeMinWidth ? `min-h-[24px]` : 'min-w-[6rem] min-h-[24px]';

  const innerContent = (
    <>
      {icon && (
        <Icon
          size={iconSize}
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
          onClick={onClick}
          className={`${className} ${labelClasses} ${padding} ${font} ${others} ${colors} ${align} ${size}`}
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
          if (onClick) onClick();
        }}
        disabled={info.disabled}
      >
        {innerContent}
      </button>
    );
  }
}
