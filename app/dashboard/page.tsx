'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PasswordBarChart } from '@/components/dashboard/PasswordBarChart';
import { PasswordPieChart } from '@/components/dashboard/PasswordPieChart';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="space-y-8 w-full h-full">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid lg:grid-cols-2 gap-6 w-full">
        <PasswordBarChart />
        <PasswordPieChart />
      </div>
    </div>
  );
}