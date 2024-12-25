'use client';

import { AuthForm } from '@/components/auth/AuthForm';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center p-2 w-full h-full">
      <AuthForm mode="signin" />
    </div>
  );
}