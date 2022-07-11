import { Section } from '../landing/Section';
import { useAccountContext } from './AccountContext';

export function AccountHeader() {
  const { view } = useAccountContext();

  return (
    <div className="w-full bg-darker py-14">
      <Section>
        <h1 className="capitalize title">{view}</h1>
      </Section>
    </div>
  );
}
