import Icon, { IconSize } from '@/components/utils/Icon';

import { useOrganizationContext } from './OrganizationContext';

export function OrgCountries() {
  const { org } = useOrganizationContext();

  return (
    <div className="flex items-center gap-2">
      <Icon icon="public" size={IconSize.Small} />
      {org.countries?.map((country) => (
        <span key={country.code} className="label capitalize">
          {country.name}
        </span>
      ))}
    </div>
  );
}
