import type { Metadata } from 'next';
import { cormorantGaramond, instrumentSans } from '@/lib/fonts';
import { Providers } from '@/components/layout/Providers';
import { ROOT_METADATA } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${instrumentSans.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
