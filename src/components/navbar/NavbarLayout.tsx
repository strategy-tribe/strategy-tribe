import React from 'react';

export function NavbarLayout({
  hide,
  className,
  children,
}: {
  hide: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${hide && 'translate-y-[-100%] laptop:translate-y-0'}
                    z-40 transition-transform ease-in-out duration-500                    
                    sticky top-0 min-h-[62px] left-0 right-0

                    ${className}`}
    >
      <div className="max-w-7xl  mx-auto w-full flex  items-center ">
        {children}
      </div>
    </div>
  );
}
