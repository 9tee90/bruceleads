'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      variant="outline"
      className="text-red-600 hover:text-red-700"
    >
      Sign out
    </Button>
  );
} 