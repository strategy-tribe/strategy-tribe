import { useFloating } from '@floating-ui/react-dom-interactions';
import { useState } from 'react';

export enum IconSize {
  Small = 'text-[18px]',
  Default = 'text-[24px]',
  Large = 'text-[36px]',
  Huge = 'text-[48px]',
}

interface iIcon {
  icon: string;
  className?: string;
  displayClasses?: string;
  size?: IconSize;
}

export default function Icon({
  icon,
  className = '',
  size = IconSize.Default,
  displayClasses = '',
}: iIcon) {
  return (
    <span className={`icon ${className}`}>
      <span className={`${displayClasses} ${size}`}>{icon}</span>
    </span>
  );
}

export function IconWithTooltip({
  icon,
  tooltip,
  className,
  displayClasses,
  size,
}: iIcon & { tooltip: string }) {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  return (
    <>
      <div
        ref={reference}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="cursor-help"
      >
        <Icon
          icon={icon}
          size={size}
          className={className}
          displayClasses={displayClasses}
        />
      </div>
      {open && (
        <div
          ref={floating}
          className="body elevation-1 rounded border border-surface-dark bg-surface py-2.5 pl-3 pr-5 text-left"
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
          }}
        >
          {tooltip}
        </div>
      )}
    </>
  );
}
