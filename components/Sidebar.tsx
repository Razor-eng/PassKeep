'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Home,
  Key,
  KeyRound,
  LogIn,
  LogOut,
  PlusCircle,
  Settings,
  UserPlus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    protected: true,
  },
  {
    label: 'Add Password',
    icon: PlusCircle,
    href: '/add-password',
    protected: true,
  },
  {
    label: 'Passwords',
    icon: KeyRound,
    href: '/passwords',
    protected: true,
  },
  {
    label: 'User Details',
    icon: Settings,
    href: '/user-details',
    protected: true,
  },
  {
    label: 'Sign Up',
    icon: UserPlus,
    href: '/signup',
    protected: false,
  },
  {
    label: 'Sign In',
    icon: LogIn,
    href: '/signin',
    protected: false,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = localStorage.getItem('currentUser');
    setIsAuthenticated(!!user);
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    toast.success('Signed out successfully');
    window.location.href = '/signin';
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-zinc-100 dark:bg-zinc-900 border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center justify-center mb-14 text-[#3a66c4]">
          <Key />
          <h1 className="text-2xl font-bold ml-2">PassKeep</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            if (route.protected && !isAuthenticated) return null;
            if (!route.protected && isAuthenticated) return null;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                  pathname === route.href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className="h-5 w-5 mr-3" />
                  {route.label}
                </div>
              </Link>
            );
          })}
          {isAuthenticated && (
            <button
              onClick={handleSignOut}
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition text-muted-foreground"
            >
              <div className="flex items-center flex-1">
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}