import { AppearVariants } from '@/lib/framer/Variants';
import { MapOfTargets } from '@/lib/models/MapOfTargets';

import { TargetEntry } from './TargetEntry';

export function Targets({ map }: { map: MapOfTargets }) {
  return (
    <div className="space-y-16">
      {map.map((obj, i) => {
        const { letter, targets } = obj;
        return (
          <div key={i} className="border- space-y-4">
            <p className="label-lg top-20 capitalize text-on-surface-unactive laptop:sticky laptop:-translate-x-12">
              {letter}
            </p>
            <div className="grid-cols-2 gap-8 tablet:grid laptop:-translate-y-10">
              {targets.map((target) => (
                <TargetEntry
                  key={target.name}
                  target={target}
                  variants={AppearVariants}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
