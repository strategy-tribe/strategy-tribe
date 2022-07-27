import Icon, { IconSize } from '@/components/utils/Icon';
import { MoreInfo } from './MoreInfo';

export function Title({
  title,
  extraInfo = '',
  big = false,
  pos = 1,
  color = 'text-on-surface-p0',
  useBorder = true,
}: {
  title: string;
  extraInfo?: string;
  big?: boolean;
  pos?: number;
  color?: string;
  useBorder?: boolean;
}) {
  const translate = () => {
    switch (pos) {
      case 2:
        return big ? 'w-32' : 'w-16';
      case 3:
        return big ? 'w-64' : 'w-32';
      case 4:
        return big ? 'w-[32rem]' : 'w-64';
      default:
        return big ? 'w-16' : 'w-8';
    }
  };

  return (
    <div className={`${big && 'flex flex-col space-y-5'} ${color} `}>
      <div className="flex items-center gap-2">
        <h2 className="h6 font-bold">{title}</h2>
        {extraInfo && (
          <div className="relative group cursor-pointer pt-1 hidden laptop:block">
            <Icon
              icon="info"
              className="text-on-surface-unactive"
              size={IconSize.Small}
            />

            <MoreInfo
              content={extraInfo}
              translate="translate-x-2 -translate-y-2"
            />
          </div>
        )}
      </div>

      {useBorder && (
        <span
          className={`bg-main h-1 inline-block -translate-y-2  ${translate()} `}
        ></span>
      )}
    </div>
  );
}
