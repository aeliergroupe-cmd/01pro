import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';
import { DashboardOverview } from '@/components/account/DashboardOverview';

export const metadata: Metadata = genMeta({
  title: 'My Account',
  description: 'Manage your ATELIER GROUPE account.',
  path: '/account',
});

export default function AccountPage() {
  return <DashboardOverview />;
}
