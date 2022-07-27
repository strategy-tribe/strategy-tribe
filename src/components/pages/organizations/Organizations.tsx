import { AppearVariants } from '@/lib/framer/Variants';
import { MapOfOrgs } from '@/lib/models/organizations/MapOfOrgs';
import { OrgEntry } from './OrgEntry';

export function Organizations({ map }: { map: MapOfOrgs }) {
  return (
    <div className="space-y-16">
      {map.map((obj, i) => {
        const { letter, orgs } = obj;
        return (
          <div key={i} className="space-y-4 border-">
            <p className="label-lg text-on-surface-unactive laptop:sticky top-20 laptop:-translate-x-12 capitalize">
              {letter}
            </p>
            <div className="space-y-6 laptop:-translate-y-10">
              {orgs.map((org) => (
                <OrgEntry key={org.id} org={org} variants={AppearVariants} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
