import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AccountSidebar } from '@/components/account/AccountSidebar';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <div className="gutter-x py-12 max-w-screen-xl mx-auto">
          <div className="grid lg:grid-cols-[240px_1fr] gap-12">
            <AccountSidebar />
            <div>{children}</div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
