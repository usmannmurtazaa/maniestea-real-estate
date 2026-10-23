import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <div
        className={cn(
          'flex items-center gap-3',
          align === 'center' && 'justify-center'
        )}
      >
        <span
          className={cn(
            'h-px w-8',
            light ? 'bg-champagne-light' : 'bg-champagne'
          )}
          aria-hidden="true"
        />
        <p
          className={cn(
            'text-[10px] font-medium uppercase tracking-[0.28em]',
            light ? 'text-champagne-light' : 'text-champagne'
          )}
        >
          {eyebrow}
        </p>
      </div>

      <h2
        id={id}
        className={cn(
          'mt-5 max-w-3xl font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]',
          light ? 'text-ivory' : 'text-charcoal',
          align === 'center' && 'mx-auto'
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            'mt-5 max-w-xl text-sm leading-relaxed sm:text-base',
            light ? 'text-ivory/65' : 'text-stone',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}