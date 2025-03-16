"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { CommandMenu } from "@/components/CommandMenu";
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex">
        <Sidebar className="flex-shrink-0" />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex-1 lg:flex-initial">
                <span className="text-xl font-semibold lg:hidden">BruceLeads</span>
              </div>
              <CommandMenu />
            </div>
          </header>
          <main className="flex-1">
            <div className="container mx-auto p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
} 