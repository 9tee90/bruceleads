"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command } from "cmdk"
import { 
  Search,
  Home,
  Target,
  Bell,
  Send,
  Users,
  Settings,
  Mail,
  Phone,
  MessageSquare,
  Plus,
  BarChart2
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/Dialog"
import { useHotkeys } from "@/hooks/use-hotkeys"

interface CommandItem {
  title: string;
  onSelect: () => void;
  icon?: React.ElementType;
  shortcut?: string;
  children?: string;
}

interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

export function CommandMenu() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  useHotkeys("meta+k", () => setOpen((open) => !open))
  useHotkeys("meta+/", () => setOpen((open) => !open))
  useHotkeys("escape", () => setOpen(false))

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const groups: CommandGroup[] = React.useMemo(() => [
    {
      heading: "Navigation",
      items: [
        {
          title: "Go to Dashboard",
          onSelect: () => runCommand(() => router.push("/dashboard")),
          icon: Home,
          children: "View your sales intelligence overview",
        },
        {
          title: "View Analytics",
          onSelect: () => runCommand(() => router.push("/analytics")),
          icon: BarChart2,
          children: "Check your performance metrics",
        },
        {
          title: "Target Companies",
          onSelect: () => runCommand(() => router.push("/targets")),
          icon: Target,
          children: "Manage your target accounts",
        },
        {
          title: "Check Alerts",
          onSelect: () => runCommand(() => router.push("/alerts")),
          icon: Bell,
          children: "View and manage trigger events",
        },
      ],
    },
    {
      heading: "Quick Actions",
      items: [
        {
          title: "New Email Campaign",
          onSelect: () => runCommand(() => router.push("/outreach/email/new")),
          icon: Mail,
          children: "Start a new email outreach campaign",
        },
        {
          title: "Add Target Company",
          onSelect: () => runCommand(() => router.push("/targets/new")),
          icon: Plus,
          children: "Add a new company to your targets",
        },
        {
          title: "Create Call Script",
          onSelect: () => runCommand(() => router.push("/outreach/calls/new")),
          icon: Phone,
          children: "Create a new call script template",
        },
        {
          title: "Social Message",
          onSelect: () => runCommand(() => router.push("/outreach/messages/new")),
          icon: MessageSquare,
          children: "Create a new social message template",
        },
      ],
    },
    {
      heading: "Settings",
      items: [
        {
          title: "Team Management",
          onSelect: () => runCommand(() => router.push("/team")),
          icon: Users,
          children: "Manage your team members and roles",
        },
        {
          title: "App Settings",
          onSelect: () => runCommand(() => router.push("/settings")),
          icon: Settings,
          children: "Configure your app preferences",
        },
        {
          title: "Campaign Settings",
          onSelect: () => runCommand(() => router.push("/outreach/settings")),
          icon: Send,
          children: "Configure your outreach settings",
        },
      ],
    },
  ], [router, runCommand])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-700/50 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline">Quick search...</span>
        <kbd className="hidden rounded bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-500 dark:text-gray-400 md:inline">
          ⌘K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <Command
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 dark:text-gray-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
            value={search}
            onValueChange={setSearch}
          >
            <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                placeholder="Type a command or search..."
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                autoFocus
              />
            </div>
            <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden">
              <Command.Empty>No results found.</Command.Empty>
              {groups.map((group) => (
                <Command.Group key={group.heading} heading={group.heading}>
                  {group.items.map((item) => (
                    <Command.Item
                      key={item.title}
                      onSelect={() => item.onSelect()}
                      className="relative flex cursor-default select-none items-center rounded-md px-2 py-2.5 text-sm outline-none aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 group"
                    >
                      {item.icon && (
                        <item.icon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400 group-aria-selected:text-gray-900 dark:group-aria-selected:text-gray-50" />
                      )}
                      <span className="font-medium">{item.title}</span>
                      {item.children && (
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.children}
                        </span>
                      )}
                      {item.shortcut && (
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                          {item.shortcut}
                        </span>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
} 