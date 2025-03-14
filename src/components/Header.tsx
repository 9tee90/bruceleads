import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Bruce Leads
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login?demo=true">
              <Button variant="outline" size="sm">
                Try Demo
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
