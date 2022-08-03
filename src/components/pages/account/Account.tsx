import { AccountContent } from './AccountContent';
import { AccountContextProvider } from './AccountContext';
import { AccountHeader } from './AccountHeader';

export const Account = () => {
  return (
    <AccountContextProvider>
      <Content />
    </AccountContextProvider>
  );
};

function Content() {
  return (
    <div className="space-y-8">
      <AccountHeader />
      <AccountContent />
    </div>
  );
}
