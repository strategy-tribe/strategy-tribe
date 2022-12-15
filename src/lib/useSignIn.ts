import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

import { WalletType } from '@/components/auth/ConnectWalletPopUp';

/** Logic for custom sign in method */
export const useSignIn = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  async function handleAuth(
    walletType: WalletType,
    setError: (e: string) => void
  ) {
    try {
      // console.log('trying to connect');
      if (isConnected) {
        await disconnectAsync();
      }

      let connector;
      switch (walletType) {
        case WalletType.Coinbase:
          connector = new CoinbaseWalletConnector({
            options: {
              appName: 'wagmi',
            },
          });
          break;
        case WalletType.WalletConnect:
          connector = new WalletConnectConnector({
            options: {
              qrcode: true,
            },
          });
          break;
        default:
          connector = new MetaMaskConnector();
      }

      const { account, chain } = await connectAsync({
        connector,
      });

      const userData = { address: account, chain: chain.id, network: 'evm' };

      const { data } = await axios.post('/api/auth/request-message', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const message = data.message;

      const signature = await signMessageAsync({ message });

      // redirect user after success authentication to '/user' page
      const res = await signIn('credentials', {
        message,
        signature,
        redirect: false,
      });

      const url = res?.url;

      if (!url) {
        throw new Error('Unable to redirect to signed in page');
      }
      /**
       * instead of using signIn(..., redirect: "/user")
       * we get the url from callback and push it to the router to avoid page refreshing
       */
      push(url);
    } catch (error: any) {
      let message: string;
      if (error.message.includes('user rejected signing')) {
        message = 'User denied account authorization';
      } else {
        message = (error.message as string).replace('Connector', 'Wallet');
      }
      setError(message);
      console.error('there has been an error');
    }
  }

  return {
    signIn: handleAuth,
  };
};
