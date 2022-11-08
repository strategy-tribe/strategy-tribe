import { DelayType, NotificationType } from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import Icon, { IconSize } from '@/components/utils/Icon';

export function SubmissionDetail({
  label,
  icon,
  value,
  copyable,
}: {
  label: string;
  value: string;
  icon?: string;
  copyable?: boolean;
}) {

  const { notify } = useNotification();
  function copy() {
    if (copyable) {
      navigator.clipboard.writeText(value);
      notify(
        { title: 'Copied', content: value },
        {
          condition: false,
          delayTime: 2,
          delayType: DelayType.Time,
          type: NotificationType.Pill,
        }
      );
    }
  }

  return (
    <div onClick={copy} className={`group ${copyable ? 'cursor-pointer' : ''}`}>
      <span className="label text-on-surface-unactive">{label}</span>
      <div className="flex items-center gap-1">
        {!!icon && (
          <Icon
            icon={icon}
            size={IconSize.Small}
            className="text-on-surface-unactive"
          />
        )}
        <span className={`label-sm ${copyable ? 'group-hover:underline' : ''}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
