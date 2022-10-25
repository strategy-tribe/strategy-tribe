import { useOrganizationContext } from './OrganizationContext';

export function OrgTags() {
  const { org } = useOrganizationContext();

  return (
    <div className="flex gap-4">
      {org.tags?.map((tag) => {
        return (
          <span
            key={tag.name}
            className="label text-on-surface-unactive capitalize"
          >
            {tag.name}
          </span>
        );
      })}
    </div>
  );
}
