import { useState } from 'react';

import { ConnectWalletPopUp } from './ConnectWalletPopUp';
import { Button, ButtonStyle } from '../utils/Button';

export default function ConnectWalletButton() {
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  return (
    <>
      <Button
        info={{
          label: 'Connect wallet',
          onClick: () => setShowConnectWallet(true),
          style: ButtonStyle.Hollow,
        }}
      />
      <ConnectWalletPopUp
        show={showConnectWallet}
        hide={() => setShowConnectWallet(false)}
      />
    </>
  );
}
