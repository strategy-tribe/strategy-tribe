import { Section } from '@/components/pages/landing/Section';

import { TargetAbout } from './TargetAbout';
import { TargetBounties } from './TargetBounties';

export function TargetContent() {
  return (
    <Section className="min-h-[20rem] gap-24 tablet:flex">
      <div className="mx-12 space-y-16">
        <TargetAbout />
        <TargetBounties />
      </div>
    </Section>
  );
}
