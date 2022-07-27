import React from 'react';
import Icon, { IconSize } from '@/components/utils/Icon';

export function SubmissionDetail({
  label,
  icon,
  value,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div>
      <span className="label text-on-surface-unactive">{label}</span>
      <div className="flex items-center gap-2">
        {!!icon && <Icon icon={icon} size={IconSize.Small} />}
        <span className="label-sm">{value}</span>
      </div>
    </div>
  );
}
