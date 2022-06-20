import Image from 'next/image';
import React from 'react';

export function Logo() {
  return (
    <Image
      src="/images/logo.svg"
      alt="logo"
      width={24}
      height={24}
      priority={true}
    />
  );
}
