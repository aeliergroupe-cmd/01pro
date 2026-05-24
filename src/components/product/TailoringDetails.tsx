'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProductCustomFields } from '@/types/product';

interface TailoringDetailsProps {
  customFields: ProductCustomFields;
}

interface DetailGroup {
  label: string;
  items: { term: string; value: string }[];
}

export function TailoringDetails({ customFields }: TailoringDetailsProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const groups: DetailGroup[] = [
    {
      label: 'Construction',
      items: [
        customFields.constructionNotes
          ? { term: 'Construction', value: customFields.constructionNotes }
          : null,
        customFields.tailoringTime
          ? { term: 'Made-to-Measure', value: customFields.tailoringTime }
          : null,
        customFields.fittingType
          ? { term: 'Fit', value: customFields.fittingType }
          : null,
        customFields.madeIn
          ? { term: 'Origin', value: customFields.madeIn }
          : null,
      ].filter(Boolean) as { term: string; value: string }[],
    },
    {
      label: 'Materials',
      items: [
        customFields.fabricComposition
          ? { term: 'Fabric', value: customFields.fabricComposition }
          : null,
        customFields.liningComposition
          ? { term: 'Lining', value: customFields.liningComposition }
          : null,
        customFields.weightGsm
          ? { term: 'Weight', value: `${customFields.weightGsm} gsm` }
          : null,
      ].filter(Boolean) as { term: string; value: string }[],
    },
    {
      label: 'Care',
      items: [
        customFields.careInstructions
          ? { term: 'Instructions', value: customFields.careInstructions }
          : null,
      ].filter(Boolean) as { term: string; value: string }[],
    },
  ].filter((g) => g.items.length > 0);

  return (
    <div className="border-t border-border">
      {groups.map((group) => (
        <div key={group.label} className="border-b border-border">
          <button
            type="button"
            onClick={() => setOpenSection(openSection === group.label ? null : group.label)}
            className="w-full flex items-center justify-between py-4 text-left group"
          >
            <span className="text-label-luxury text-foreground group-hover:text-accent transition-colors duration-200">
              {group.label}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                'text-muted-foreground transition-transform duration-300',
                openSection === group.label && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSection === group.label && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                className="overflow-hidden"
              >
                <dl className="pb-6 space-y-3">
                  {group.items.map((item) => (
                    <div key={item.term} className="grid grid-cols-[120px_1fr] gap-4">
                      <dt className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {item.term}
                      </dt>
                      <dd className="text-sm text-foreground font-light">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
