'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Target,
  Settings,
  Bell,
  Users,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: Target,
    label: 'Targets',
    href: '/targets',
    badge: 3,
  },
  {
    icon: Bell,
    label: 'Alerts',
    href: '/alerts',
    badge: 5,
  },
  {
    icon: Users,
    label: 'Team',
    href: '/team',
  },
  {
    icon: Settings,
    label: 'Settings',
    href: '/settings',
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Desktop Side Navigation */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col w-full p-4">
          <div className="px-3 py-6">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Bruce Leads
            </h1>
          </div>
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "flex items-center w-full px-3 py-2 rounded-lg text-sm transition-colors relative",
                    isActive 
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 w-1 h-6 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className="flex flex-col items-center justify-center w-full h-full relative"
              >
                <item.icon 
                  className={cn(
                    "w-5 h-5",
                    isActive 
                      ? "text-indigo-600 dark:text-indigo-400" 
                      : "text-gray-600 dark:text-gray-400"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs mt-1",
                    isActive 
                      ? "text-indigo-600 dark:text-indigo-400" 
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute top-1 right-1/4 bg-indigo-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute -top-0.5 w-12 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
} 