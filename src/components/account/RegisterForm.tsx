'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await new Promise((r) => setTimeout(r, 900));
      router.push('/account');
    } catch {
      setError('Could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = cn(
    'w-full h-12 px-4 bg-transparent border border-border',
    'text-sm text-foreground font-light',
    'focus:outline-none focus:border-foreground transition-colors duration-200',
    'placeholder:text-muted-foreground/50'
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="text-label-luxury text-foreground block mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className={inputClass}
            placeholder="Jean"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-label-luxury text-foreground block mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className={inputClass}
            placeholder="Dupont"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-label-luxury text-foreground block mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-label-luxury text-foreground block mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
          className={inputClass}
          placeholder="Minimum 8 characters"
        />
      </div>

      {error && <p className="text-xs text-red-500 font-light">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full h-12 bg-foreground text-background text-label-luxury',
          'hover:bg-accent transition-colors duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {loading ? 'Creating Account…' : 'Create Account'}
      </button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="underline underline-offset-4 hover:text-foreground transition-colors">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-foreground hover:text-accent transition-colors underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
