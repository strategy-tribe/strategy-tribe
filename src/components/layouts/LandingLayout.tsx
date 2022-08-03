import React from 'react';

import { LandingNavbar } from '@/navbar/LandingNavbar';

import Footer from './Footer';

export default function LandingLayout({
  children,
  hideBgOnScroll = false,
}: {
  children: React.ReactNode;
  hideBgOnScroll?: boolean;
}) {
  return (
    <div className="scroll-smooth min-h-screen">
      <LandingNavbar hideBgOnScroll={hideBgOnScroll} />
      <main className="min-h-[calc(100vh-10rem)] pt-20">{children}</main>
      <Footer />
    </div>
  );
}
