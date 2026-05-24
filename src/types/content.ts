export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  coverImage: string;
  coverImageAlt: string;
  category: ArticleCategory;
  author: ArticleAuthor;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  tags: string[];
}

export type ArticleCategory =
  | 'campaign'
  | 'tailoring'
  | 'craft'
  | 'travel'
  | 'style'
  | 'atelier';

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  season: string;
  year: number;
  heroImage: string;
  heroVideo?: string;
  description: string;
  collections: string[];
  lookbook: LookbookItem[];
}

export interface LookbookItem {
  id: string;
  image: string;
  imageAlt: string;
  products: Array<{
    id: string;
    name: string;
    slug: string;
    price: number;
    currencyCode: string;
  }>;
  caption?: string;
}

export interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  description: string;
  icon: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingRequest {
  appointmentTypeId: string;
  atelierId: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}
