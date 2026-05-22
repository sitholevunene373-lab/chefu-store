'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3x3, Library, Settings, Package, Menu, X } from 'lucide-react';
import { cn } from './ui/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/browse', icon: Grid3x3, label: 'Browse' },
  { path: '/library', icon: Library, label: 'Library' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const NavContent = ({ pathname, onClose }: { pathname: string; onClose?: () => void }) => (
  <>
    <div className="p-6 border-b border-sidebar-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Package className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-lg">CheFu Store</h1>
          <p className="text-xs text-muted-foreground">Software Marketplace</p>
        </div>
      </div>
    </div>

    <nav className="flex-1 p-4">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    <div className="p-4 border-t border-sidebar-border">
      <div className="px-3 py-2 rounded-lg bg-muted/50">
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>
    </div>
  </>
);

export function AppNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-sidebar-border bg-sidebar flex items-center px-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground"
            >
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 p-0">
            <div className="flex flex-col h-full bg-sidebar">
              <NavContent pathname={pathname} onClose={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold ml-4">CheFu Store</h1>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-60 border-r border-sidebar-border bg-sidebar flex-col h-screen">
        <NavContent pathname={pathname} />
      </div>
    </>
  );
}
