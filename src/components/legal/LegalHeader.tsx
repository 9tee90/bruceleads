import Link from 'next/link';
import Image from 'next/image';

export default function LegalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Bruce Leads"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
              Bruce
            </span>
          </Link>
          
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </header>
  );
} 