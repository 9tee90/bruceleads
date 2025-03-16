import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  Home,
  BarChart2,
  Target,
  Bell,
  Send,
  Users,
  Settings,
  Building2,
  Mail,
  Phone,
  MessageSquare,
  Menu,
  X,
  Search,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  description?: string;
}

interface NavSection {
  name: string;
  items: NavItem[];
}

interface SidebarProps {
  className?: string;
}

const navigation: NavSection[] = [
  {
    name: 'Overview',
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        description: 'Get an overview of your sales intelligence',
      },
      {
        name: 'Analytics',
        href: '/analytics',
        icon: BarChart2,
        description: 'Track your performance metrics',
      },
    ],
  },
  {
    name: 'Sales Intelligence',
    items: [
      {
        name: 'Target Companies',
        href: '/targets',
        icon: Target,
        badge: 12,
        description: 'Manage your target companies',
      },
      {
        name: 'Alerts',
        href: '/alerts',
        icon: Bell,
        badge: 3,
        description: 'View and manage trigger events',
      },
      {
        name: 'Company Database',
        href: '/companies',
        icon: Building2,
        description: 'Browse and search companies',
      },
    ],
  },
  {
    name: 'Outreach',
    items: [
      {
        name: 'Campaigns',
        href: '/outreach',
        icon: Send,
        description: 'Manage your outreach campaigns',
      },
      {
        name: 'Email Templates',
        href: '/outreach/email',
        icon: Mail,
        description: 'Create and edit email templates',
      },
      {
        name: 'Call Scripts',
        href: '/outreach/calls',
        icon: Phone,
        description: 'Manage your call scripts',
      },
      {
        name: 'Social Messages',
        href: '/outreach/messages',
        icon: MessageSquare,
        description: 'Create social media templates',
      },
    ],
  },
  {
    name: 'Management',
    items: [
      {
        name: 'Team',
        href: '/team',
        icon: Users,
        description: 'Manage your team members',
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'Configure your preferences',
      },
    ],
  },
];

function NavSection({ section, isExpanded, onToggle, searchQuery }: { 
  section: NavSection
  isExpanded: boolean
  onToggle: () => void
  searchQuery: string
}) {
  const pathname = usePathname();
  const filteredItems = section.items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (searchQuery && filteredItems.length === 0) return null;

  return (
    <div className="py-1">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg",
          "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
          "hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
        )}
      >
        {section.name}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isExpanded ? "transform rotate-180" : ""
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {filteredItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 mx-2 px-3 py-2 text-sm rounded-lg relative group transition-colors",
                  pathname === item.href
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-50"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 shrink-0",
                  pathname === item.href
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400"
                )} />
                <span className="truncate">{item.name}</span>
                {item.badge && (
                  <span className={cn(
                    "absolute right-2 px-2 py-0.5 text-xs font-medium rounded-full",
                    pathname === item.href
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  )}>
                    {item.badge}
                  </span>
                )}
                {item.description && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-gray-50 text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg">
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Overview',
    'Sales Intelligence',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed lg:sticky lg:top-0 top-0 bottom-0 left-0 z-50',
          'w-[280px] bg-white dark:bg-gray-900',
          'border-r border-gray-200 dark:border-gray-800',
          'transition-transform duration-300 ease-in-out',
          'lg:transform-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'shadow-lg lg:shadow-none',
          className
        )}
      >
        <div className="flex flex-col h-full pt-16 lg:pt-8">
          <div className="px-4 mb-6">
            <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-xl">BruceLeads</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Sales Intelligence Platform
            </p>
          </div>

          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="text"
                placeholder="Search navigation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-gray-100/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="flex-1 px-2 space-y-1 overflow-y-auto">
            {navigation.map((section) => (
              <NavSection
                key={section.name}
                section={section}
                isExpanded={expandedSections.includes(section.name) || searchQuery.length > 0}
                onToggle={() => toggleSection(section.name)}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 