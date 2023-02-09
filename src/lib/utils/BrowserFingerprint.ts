import FingerprintJS from '@fingerprintjs/fingerprintjs';
const fpPromise = FingerprintJS.load();

export const getBrowserFingerprint = async () => {
  const fp = await fpPromise;
  const browserFingerprint = await fp.get();
  return browserFingerprint;
};
