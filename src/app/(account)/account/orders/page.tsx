import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { formatPrice, formatDate } from '@/lib/utils';
import { MOCK_ORDERS } from '@/lib/vendure/mock-data';
import Link from 'next/link';

export const metadata: Metadata = genMeta({
  title: 'My Orders',
  description: 'View your ATELIER GROUPE order history.',
  path: '/account/orders',
});

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-light mb-8">Order History</h1>

      {MOCK_ORDERS.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <p className="font-serif text-xl font-light text-foreground mb-2">No orders yet</p>
          <p className="text-sm text-muted-foreground mb-6">
            Your orders will appear here once you've made a purchase.
          </p>
          <Link
            href="/shop"
            className="inline-block h-12 px-8 bg-foreground text-background text-label-luxury flex items-center hover:bg-accent transition-colors duration-300"
          >
            Explore the Collection
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-label-luxury text-muted-foreground mb-1">Order</p>
                  <p className="font-serif text-lg font-light">{order.code}</p>
                </div>
                <div className="text-right">
                  <span className="text-label-luxury text-muted-foreground capitalize block mb-1">
                    {order.state}
                  </span>
                  <p className="text-sm text-foreground">{formatPrice(order.totalWithTax, order.currencyCode)}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-4">{formatDate(order.createdAt)}</p>

              <div className="border-t border-border pt-4 space-y-2">
                {order.lines.map((line) => (
                  <div key={line.id} className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-light">
                      {line.productVariant.product.name} — {line.productVariant.name}
                      {line.quantity > 1 && ` ×${line.quantity}`}
                    </span>
                    <span className="text-muted-foreground">
                      {formatPrice(line.linePriceWithTax, order.currencyCode)}
                    </span>
                  </div>
                ))}
              </div>

              {order.shippingAddress && (
                <div className="border-t border-border pt-4 mt-4 text-xs text-muted-foreground">
                  Shipped to {order.shippingAddress.fullName}, {order.shippingAddress.city}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
