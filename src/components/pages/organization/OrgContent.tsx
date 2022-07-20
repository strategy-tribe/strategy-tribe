import { Section } from '@/components/pages/landing/Section';
import { OrgSideMap } from './OrgSideMap';
import { OrgBounties } from './OrgBounties';
import { OrgAbout } from './OrgAbout';

export function OrgContent() {
  return (
    <Section className="flex gap-24 min-h-[20rem]">
      <OrgSideMap />
      <div className="space-y-16">
        <OrgAbout />
        <OrgBounties />
      </div>
    </Section>
  );
}
