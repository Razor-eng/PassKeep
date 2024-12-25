'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPasswords } from '@/lib/storage';
import type { PasswordEntry } from '@/lib/types';
import { PasswordItem } from './PasswordItem';

export function PasswordList() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('currentUser');
    if (userId) {
      const userPasswords = getPasswords(userId);
      setPasswords(userPasswords);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Passwords</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {passwords.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()).map((password) => (
            <PasswordItem key={password.id} password={password} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}