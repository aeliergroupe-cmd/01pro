'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'name-asc', label: 'Name A–Z' },
] as const;

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') ?? '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set('sort', e.target.value);
    } else {
      params.delete('sort');
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-label-luxury text-muted-foreground hidden sm:inline">Sort</span>
      <select
        value={currentSort}
        onChange={handleChange}
        className={cn(
          'bg-transparent border border-border',
          'text-sm text-foreground font-light',
          'px-3 py-2 pr-8',
          'appearance-none cursor-pointer',
          'hover:border-foreground transition-colors duration-200',
          'focus:outline-none focus:border-accent',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%238b7d6b\' stroke-width=\'1.5\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_10px_center]'
        )}
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
