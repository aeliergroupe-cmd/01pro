import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { RegisterForm } from '@/components/account/RegisterForm';

export const metadata: Metadata = genMeta({
  title: 'Create Account',
  description: 'Create your ATELIER GROUPE account for personalised service.',
  path: '/register',
});

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-10">
        <span className="text-label-luxury text-muted-foreground block mb-3">Begin Your Journey</span>
        <h1 className="font-serif text-3xl font-light">Create Account</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Join ATELIER GROUPE for access to exclusive pieces and personal styling services.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
