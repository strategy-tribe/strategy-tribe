import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

/** Logic for custom sign in method */
export const useSignIn = () => {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  async function handleAuth() {
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
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
    } catch (error) {
      console.error('there has been an error');
    }
  }

  return {
    signIn: handleAuth,
  };
};
