import { useOrganizationContext } from './OrganizationContext';

export function OrgTags() {
  const { org } = useOrganizationContext();

  return (
    <div className="flex gap-4">
      {org.tags?.map((tag) => {
        return (
          <span key={tag} className="label text-unactive capitalize">
            {tag}
          </span>
        );
      })}
    </div>
  );
}
