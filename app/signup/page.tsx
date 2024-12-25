'use client';

import { AuthForm } from '@/components/auth/AuthForm';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center md:p-4 w-full h-full">
      <AuthForm mode="signup" />
    </div>
  );
}