import Icon, { IconSize } from './Icon';
import { MoreInfo } from './MoreInfo';

export function BountyStat({
  icon,
  label: Label,
  details,
  size = '',
}: {
  size?: string;
  icon?: string;
  label: string | React.ReactNode;
  details?: string;
}) {
  return (
    <div className="flex gap-1 items-center cursor-default relative group shrink-0">
      {!!icon && <Icon icon={icon} size={IconSize.Small} />}
      {typeof Label === 'string' ? (
        <span className={`${size}`}>{Label}</span>
      ) : (
        Label
      )}

      {!!details && (
        <MoreInfo
          content={details}
          translate="-translate-y-14 -translate-x-20"
        />
      )}
    </div>
  );
}
