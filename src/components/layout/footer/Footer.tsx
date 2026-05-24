import Link from 'next/link';
import { CONTACT, ATELIERS, SOCIAL_LINKS } from '@/lib/constants';
import { NewsletterModule } from './NewsletterModule';
import { LuxuryDivider } from '@/components/shared/LuxuryDivider';

const FOOTER_NAV = {
  Maison: [
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Careers', href: '/careers' },
    { label: 'Sustainability', href: '/sustainability' },
  ],
  Services: [
    { label: 'Made-to-Measure', href: '/services/made-to-measure' },
    { label: 'Bespoke', href: '/services/bespoke' },
    { label: 'Appointments', href: '/appointment' },
    { label: 'Alterations', href: '/services/alterations' },
  ],
  Support: [
    { label: 'Client Services', href: '/support' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Care Guide', href: '/care-guide' },
    { label: 'Returns', href: '/returns' },
  ],
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      {/* Newsletter */}
      <div className="gutter-x py-16 border-b border-border">
        <div className="max-w-screen-xl mx-auto">
          <NewsletterModule />
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="gutter-x py-14 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif font-light text-xl tracking-[0.22em] uppercase text-foreground">
                Atelier Groupe
              </span>
            </Link>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 max-w-xs">
              A modern European luxury tailoring maison. Precision craftsmanship, enduring materials,
              and a commitment to the art of dressing well.
            </p>
            <div className="space-y-1">
              <p className="text-label-luxury text-muted-foreground mb-3">Ateliers</p>
              {ATELIERS.map((atelier) => (
                <div key={atelier.id} className="text-xs text-foreground-secondary">
                  <span className="font-medium">{atelier.name}</span>
                  <span className="text-muted-foreground"> — {atelier.address.split(',')[1]?.trim() ?? atelier.address}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {Object.entries(FOOTER_NAV).map(([category, links]) => (
            <div key={category}>
              <p className="text-label-luxury text-foreground mb-5">{category}</p>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <LuxuryDivider className="mx-[var(--space-gutter)]" />

      {/* Bottom Bar */}
      <div className="gutter-x py-6 max-w-screen-xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Atelier Groupe. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
            <div className="flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                aria-label="Follow on Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
