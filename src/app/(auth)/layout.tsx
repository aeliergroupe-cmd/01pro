import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="gutter-x py-6 border-b border-border flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-light tracking-tight">
          ATELIER GROUPE
        </Link>
        <Link href="/shop" className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors">
          Continue Shopping
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center gutter-x py-16">
        {children}
      </main>
    </div>
  );
}
