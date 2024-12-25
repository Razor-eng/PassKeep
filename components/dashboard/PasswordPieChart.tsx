'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPasswords } from '@/lib/storage';
import { useEffect, useState } from 'react';

interface ChartData {
  name: string;
  value: number;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function PasswordPieChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('currentUser');
    if (!userId) return;

    const passwords = getPasswords(userId);
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonth = passwords.filter(p => new Date(p.createdAt) >= monthStart).length;
    const lastMonth = passwords.filter(p => {
      const date = new Date(p.createdAt);
      return date >= lastMonthStart && date < monthStart;
    }).length;

    setData([
      { name: 'This Month', value: thisMonth },
      { name: 'Last Month', value: lastMonth },
    ]);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Password Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}