'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Key } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('currentUser');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <Key className="h-12 w-12 text-primary animate-pulse" />
      </div>
    </div>
  );
}