import { useAuth } from 'auth/AuthContext';

import { Button, ButtonStyle } from '../utils/Button';

export default function ConnectWalletButton() {
  const { LogIn } = useAuth();

  return (
    <Button
      info={{
        label: 'Connect wallet',
        onClick: LogIn,
        style: ButtonStyle.Hollow,
      }}
    />
  );
}
