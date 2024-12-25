'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPasswords } from '@/lib/storage';
import { useEffect, useState } from 'react';

interface ChartData {
  name: string;
  count: number;
}

export function PasswordBarChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('currentUser');
    if (!userId) return;

    const passwords = getPasswords(userId);
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailyCounts = last7Days.map(day => ({
      name: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
      count: passwords.filter(p => p.createdAt.startsWith(day)).length
    }));

    setData(dailyCounts);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passwords Added (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}