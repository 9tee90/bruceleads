import { type ReactElement } from 'react';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
} 