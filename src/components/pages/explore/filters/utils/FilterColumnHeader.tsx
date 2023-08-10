import { ReactNode } from 'react';

import { IconSize, IconWithTooltip } from '@/components/utils/Icon';

export function FilterColumn({
  children,
  name,
  tooltip,
}: {
  children: ReactNode;
  name: string;
  tooltip: string;
}) {
  return (
    <div className="shrink grow basis-0 space-y-4">
      <ColumnHeader label={name} tooltip={tooltip} />
      {children}
    </div>
  );
}

function ColumnHeader({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <div className="flex h-fit items-center justify-between gap-4 border-b border-b-on-surface-disabled px-1 pb-4">
      <span className="label-lg text-on-surface-p0">{label}</span>
      <IconWithTooltip
        icon="info"
        className="text-on-surface-p1"
        size={IconSize.Small}
        tooltip={tooltip}
      />
    </div>
  );
}
