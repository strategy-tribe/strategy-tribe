import Image from 'next/image';

export function Logo({ size = 24 }: { size?: number }) {
  return (
    <Image
      src="/images/logo.svg"
      alt="logo"
      width={size}
      height={size}
      priority={true}
    />
  );
}
