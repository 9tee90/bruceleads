import * as React from 'react';
import { cn } from '@/lib/utils';

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Shell({ children, className, ...props }: ShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
          <div className="flex flex-col h-full">
            <div className="flex items-center h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-bold text-gray-900">Bruce Leads</h1>
            </div>
            <nav className="flex-1 px-2 py-4 space-y-1">
              <a
                href="/dashboard"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md"
              >
                Dashboard
              </a>
              <a
                href="/dashboard/companies"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Companies
              </a>
              <a
                href="/dashboard/contacts"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Contacts
              </a>
              <a
                href="/dashboard/settings"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Settings
              </a>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className={cn('py-6', className)} {...props}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 