import Icon from './Icon';

export enum MessageStyle {
  p0 = 'bg-purpleDark text-white',
  p1 = 'bg-dark text-text',
  p2 = 'bg-black border-2 border-dark text-text',
  p3 = 'bg-darker text-text border-darker border-2',
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
  content?: JSX.Element | string;
  style?: MessageStyle;
}) {
  return (
    <div
      className={`p-4 rounded ${style} font-medium text-center  ${className}`}
    >
      <Icon icon={icon} />
      <br />
      <h6>{message}</h6>
      {content}
    </div>
  );
}
