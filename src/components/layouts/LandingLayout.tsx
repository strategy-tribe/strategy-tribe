import React from 'react';

import Footer from './Footer';
import { LandingNavbar } from './navbar/LandingNavbar';

export default function LandingLayout({
  children,
  hideBgOnScroll = false,
}: {
  children: React.ReactNode;
  hideBgOnScroll?: boolean;
}) {
  return (
    <div className="min-h-screen scroll-smooth">
      <LandingNavbar hideBgOnScroll={hideBgOnScroll} />
      <main className="min-h-[calc(100vh-10rem)] pt-20">{children}</main>
      <Footer />
    </div>
  );
}
