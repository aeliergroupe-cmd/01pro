import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { AdvisorChat } from '@/components/account/AdvisorChat';

export const metadata: Metadata = genMeta({
  title: 'Client Advisor',
  description: 'Connect with your personal ATELIER GROUPE advisor.',
  path: '/account/advisor',
});

export default function AdvisorPage() {
  return (
    <div>
      <div className="mb-8">
        <span className="text-label-luxury text-muted-foreground block mb-2">Personal Service</span>
        <h1 className="font-serif text-2xl font-light">Client Advisor</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your dedicated advisor, Alexandre Moreau, is available to assist with styling, fittings, and bespoke enquiries.
        </p>
      </div>
      <AdvisorChat />
    </div>
  );
}
