'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/storage';
import type { User } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { useTheme } from 'next-themes';

export function UserDetailsForm() {
  const [user, setUser] = useState<User | null>(null);
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (value: string) => {
    setTheme(value)
  }

  useEffect(() => {
    const email = localStorage.getItem('currentUser');
    if (email) {
      const userData = getUser(email);
      setUser(userData);
    }
  }, []);

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={user.username}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger>
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Theme</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}