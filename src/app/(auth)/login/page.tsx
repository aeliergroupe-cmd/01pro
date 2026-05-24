import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { LoginForm } from '@/components/account/LoginForm';

export const metadata: Metadata = genMeta({
  title: 'Sign In',
  description: 'Sign in to your ATELIER GROUPE account.',
  path: '/login',
});

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-10">
        <span className="text-label-luxury text-muted-foreground block mb-3">Welcome Back</span>
        <h1 className="font-serif text-3xl font-light">Sign In</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Access your orders, measurements, and personal styling.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
