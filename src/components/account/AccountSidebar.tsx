'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ACCOUNT_NAV } from '@/lib/constants';
import { LogOut } from 'lucide-react';

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside>
      <div className="mb-8">
        <span className="text-label-luxury text-muted-foreground block mb-1">My Account</span>
        <p className="font-serif text-xl font-light">Jean Dupont</p>
        <p className="text-xs text-muted-foreground mt-1">Maison Member</p>
      </div>

      <nav className="space-y-1">
        {ACCOUNT_NAV.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200',
                isActive
                  ? 'text-foreground border-l-2 border-accent pl-[10px]'
                  : 'text-muted-foreground hover:text-foreground border-l-2 border-transparent hover:border-border pl-[10px]'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-6 border-t border-border">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
