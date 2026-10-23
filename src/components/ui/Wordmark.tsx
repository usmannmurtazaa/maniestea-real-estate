import { cn } from '../../lib/utils';

type WordmarkProps = {
  light?: boolean;
  className?: string;
  size?: 'sm' | 'lg';
};

export function Wordmark({ light = false, className, size = 'sm' }: WordmarkProps) {
  const isLarge = size === 'lg';

  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-serif tracking-[0.18em]',
          isLarge ? 'text-4xl' : 'text-[1.35rem] sm:text-2xl',
          light ? 'text-ivory' : 'text-charcoal'
        )}
      >
        MANIESTA
      </span>
      <span
        className={cn(
          'mt-1 font-medium uppercase',
          isLarge
            ? 'text-[9px] tracking-[0.55em]'
            : 'text-[7px] tracking-[0.52em] sm:text-[8px]',
          light ? 'text-champagne-light' : 'text-champagne'
        )}
      >
        Real Estate
      </span>
    </span>
  );
}