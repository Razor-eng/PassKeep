'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserDetailsForm } from '@/components/user/UserDetailsForm';
import { SecuritySettings } from '@/components/user/SecuritySettings';

export default function UserDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Account Settings</h1>
      <UserDetailsForm />
      <SecuritySettings />
    </div>
  );
}