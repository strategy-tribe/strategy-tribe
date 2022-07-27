import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Loading({ small = false }: { small?: boolean }) {
  const [errorMessage, setErrorMessage] = useState(false);

  const [errorMessage2, setErrorMessage2] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage2(true);
      }, 1000 * 3);
    }, 1000 * 3);
  }, []);

  return (
    <div
      className={`${
        !small && 'h-screen w-screen '
      } flex items-center justify-center flex-col gap-8 text-on-surface-unactive `}
    >
      <div className="flex items-center justify-center flex-col gap-4 animate-pulse">
        <Image
          src="/images/logo.svg"
          alt="logo"
          width={48}
          height={48}
          className="totext"
        />
        <span className="label">Loading</span>
      </div>

      <div
        className={` transition-all ease-in-out duration-500 ${
          errorMessage
            ? 'translate-y-0 opacity-100'
            : 'translate-y-0.5 opacity-0'
        }`}
      >
        <p className="label text-center">
          {errorMessage && !errorMessage2 && (
            <span>This is taking longer than expected</span>
          )}
          {errorMessage2 && <span>Please check your internet connection</span>}
        </p>
      </div>
    </div>
  );
}
