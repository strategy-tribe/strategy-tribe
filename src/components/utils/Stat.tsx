import { useNotification } from '@/components/notifications/NotificationContext';
import Icon, { IconSize } from '@/components/utils/Icon';

export function Stat({
  title,
  content,
  after = '',
  copyable = false,
  contents = [],
  copyThis = '',
  size = 'body',
  className,
}: {
  copyThis?: string;
  copyable?: boolean;
  title: string;
  content?: string;
  contents?: string[];
  after?: string;
  size?: string;
  className?: string;
}) {
  const { notify: show } = useNotification();

  const showCopyIcon = !!content && !contents.length && copyable;

  return (
    <div
      className={`group flex flex-col items-start ${size} ${
        copyable && 'cursor-pointer'
      }`}
      onClick={() => {
        if (copyable && content) {
          const x = copyThis ? copyThis : content;
          navigator.clipboard.writeText(x);
          show({ title: 'Copied', content: x });
        }
      }}
    >
      <span className="label-lg capitalize text-on-surface-unactive">
        {title}
      </span>
      <p
        className={`relative whitespace-pre-line first-letter:capitalize ${
          copyable && 'group-hover:underline'
        } ${className}`}
      >
        {showCopyIcon && (
          <Icon
            icon="content_copy"
            size={IconSize.Small}
            className="absolute hidden -translate-x-8 group-hover:inline"
          />
        )}
        {content}
        {!content &&
          contents.map((c, i) => {
            return (
              <span key={i}>
                {c}
                <br />
              </span>
            );
          })}
        {after}
      </p>
    </div>
  );
}
