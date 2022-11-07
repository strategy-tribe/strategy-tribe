import { useAccountContext } from './AccountContext';
import { Section } from '../landing/Section';

export function AccountHeader() {
  const { view } = useAccountContext();

  return (
    <div className="w-full border-y-2 border-main py-14">
      <Section>
        <h1 className="capitalize title">{view}</h1>
      </Section>
    </div>
  );
}
