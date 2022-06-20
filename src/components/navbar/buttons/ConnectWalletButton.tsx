import React from 'react';
import { useAuth } from 'auth/AuthContext';

export function ConnectWalletButton() {
  const { LogIn: Prompt_ConnectWallet } = useAuth();
  return (
    <button
      className="text-purpleLight border-2 border-purpleDark py-3 px-6 text-base rounded-full flex space-x-2"
      onClick={() => Prompt_ConnectWallet()}
    >
      <span className="font-medium font-grotesk ">Connect wallet</span>
    </button>
  );
}
