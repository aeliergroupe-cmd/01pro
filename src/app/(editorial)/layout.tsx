import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export default function EditorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
