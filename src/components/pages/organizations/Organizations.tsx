import { AppearVariants } from '@/lib/framer/Variants';
import { MapOfOrgs } from '@/lib/models/MapOfOrgs';

import { OrgEntry } from './OrgEntry';

export function Organizations({ map }: { map: MapOfOrgs }) {
  return (
    <div className="space-y-16">
      {map.map((obj, i) => {
        const { letter, orgs } = obj;
        return (
          <div key={i} className="border- space-y-4">
            <p className="label-lg top-20 capitalize text-on-surface-unactive laptop:sticky laptop:-translate-x-12">
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
