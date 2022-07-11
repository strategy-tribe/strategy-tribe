import React from 'react';
import { Navbar } from '@/navbar/Navbar';
import Footer from './Footer';

export default function AppLayout({
  children,
  hideBgOnScroll = false,
}: {
  hideBgOnScroll: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="scroll-smooth min-h-screen">
      <Navbar hideBgOnScroll={hideBgOnScroll} />
      <main className="min-h-[calc(100vh-10rem)] pt-16">{children}</main>
      <div className="pt-20">
        <Footer />
      </div>
    </div>
  );
}
