'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductCustomFields } from '@/types/product';

interface FabricCompositionProps {
  customFields: ProductCustomFields;
}

interface Section {
  id: string;
  label: string;
  content: string | null | undefined;
}

export function FabricComposition({ customFields }: FabricCompositionProps) {
  const [openId, setOpenId] = useState<string | null>('fabric');

  const sections: Section[] = [
    {
      id: 'fabric',
      label: 'Fabric & Composition',
      content: customFields.fabricComposition,
    },
    {
      id: 'construction',
      label: 'Construction',
      content: customFields.constructionNotes ?? buildConstructionText(customFields),
    },
    {
      id: 'care',
      label: 'Care Instructions',
      content: customFields.careInstructions,
    },
    {
      id: 'origin',
      label: 'Origin & Craft',
      content: buildOriginText(customFields),
    },
  ].filter((s) => s.content);

  function toggle(id: string) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <div className="border-t border-border">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border">
          <button
            onClick={() => toggle(section.id)}
            className={cn(
              'w-full flex items-center justify-between py-4',
              'text-left transition-colors duration-200',
              'hover:text-accent'
            )}
            aria-expanded={openId === section.id}
          >
            <span className="text-label-luxury text-foreground">{section.label}</span>
            <motion.span
              animate={{ rotate: openId === section.id ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground"
            >
              <Plus size={14} strokeWidth={1.5} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openId === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm text-muted-foreground font-light leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function buildConstructionText(cf: ProductCustomFields): string | null {
  const parts: string[] = [];
  if (cf.fittingType) parts.push(`${capitalize(cf.fittingType)} fitting silhouette.`);
  if (cf.liningComposition) parts.push(`Lined in ${cf.liningComposition.toLowerCase()}.`);
  if (cf.weightGsm) parts.push(`Fabric weight: ${cf.weightGsm} g/m².`);
  return parts.length > 0 ? parts.join(' ') : null;
}

function buildOriginText(cf: ProductCustomFields): string | null {
  const parts: string[] = [];
  if (cf.madeIn) parts.push(cf.madeIn + '.');
  if (cf.tailoringTime) parts.push(cf.tailoringTime + '.');
  return parts.length > 0 ? parts.join(' ') : null;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
