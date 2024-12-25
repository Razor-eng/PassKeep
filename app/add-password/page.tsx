'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordForm } from '@/components/passwords/PasswordForm';

export default function AddPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="h-full w-full space-y-8">
      <h1 className="text-2xl font-bold">Password Manager</h1>
      <PasswordForm />
    </div>
  );
}