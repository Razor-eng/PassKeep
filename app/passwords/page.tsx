'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordList } from '@/components/passwords/PasswordList';

export default function AddPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="space-y-8 w-full h-full flex flex-col">
      <h1 className="text-2xl font-bold">Passwords</h1>
      <div className="flex-1 my-8 overflow-y-auto">
        <PasswordList />
      </div>
    </div>
  );
}