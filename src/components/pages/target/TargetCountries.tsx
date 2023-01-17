import Icon, { IconSize } from '@/components/utils/Icon';

import { useTargetContext } from './TargetContext';

export function TargetCountries() {
  const { target } = useTargetContext();

  return (
    <div className="flex items-center gap-2">
      <Icon icon="public" size={IconSize.Small} />
      {target.org?.countries?.map((country) => (
        <span key={country.code} className="label capitalize">
          {country.name}
        </span>
      ))}
    </div>
  );
}
