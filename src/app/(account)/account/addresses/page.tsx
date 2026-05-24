import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { MapPin, Plus } from 'lucide-react';

export const metadata: Metadata = genMeta({
  title: 'My Addresses',
  description: 'Manage your delivery addresses.',
  path: '/account/addresses',
});

const MOCK_ADDRESSES = [
  {
    id: 'addr1',
    fullName: 'Jean Dupont',
    streetLine1: '24 Avenue Montaigne',
    city: 'Paris',
    postalCode: '75008',
    countryCode: 'FR',
    phoneNumber: '+33 6 12 34 56 78',
    defaultShippingAddress: true,
    defaultBillingAddress: true,
  },
];

export default function AddressesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-light">Addresses</h1>
        <button
          type="button"
          className="flex items-center gap-2 text-label-luxury text-muted-foreground hover:text-foreground transition-colors"
        >
          <Plus size={14} />
          Add Address
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_ADDRESSES.map((addr) => (
          <div key={addr.id} className="border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <MapPin size={16} className="text-muted-foreground mt-0.5" />
              <div className="flex gap-3 text-xs text-muted-foreground">
                {addr.defaultShippingAddress && <span className="text-accent">Default Shipping</span>}
                {addr.defaultBillingAddress && <span>Default Billing</span>}
              </div>
            </div>
            <div className="space-y-1 text-sm font-light">
              <p className="text-foreground font-normal">{addr.fullName}</p>
              <p className="text-muted-foreground">{addr.streetLine1}</p>
              <p className="text-muted-foreground">
                {addr.postalCode} {addr.city}
              </p>
              <p className="text-muted-foreground">{addr.countryCode}</p>
              {addr.phoneNumber && (
                <p className="text-muted-foreground pt-2">{addr.phoneNumber}</p>
              )}
            </div>
            <div className="flex gap-4 mt-5 pt-4 border-t border-border">
              <button type="button" className="text-xs text-foreground hover:text-accent transition-colors">
                Edit
              </button>
              <button type="button" className="text-xs text-muted-foreground hover:text-red-500 transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="border border-dashed border-border p-6 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-200 min-h-[160px]"
        >
          <Plus size={20} />
          <span className="text-label-luxury">Add New Address</span>
        </button>
      </div>
    </div>
  );
}
