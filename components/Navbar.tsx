"use client"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Key, KeyRound, LogIn, LogOut, PlusCircle, Settings, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

export default function Navbar() {
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
        <header className="flex h-14 md:hidden w-full shrink-0 items-center px-4 md:px-6 dark:bg-zinc-950 border-b">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                    <Link href="/" className="flex items-center justify-center mb-14 text-[#3a66c4]">
                        <Key />
                        <h1 className="text-2xl font-bold ml-2">PassKeep</h1>
                    </Link>
                    <div className="grid gap-2 items-center py-6 w-full">
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
                            )
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
                </SheetContent>
            </Sheet>
        </header>
    )
}

interface MenuIconProps extends React.SVGProps<SVGSVGElement> { }

function MenuIcon(props: MenuIconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}