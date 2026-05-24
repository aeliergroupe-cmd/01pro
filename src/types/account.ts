export interface Address {
  id: string;
  fullName: string;
  company?: string;
  streetLine1: string;
  streetLine2?: string;
  city: string;
  province?: string;
  postalCode: string;
  countryCode: string;
  phoneNumber?: string;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
}

export interface Customer {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  addresses: Address[];
  customFields?: {
    vipTier?: string;
    clientAdvisorId?: string;
    preferredAtelier?: string;
    totalLifetimeSpend?: number;
  };
}

export interface OrderLine {
  id: string;
  quantity: number;
  unitPriceWithTax: number;
  linePriceWithTax: number;
  productVariant: {
    id: string;
    name: string;
    sku: string;
    product: {
      id: string;
      name: string;
      slug: string;
      featuredAsset?: { preview: string } | null;
    };
  };
}

export interface Order {
  id: string;
  code: string;
  state: string;
  totalWithTax: number;
  currencyCode: string;
  createdAt: string;
  updatedAt: string;
  lines: OrderLine[];
  shippingAddress?: {
    fullName: string;
    streetLine1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  payments?: Array<{
    id: string;
    method: string;
    amount: number;
    state: string;
  }>;
}

export interface TailoringMeasurements {
  chest?: number;
  waist?: number;
  hips?: number;
  shoulders?: number;
  sleeveLength?: number;
  inseam?: number;
  outseam?: number;
  thigh?: number;
  neck?: number;
  height?: number;
  weight?: number;
  fittingType?: 'slim' | 'regular' | 'relaxed';
  notes?: string;
}

export interface TailoringProfile {
  measurements: TailoringMeasurements;
  fabricPreferences: string[];
  stylePreferences: string[];
  colorPreferences: string[];
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantId: string;
  priceWithTax: number;
  currencyCode: string;
  imageUrl?: string;
  addedAt: string;
}

export interface Appointment {
  id: string;
  type: 'fitting' | 'consultation' | 'bespoke' | 'collection-viewing';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  atelier: string;
  date: string;
  time: string;
  advisorName?: string;
  notes?: string;
  createdAt: string;
}

export interface AdvisorMessage {
  id: string;
  content: string;
  sender: 'customer' | 'advisor';
  senderName: string;
  timestamp: string;
  read: boolean;
}

export type VipTier = 'DISCOVERY' | 'MAISON' | 'ATELIER' | 'BESPOKE';

export interface VipStatus {
  tier: VipTier;
  totalSpend: number;
  nextTierThreshold: number;
  joinedAt: string;
  benefits: string[];
}

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  vendureToken?: string;
  vipTier?: VipTier;
}
