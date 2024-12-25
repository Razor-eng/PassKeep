import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Sidebar } from '@/components/Sidebar';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PassKeep - Secure Password Manager',
  description: 'A secure password manager built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen relative flex flex-col dark:bg-zinc-950">
            <div className="h-full hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
              <Sidebar />
            </div>
            <Navbar />
            <main className="md:pl-72 flex-1 py-4 md:my-0">
              <div className="px-4 md:my-8 sm:px-6 lg:px-8 h-full">
                {children}
              </div>
            </main>
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}