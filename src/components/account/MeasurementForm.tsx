'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const FIELDS = [
  { key: 'chest', label: 'Chest', unit: 'cm', description: 'Measured around the fullest part of the chest' },
  { key: 'waist', label: 'Waist', unit: 'cm', description: 'Measured at the natural waist' },
  { key: 'hips', label: 'Hips', unit: 'cm', description: 'Measured at the widest point' },
  { key: 'shoulders', label: 'Shoulders', unit: 'cm', description: 'From shoulder seam to shoulder seam' },
  { key: 'sleeveLength', label: 'Sleeve Length', unit: 'cm', description: 'From shoulder to wrist' },
  { key: 'inseam', label: 'Inseam', unit: 'cm', description: 'From crotch to ankle' },
  { key: 'neck', label: 'Neck', unit: 'cm', description: 'Around the neck base' },
  { key: 'height', label: 'Height', unit: 'cm', description: '' },
] as const;

const INITIAL = {
  chest: '98',
  waist: '82',
  hips: '96',
  shoulders: '44',
  sleeveLength: '64',
  inseam: '82',
  neck: '38',
  height: '182',
};

export function MeasurementForm() {
  const [values, setValues] = useState<Record<string, string>>(INITIAL);
  const [fittingType, setFittingType] = useState<'slim' | 'regular' | 'relaxed'>('regular');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  function update(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
  }

  const inputClass = cn(
    'w-full h-10 px-3 bg-transparent border border-border',
    'text-sm text-foreground font-light text-right',
    'focus:outline-none focus:border-foreground transition-colors duration-200'
  );

  return (
    <form onSubmit={handleSave}>
      {/* Fitting type */}
      <div className="mb-8">
        <p className="text-label-luxury text-foreground mb-3">Preferred Fit</p>
        <div className="flex gap-3">
          {(['slim', 'regular', 'relaxed'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFittingType(type)}
              className={cn(
                'px-5 py-2 text-label-luxury border transition-colors duration-200 capitalize',
                fittingType === type
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Measurements grid */}
      <div className="border border-border divide-y divide-border mb-6">
        {FIELDS.map((field) => (
          <div key={field.key} className="flex items-center px-5 py-3 gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground font-light">{field.label}</p>
              {field.description && (
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{field.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-none">
              <input
                type="number"
                min="0"
                step="0.5"
                value={values[field.key] ?? ''}
                onChange={(e) => update(field.key, e.target.value)}
                className={cn(inputClass, 'w-20')}
                aria-label={field.label}
              />
              <span className="text-xs text-muted-foreground w-6">{field.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mb-6">
        <label htmlFor="notes" className="text-label-luxury text-foreground block mb-2">
          Fitting Notes
        </label>
        <textarea
          id="notes"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any specific fitting preferences or notes for your advisor…"
          className={cn(
            'w-full px-4 py-3 bg-transparent border border-border',
            'text-sm text-foreground font-light',
            'focus:outline-none focus:border-foreground transition-colors duration-200',
            'placeholder:text-muted-foreground/50 resize-none'
          )}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="h-12 px-8 bg-foreground text-background text-label-luxury hover:bg-accent transition-colors duration-300"
        >
          Save Measurements
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-light">Saved successfully</span>
        )}
      </div>
    </form>
  );
}
