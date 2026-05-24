import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CurrencyDisplayProps {
  amount: number;
  currencyCode?: string;
  className?: string;
  showCode?: boolean;
}

export function CurrencyDisplay({
  amount,
  currencyCode = 'EUR',
  className,
  showCode = false,
}: CurrencyDisplayProps) {
  const formatted = formatPrice(amount, currencyCode);

  return (
    <span className={cn('tabular-nums', className)}>
      {formatted}
      {showCode && (
        <span className="ml-1 text-xs text-muted-foreground uppercase">{currencyCode}</span>
      )}
    </span>
  );
}
