'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const CALENDLY_LINK = 'https://calendly.com/beyondbusinessgroup/30min';

const footerLinks = {
  product: [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'ROI Calculator', href: '#roi' },
    { label: 'Compare', href: '#comparison' },
    { label: 'Book Demo', href: CALENDLY_LINK, isExternal: true },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
  ],
};

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.token,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: 'Welcome to Bruce!',
        description: 'You are now logged in as a demo user.',
      });

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 py-12" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Bruce Leads</h3>
            <p className="text-gray-400 text-sm mb-6">
              AI-powered lead generation platform for modern sales teams.
            </p>
            <Button
              onClick={handleDemoLogin}
              variant="outline"
              disabled={isLoading}
              className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 disabled:opacity-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={isLoading ? "Loading demo account..." : "Try demo account"}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Loading...</span>
                </>
              ) : (
                'Try Demo'
              )}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <nav aria-label="Product navigation">
              <h3 className="text-white font-semibold mb-4" id="product-navigation">Product</h3>
              <ul className="space-y-3" aria-labelledby="product-navigation">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                        aria-label={`${link.label} (opens in new tab)`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                        aria-label={link.label}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Legal navigation">
              <h3 className="text-white font-semibold mb-4" id="legal-navigation">Legal</h3>
              <ul className="space-y-3" aria-labelledby="legal-navigation">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
                      aria-label={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Bruce Leads. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 