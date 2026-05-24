'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center gutter-x">
      <div className="text-center max-w-md">
        <span className="text-label-luxury text-muted-foreground block mb-4">Something went wrong</span>
        <h1 className="font-serif text-4xl font-light mb-4">Unexpected Error</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          We apologise for the inconvenience. Our team has been notified and will resolve this promptly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="h-12 px-8 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="h-12 px-8 border border-border text-label-luxury text-foreground hover:border-foreground transition-colors duration-300 flex items-center"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
