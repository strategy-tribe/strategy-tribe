import { AnimatePresence, motion } from 'framer-motion';
import router from 'next/router';
import { useState } from 'react';
import { useDisconnect } from 'wagmi';

import { Button, ButtonStyle } from '@/components/utils/Button';
import { Overlay } from '@/components/utils/Overlay';
import * as Title from '@/components/utils/Title';

import { useAuth } from '@/auth/AuthContext';

('../utils/Title');

export enum WalletType {
  MetaMask = 'MetaMask',
  Coinbase = 'Coinbase',
  WalletConnect = 'WalletConnect',
}

export function ConnectWalletPopUp({
  show,
  hide,
}: {
  show: boolean;
  hide: () => void;
}) {
  const { LogIn } = useAuth();
  const [error, setError] = useState<string>();
  const { disconnectAsync } = useDisconnect();
  const isMobileDevice = () => {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  };

  const getEncodedUri = (url: string): string => {
    const encoded = encodeURIComponent(url);
    return encoded.indexOf('%2B') < 0
      ? encoded
      : getEncodedUri(
          `https://${window.location.host}/mobile-connect/?walletType=${WalletType.Coinbase}`
        );
  };

  const handleAction = async (
    walletDeepLink: string,
    shouldNavigate: boolean,
    walletType: WalletType
  ) => {
    if (isMobileDevice()) {
      if (shouldNavigate) {
        router.push(`/mobile-connect/?walletType=${walletType}`);
        return;
      }
      window.location.replace(walletDeepLink);
      return;
    }
    setError('Connecting...');
    await LogIn(walletType, setError);
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 z-50 "
          >
            <div
              className="absolute top-[50%] left-[50%] z-50 mx-auto min-w-[20rem] max-w-lg translate-y-[-50%] translate-x-[-50%]
              space-y-6 rounded-lg border-2 border-main bg-bg
              px-8 pt-6 pb-8
              text-on-surface-p1
          "
            >
              <div className="space-y-2">
                <Title.Title title="Choose a wallet" />
                {/* <p className="whitespace-pre-line">{`Bigger rewards mean more eyes and more OSINT hunters.`}</p> */}
              </div>

              <div className="items-center space-y-4">
                <div
                  className="hover:text-black flex h-16 w-64 cursor-pointer items-center justify-start 
                        rounded-2xl border-2 border-main px-3 font-semibold text-on-surface-p0 hover:bg-main"
                  onClick={async () => {
                    const metamaskAppDeepLink = `https://metamask.app.link/dapp/${window.location.host}/mobile-connect/?walletType=${WalletType.MetaMask}`;
                    const shouldNavigate =
                      (window.ethereum && !window?.coinbaseWalletExtension) ||
                      window.location.href.indexOf('/mobile-connect/') > -1
                        ? true
                        : false;
                    handleAction(
                      metamaskAppDeepLink,
                      shouldNavigate,
                      WalletType.MetaMask
                    );
                  }}
                >
                  <img
                    src={window.origin + '/images/wallet/metamask.png'}
                    alt="Metamask"
                    className="mr-10 ml-2 h-7 w-7"
                  />
                  METAMASK
                </div>
                <div
                  className="hover:text-black flex h-16 w-64 cursor-pointer items-center justify-start 
                    rounded-2xl border-2 border-main px-3 font-semibold text-on-surface-p0 hover:bg-main"
                  onClick={async () => {
                    const coinbaseDeepLink =
                      'https://go.cb-w.com/dapp?cb_url=' +
                      getEncodedUri(
                        `https://${window.location.host}/mobile-connect/?walletType=${WalletType.Coinbase}`
                      ).replace('%20', '');
                    const shouldNavigate = window?.coinbaseWalletExtension
                      ? true
                      : false;
                    handleAction(
                      coinbaseDeepLink,
                      shouldNavigate,
                      WalletType.Coinbase
                    );
                  }}
                >
                  <img
                    src={window.origin + '/images/wallet/coinbase.png'}
                    alt="Metamask"
                    className="mr-10 ml-2 h-7 w-7"
                  />
                  COINBASE WALLET
                </div>
                <div
                  className="hover:text-black flex h-16 w-64 cursor-pointer items-center justify-start 
                    rounded-2xl border-2 border-main px-3 font-semibold text-on-surface-p0 hover:bg-main"
                  onClick={async () => {
                    setError('Connecting...');
                    await disconnectAsync();
                    await LogIn(WalletType.WalletConnect, setError);
                  }}
                >
                  <img
                    src={window.origin + '/images/wallet/walletconnect.png'}
                    alt="Metamask"
                    className="mr-10 ml-2 h-7 w-7"
                  />
                  WALLETCONNECT
                </div>
              </div>

              {error && (
                <div className="mt-6 w-full text-center text-base text-error-light">
                  {error}
                </div>
              )}
              <div className="flex items-center justify-end gap-8">
                <Button
                  info={{
                    label: 'Cancel',
                    style: ButtonStyle.Text,
                    onClick: () => {
                      setError(undefined);
                      hide();
                    },
                  }}
                />
              </div>
            </div>
            <Overlay
              showOverlay={true}
              hide={() => {
                setError(undefined);
                hide();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
