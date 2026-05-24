import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { MOCK_ORDERS, MOCK_APPOINTMENTS } from '@/lib/vendure/mock-data';

export function DashboardOverview() {
  const recentOrders = MOCK_ORDERS.slice(0, 2);
  const upcomingAppointment = MOCK_APPOINTMENTS[0];

  return (
    <div>
      <div className="mb-10">
        <span className="text-label-luxury text-muted-foreground block mb-2">Welcome Back</span>
        <h1 className="font-serif text-3xl font-light">Jean</h1>
        <p className="text-sm text-muted-foreground mt-1">Maison Member since 2023</p>
      </div>

      {/* VIP Status bar */}
      <div className="border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-label-luxury text-accent">Maison Tier</span>
            <p className="text-sm text-muted-foreground mt-1">€8,450 lifetime spend</p>
          </div>
          <Link
            href="/account/advisor"
            className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact Advisor →
          </Link>
        </div>
        <div className="w-full bg-surface h-1">
          <div className="bg-accent h-1" style={{ width: '56%' }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground">Maison — €5,000</span>
          <span className="text-xs text-muted-foreground">Atelier — €15,000</span>
        </div>
      </div>

      {/* Quick links grid */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Orders', value: MOCK_ORDERS.length.toString(), href: '/account/orders' },
          { label: 'Wishlist', value: '4 pieces', href: '/account/wishlist' },
          { label: 'Appointments', value: '1 upcoming', href: '/account/appointments' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="border border-border p-5 hover:border-foreground transition-colors duration-200 group"
          >
            <p className="text-label-luxury text-muted-foreground mb-1 group-hover:text-accent transition-colors">
              {item.label}
            </p>
            <p className="font-serif text-xl font-light">{item.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-light">Recent Orders</h2>
          <Link
            href="/account/orders"
            className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="border border-border p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground font-light">Order {order.code}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground">{formatPrice(order.totalWithTax, order.currencyCode)}</p>
                <span className="text-xs text-muted-foreground capitalize">{order.state}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointment */}
      {upcomingAppointment && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-light">Upcoming Appointment</h2>
            <Link
              href="/account/appointments"
              className="text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="border border-border p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-label-luxury text-accent capitalize">{upcomingAppointment.type.replace('-', ' ')}</p>
                <p className="font-serif text-lg font-light mt-1">{upcomingAppointment.atelier}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {formatDate(upcomingAppointment.date)} · {upcomingAppointment.time}
                </p>
                {upcomingAppointment.advisorName && (
                  <p className="text-xs text-muted-foreground mt-1">
                    With {upcomingAppointment.advisorName}
                  </p>
                )}
              </div>
              <span className="text-label-luxury text-green-600 capitalize">
                {upcomingAppointment.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
