'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer } from '@/styles/motion';

interface FacetGroup {
  name: string;
  code: string;
  values: { id: string; name: string; count: number }[];
}

interface CategoryFilterProps {
  facetGroups: FacetGroup[];
  selectedFacetIds: string[];
}

export function CategoryFilter({ facetGroups, selectedFacetIds }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggleFacet(facetValueId: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll('facet');

    if (current.includes(facetValueId)) {
      params.delete('facet');
      current.filter((id) => id !== facetValueId).forEach((id) => params.append('facet', id));
    } else {
      params.append('facet', facetValueId);
    }

    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('facet');
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <motion.aside
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {selectedFacetIds.length > 0 && (
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-label-luxury text-muted-foreground">Active Filters</span>
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFacetIds.map((id) => {
              const facetValue = facetGroups
                .flatMap((g) => g.values)
                .find((v) => v.id === id);
              if (!facetValue) return null;
              return (
                <button
                  key={id}
                  onClick={() => toggleFacet(id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1',
                    'text-xs font-medium text-foreground',
                    'bg-surface-raised border border-border-strong',
                    'hover:border-foreground transition-colors duration-200'
                  )}
                >
                  {facetValue.name}
                  <X size={10} />
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {facetGroups.map((group) => (
        <motion.div key={group.code} variants={fadeUp} className="mb-8">
          <p className="text-label-luxury text-muted-foreground mb-4">{group.name}</p>
          <ul className="space-y-2">
            {group.values.map((value) => {
              const isActive = selectedFacetIds.includes(value.id);
              return (
                <li key={value.id}>
                  <button
                    onClick={() => toggleFacet(value.id)}
                    className={cn(
                      'w-full flex items-center justify-between',
                      'py-2 border-b border-border/60',
                      'text-sm font-light text-left',
                      'transition-colors duration-200',
                      isActive
                        ? 'text-foreground border-foreground/40'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          'size-3.5 border flex-none transition-colors duration-200',
                          isActive
                            ? 'bg-foreground border-foreground'
                            : 'border-border-strong'
                        )}
                      />
                      {value.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{value.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </motion.aside>
  );
}
