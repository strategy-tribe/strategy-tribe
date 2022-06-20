import React from 'react';
import Footer from '../pages/landing/Footer';
import { iNavbar } from '../navbar/models';
import Navbar from '../navbar/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scroll-smooth min-h-screen">
      <main className="min-h-[calc(100vh-10rem)]">{children}</main>
      <Footer />
    </div>
  );
}
