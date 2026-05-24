import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedAt?: string;
  authors?: string[];
}

export function generateMetadata(options: GenerateMetadataOptions = {}): Metadata {
  const {
    title,
    description = SITE_DESCRIPTION,
    image = `${SITE_URL}/images/og-default.jpg`,
    path = '',
    noIndex = false,
    type = 'website',
    publishedAt,
    authors,
  } = options;

  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      type: type === 'article' ? 'article' : 'website',
      ...(type === 'article' && publishedAt
        ? { publishedTime: publishedAt, authors: authors ?? [SITE_NAME] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const ROOT_METADATA: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};
