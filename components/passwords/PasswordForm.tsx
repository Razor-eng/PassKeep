'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { savePassword } from '@/lib/storage';
import { generateId } from '@/lib/utils';

export function PasswordForm() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('currentUser');
    if (!userId) return;

    const passwordEntry = {
      id: generateId(),
      ...formData,
      userId,
      createdAt: new Date().toISOString()
    };

    savePassword(passwordEntry);
    setFormData({ name: '', password: '', note: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Gmail, Facebook"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              placeholder="Add any additional notes..."
            />
          </div>
          <Button type="submit" size={'lg'} className="w-full">
            Save Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}