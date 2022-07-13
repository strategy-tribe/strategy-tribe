import React from 'react';
import { Navbar } from '@/navbar/Navbar';
import Footer from './Footer';
import { useAuth } from 'auth/AuthContext';

export default function AppLayout({
  children,
  hideBgOnScroll = false,
}: {
  hideBgOnScroll?: boolean;
  children: React.ReactNode;
}) {
  const { isAdmin, isStaff } = useAuth();

  const specialAccount = isAdmin || isStaff;

  return (
    <div className="scroll-smooth min-h-screen">
      <Navbar hideBgOnScroll={hideBgOnScroll} />
      <main
        className={`min-h-[calc(100vh-10rem)]  ${
          specialAccount ? 'pt-20' : 'pt-16'
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
