'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const isDemo = searchParams.get('demo') === 'true';

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: 'demo@bruceleads.com',
        password: 'demouser123',
        redirect: true,
        callbackUrl: '/dashboard'
      });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-trigger demo login if demo parameter is present
  if (isDemo && !isLoading) {
    handleDemoLogin();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Bruce Leads
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <Button
            onClick={handleDemoLogin}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Try Demo'}
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Want to learn more?{' '}
              <a
                href="https://calendly.com/beyondbusinessgroup/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Book a Demo
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 