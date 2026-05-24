'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/actions/newsletter';

export function NewsletterModule() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const result = await subscribeNewsletter(email);
    setStatus(result.success ? 'success' : 'error');
    if (result.success) setEmail('');
  }

  return (
    <div>
      <p className="text-label-luxury text-muted-foreground mb-3">The Atelier Letter</p>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        Occasional thoughts on tailoring, craft, and the considered wardrobe.
      </p>

      {status === 'success' ? (
        <p className="text-xs text-accent">Thank you. You will hear from us shortly.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-0">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 h-10 px-3 bg-transparent border border-border text-xs text-foreground font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="h-10 px-4 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300 disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? '…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-xs text-red-500 mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
