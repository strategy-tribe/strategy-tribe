import { AboutTitle } from './utils/AboutTitle';
import { useOrganizationContext } from './OrganizationContext';

export function OrgAbout() {
  const { org } = useOrganizationContext();

  return (
    <div className="space-y-8">
      {!!org.bio && (
        <div className="space-y-2 max-w-lg">
          <AboutTitle text="About" />

          <p>{org.bio}</p>
        </div>
      )}

      <div className="space-y-2 max-w-lg">
        <AboutTitle text="Operates in" />

        <ul>
          {org.countries?.map((c) => {
            return <li key={c}>{c}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
