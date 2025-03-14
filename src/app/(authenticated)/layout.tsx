import { ReactNode } from 'react';
import AppLayout from '@/components/layout/AppLayout';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
