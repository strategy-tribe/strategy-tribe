import { useAccountContext } from './AccountContext';
import { Section } from '../landing/Section';

export function AccountHeader() {
  const { view } = useAccountContext();

  return (
    <div className="w-full border-b-2 border-main py-14 tablet:border-y-2">
      <Section>
        <h1 className="title capitalize">{view}</h1>
      </Section>
    </div>
  );
}
