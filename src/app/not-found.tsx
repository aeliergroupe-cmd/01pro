import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gutter-x">
      <div className="text-center max-w-md">
        <span className="text-label-luxury text-muted-foreground block mb-4">404</span>
        <h1 className="font-serif text-5xl font-light mb-4">
          Page Not <em className="italic">Found</em>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The page you are looking for may have been moved, or the address entered may be incorrect.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/shop"
            className="h-12 px-8 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300 flex items-center"
          >
            Explore the Collection
          </Link>
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
