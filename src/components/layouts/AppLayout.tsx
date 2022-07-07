import React from 'react';
import { Navbar } from '@/navbar/Navbar';
import Footer from './Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="scroll-smooth min-h-screen">
      <Navbar />
      <main className="min-h-[calc(100vh-10rem)] pt-16">{children}</main>
      <div className="pt-20">
        <Footer />
      </div>
    </div>
  );
}
