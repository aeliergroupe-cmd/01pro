'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // In production: call server action loginCustomer()
      await new Promise((r) => setTimeout(r, 800));
      router.push('/account');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="text-label-luxury text-foreground block mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            'w-full h-12 px-4 bg-transparent border border-border',
            'text-sm text-foreground font-light',
            'focus:outline-none focus:border-foreground transition-colors duration-200',
            'placeholder:text-muted-foreground/50'
          )}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="text-label-luxury text-foreground">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            'w-full h-12 px-4 bg-transparent border border-border',
            'text-sm text-foreground font-light',
            'focus:outline-none focus:border-foreground transition-colors duration-200',
            'placeholder:text-muted-foreground/50'
          )}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-light">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full h-12 bg-foreground text-background text-label-luxury',
          'hover:bg-accent transition-colors duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {loading ? 'Signing In…' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        New to ATELIER GROUPE?{' '}
        <Link href="/register" className="text-foreground hover:text-accent transition-colors underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </form>
  );
}
