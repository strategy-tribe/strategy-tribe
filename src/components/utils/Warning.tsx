import Icon from './Icon';

export enum MessageStyle {
  p0 = 'bg-main text-on-surface-p0',
  p1 = 'bg-surface text-on-surface-p1',
  p2 = 'bg-bg border-2 border-surface text-on-surface-p1',
  p3 = 'bg-surface-dark text-on-surface-p1 border-surface-dark border-2',
}

export function ImportantMessage({
  message,
  className = '',
  icon = 'warning',
  content,
  style = MessageStyle.p0,
}: {
  message: string;
  className?: string;
  icon?: string;
  content?: React.ReactNode | string;
  style?: MessageStyle;
}) {
  return (
    <div
      className={`rounded p-4 ${style} text-center font-medium  ${className}`}
    >
      <Icon icon={icon} />
      <br />
      <h6>{message}</h6>
      {content}
    </div>
  );
}
