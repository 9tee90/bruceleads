import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

export function useDemoLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

      router.push('/dashboard');
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

  return {
    isLoading,
    handleDemoLogin,
  };
} 