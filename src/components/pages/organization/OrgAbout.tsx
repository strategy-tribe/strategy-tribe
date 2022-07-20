import { useOrganizationContext } from './OrganizationContext';

export function OrgAbout() {
  const { org } = useOrganizationContext();

  return (
    <div className="space-y-8">
      {!!org.bio && (
        <div className="space-y-2 max-w-lg">
          <h2 className="title">About</h2>
          <p>{org.bio}</p>
        </div>
      )}

      <div className="space-y-2 max-w-lg">
        <h2 className="title">Operates in</h2>
        <ul>
          {org.countries?.map((c) => {
            return <li key={c}>{c}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
