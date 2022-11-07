import { useAuth } from 'auth/AuthContext';
import React from 'react';

import Footer from './Footer';
import { Navbar } from './navbar/Navbar';

export default function AppLayout({
  children,
  hideBgOnScroll = false,
  keepNavbar = true,
}: {
  keepNavbar?: boolean;
  hideBgOnScroll?: boolean;
  children: React.ReactNode;
}) {
  const { isAdmin, isStaff } = useAuth();

  const specialAccount = isAdmin || isStaff;
  const padding = specialAccount ? 'pt-20' : 'pt-16';

  return (
    <div className="scroll-smooth min-h-screen">
      <Navbar hideBgOnScroll={hideBgOnScroll} keepNavbar={keepNavbar} />
      <main
        className={`min-h-[calc(100vh-10rem)]  ${
          keepNavbar ? padding : 'pt-4'
        }`}
      >
        {children}
      </main>
      <div className="pt-20">
        <Footer />
      </div>
    </div>
  );
}
