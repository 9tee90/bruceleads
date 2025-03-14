import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register | BruceLeads',
  description: 'Create a new BruceLeads account',
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your account
          </a>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
} 