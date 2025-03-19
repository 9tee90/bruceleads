'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

      window.location.href = '/dashboard';
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
    <footer className="relative z-10 bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="relative z-20">
            <h3 className="text-xl font-semibold mb-6 text-white">Product</h3>
            <ul className="space-y-4">
              <li>
                <a href="#why" className="block hover:text-white transition-colors duration-200">
                  Why Bruce
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="block hover:text-white transition-colors duration-200">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#roi" className="block hover:text-white transition-colors duration-200">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="block hover:text-white transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="https://calendly.com/bruceleads/demo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block hover:text-white transition-colors duration-200"
                >
                  Book Demo
                </a>
              </li>
              <li>
                <button
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="block hover:text-white transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Loading...
                    </span>
                  ) : (
                    'Try Demo'
                  )}
                </button>
              </li>
            </ul>
          </div>

          <div className="relative z-20">
            <h3 className="text-xl font-semibold mb-6 text-white">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="block hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="block hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="relative z-20">
            <h3 className="text-xl font-semibold mb-6 text-white">Contact</h3>
            <p className="mb-4 text-gray-400">Questions? Get in touch:</p>
            <a 
              href="mailto:hello@bruceleads.ai" 
              className="block text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              hello@bruceleads.ai
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Bruce Leads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 