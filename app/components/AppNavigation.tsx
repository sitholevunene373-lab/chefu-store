import { Link, useLocation } from 'react-router';
import { Home, Grid3x3, Library, Settings, Package } from 'lucide-react';
import { cn } from './ui/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/browse', icon: Grid3x3, label: 'Browse' },
  { path: '/library', icon: Library, label: 'Library' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export function AppNavigation() {
  const location = useLocation();

  return (
    <div className="w-60 border-r border-sidebar-border bg-sidebar flex flex-col h-screen">
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
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
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
    </div>
  );
}
