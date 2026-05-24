import Link from 'next/link';
import { CartDrawer } from '@/components/cart/CartDrawer';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="gutter-x py-5 border-b border-border flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-light tracking-tight">
          ATELIER GROUPE
        </Link>
        <span className="text-label-luxury text-muted-foreground">Secure Checkout</span>
      </header>
      <main>{children}</main>
      <CartDrawer />
    </div>
  );
}
