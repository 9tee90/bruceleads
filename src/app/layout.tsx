import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bruce Leads | AI-Powered Sales Intelligence Platform',
  description: 'Transform your sales process with Bruce Leads. Our AI platform identifies high-intent prospects and delivers real-time buying signals for better conversion rates.',
  keywords: 'sales intelligence, AI sales, lead generation, sales automation, intent data, B2B sales, sales prospecting',
  openGraph: {
    title: 'Bruce Leads | AI-Powered Sales Intelligence Platform',
    description: 'Transform your sales process with Bruce Leads. Our AI platform identifies high-intent prospects and delivers real-time buying signals for better conversion rates.',
    type: 'website',
    locale: 'en_US',
    url: 'https://bruceleads.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bruce Leads | AI-Powered Sales Intelligence Platform',
    description: 'Transform your sales process with Bruce Leads. Our AI platform identifies high-intent prospects and delivers real-time buying signals for better conversion rates.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
