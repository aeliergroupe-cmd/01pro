import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const orderCode = `AG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return (
    <div className="gutter-x py-24 max-w-screen-xl mx-auto">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 border border-accent flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={24} strokeWidth={0.8} className="text-accent" />
        </div>

        <span className="text-label-luxury text-accent block mb-3">Order Confirmed</span>
        <h1 className="font-serif text-3xl font-light mb-2">
          Thank You for Your <em className="italic">Order</em>
        </h1>
        <p className="text-sm text-muted-foreground mb-2">Order reference: {orderCode}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10">
          A confirmation has been sent to your email address. Your garments will be prepared
          with the utmost care and dispatched within 2–3 business days.
        </p>

        <div className="border border-border p-6 text-left mb-10">
          <p className="text-label-luxury text-muted-foreground mb-4">What Happens Next</p>
          <ol className="space-y-3">
            {[
              { step: '01', text: 'Order confirmation email sent immediately' },
              { step: '02', text: 'Garments inspected and prepared by our team' },
              { step: '03', text: 'Dispatched with DHL Premium or equivalent' },
              { step: '04', text: 'Delivery within 3–5 business days' },
            ].map((item) => (
              <li key={item.step} className="flex items-start gap-4 text-sm">
                <span className="text-label-luxury text-accent flex-none">{item.step}</span>
                <span className="text-muted-foreground font-light">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/account/orders"
            className="h-12 px-8 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300 flex items-center"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="h-12 px-8 border border-border text-label-luxury text-foreground hover:border-foreground transition-colors duration-300 flex items-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
