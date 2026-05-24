export const SITE_NAME = process.env['NEXT_PUBLIC_SITE_NAME'] ?? 'ATELIER GROUPE';
export const SITE_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://ateliergroupe.com';
export const SITE_DESCRIPTION =
  'A modern European luxury tailoring maison. Discover bespoke menswear crafted with uncompromising precision.';

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/ateliergroupe',
  linkedin: 'https://linkedin.com/company/ateliergroupe',
} as const;

export const CONTACT = {
  email: 'maison@ateliergroupe.com',
  phone: '+33 1 42 60 00 00',
  address: {
    street: '12 Rue du Faubourg Saint-Honoré',
    city: 'Paris',
    postcode: '75008',
    country: 'France',
  },
} as const;

export const ATELIERS = [
  {
    id: 'paris',
    name: 'Paris Maison',
    address: '12 Rue du Faubourg Saint-Honoré, 75008 Paris',
    phone: '+33 1 42 60 00 00',
    hours: 'Mon–Sat, 10:00–19:00',
  },
  {
    id: 'milan',
    name: 'Milan Atelier',
    address: 'Via Montenapoleone 8, 20121 Milan',
    phone: '+39 02 7600 0000',
    hours: 'Mon–Sat, 10:00–19:00',
  },
  {
    id: 'london',
    name: 'London Studio',
    address: '14 Mount Street, London W1K 2RN',
    phone: '+44 20 7000 0000',
    hours: 'Mon–Sat, 10:00–18:30',
  },
] as const;

export const NAV_COLLECTIONS = [
  { label: 'The Atelier Collection', href: '/collections/atelier-collection' },
  { label: 'Riviera Voyage', href: '/collections/riviera-voyage' },
  { label: 'Maison Hiver', href: '/collections/maison-hiver' },
  { label: 'The Foundation', href: '/collections/the-foundation' },
] as const;

export const NAV_CATEGORIES = [
  { label: 'Suits', href: '/shop?category=suits' },
  { label: 'Outerwear', href: '/shop?category=outerwear' },
  { label: 'Blazers & Sport Coats', href: '/shop?category=blazers' },
  { label: 'Trousers', href: '/shop?category=trousers' },
  { label: 'Knitwear', href: '/shop?category=knitwear' },
  { label: 'Shirts', href: '/shop?category=shirts' },
] as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections/atelier-collection' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
  { label: 'Appointment', href: '/appointment' },
] as const;

export const ACCOUNT_NAV = [
  { label: 'Overview', href: '/account', icon: 'LayoutDashboard' },
  { label: 'Orders', href: '/account/orders', icon: 'Package' },
  { label: 'Measurements', href: '/account/measurements', icon: 'Ruler' },
  { label: 'Addresses', href: '/account/addresses', icon: 'MapPin' },
  { label: 'Wishlist', href: '/account/wishlist', icon: 'Heart' },
  { label: 'Appointments', href: '/account/appointments', icon: 'CalendarDays' },
  { label: 'Client Advisor', href: '/account/advisor', icon: 'MessageSquare' },
] as const;

export const VIP_TIERS = {
  DISCOVERY: { name: 'Discovery', minSpend: 0, color: 'stone' },
  MAISON: { name: 'Maison', minSpend: 5000, color: 'gold' },
  ATELIER: { name: 'Atelier', minSpend: 15000, color: 'gold-deep' },
  BESPOKE: { name: 'Bespoke', minSpend: 30000, color: 'charcoal' },
} as const;

export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Maison Delivery',
    description: '3–5 business days',
    price: 0,
    freeAbove: 50000,
  },
  {
    id: 'express',
    name: 'Priority Delivery',
    description: '1–2 business days',
    price: 2500,
    freeAbove: null,
  },
  {
    id: 'same-day',
    name: 'Same-Day Atelier',
    description: 'Paris & London only — order before 12:00',
    price: 5000,
    freeAbove: null,
  },
] as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const SUIT_SIZES = [
  '36R', '38R', '40R', '42R', '44R', '46R', '48R',
  '36L', '38L', '40L', '42L', '44L', '46L',
  '36S', '38S', '40S', '42S', '44S',
] as const;

export const TROUSER_SIZES = [
  '28/30', '29/30', '30/30', '31/30', '32/30', '33/30', '34/30', '36/30',
  '28/32', '30/32', '32/32', '34/32', '36/32',
  '30/34', '32/34', '34/34',
] as const;

export const DEFAULT_REVALIDATION = 3600; // 1 hour for product/editorial pages
