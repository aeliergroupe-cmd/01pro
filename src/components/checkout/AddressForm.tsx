'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AddressFormProps {
  onSubmit: (data: Record<string, string>) => void;
}

const COUNTRIES = [
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IT', name: 'Italy' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'US', name: 'United States' },
  { code: 'CH', name: 'Switzerland' },
];

export function AddressForm({ onSubmit }: AddressFormProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetLine1: '',
    streetLine2: '',
    city: '',
    postalCode: '',
    countryCode: 'FR',
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass = cn(
    'w-full h-12 px-4 bg-transparent border border-border',
    'text-sm text-foreground font-light',
    'focus:outline-none focus:border-foreground transition-colors duration-200',
    'placeholder:text-muted-foreground/50'
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-serif text-xl font-light mb-6">Delivery Address</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="text-label-luxury text-foreground block mb-2">First Name</label>
          <input id="firstName" type="text" required value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className={inputClass} placeholder="Jean" />
        </div>
        <div>
          <label htmlFor="lastName" className="text-label-luxury text-foreground block mb-2">Last Name</label>
          <input id="lastName" type="text" required value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className={inputClass} placeholder="Dupont" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-label-luxury text-foreground block mb-2">Email</label>
        <input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} placeholder="your@email.com" />
      </div>

      <div>
        <label htmlFor="phone" className="text-label-luxury text-foreground block mb-2">Phone</label>
        <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} placeholder="+33 6 00 00 00 00" />
      </div>

      <div>
        <label htmlFor="streetLine1" className="text-label-luxury text-foreground block mb-2">Address</label>
        <input id="streetLine1" type="text" required value={form.streetLine1} onChange={(e) => update('streetLine1', e.target.value)} className={inputClass} placeholder="Street address" />
      </div>

      <div>
        <input type="text" value={form.streetLine2} onChange={(e) => update('streetLine2', e.target.value)} className={inputClass} placeholder="Apartment, suite, etc. (optional)" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="text-label-luxury text-foreground block mb-2">City</label>
          <input id="city" type="text" required value={form.city} onChange={(e) => update('city', e.target.value)} className={inputClass} placeholder="Paris" />
        </div>
        <div>
          <label htmlFor="postalCode" className="text-label-luxury text-foreground block mb-2">Postal Code</label>
          <input id="postalCode" type="text" required value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} className={inputClass} placeholder="75008" />
        </div>
      </div>

      <div>
        <label htmlFor="country" className="text-label-luxury text-foreground block mb-2">Country</label>
        <select
          id="country"
          value={form.countryCode}
          onChange={(e) => update('countryCode', e.target.value)}
          className={cn(inputClass, 'appearance-none cursor-pointer')}
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
      >
        Continue to Shipping
      </button>
    </form>
  );
}
