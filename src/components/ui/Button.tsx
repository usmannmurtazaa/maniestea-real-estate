import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'light' | 'ghost';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-charcoal text-ivory hover:bg-champagne hover:text-charcoal',
  secondary:
    'border border-charcoal/20 text-charcoal hover:border-champagne hover:bg-champagne hover:text-charcoal',
  light:
    'bg-ivory-50 text-charcoal hover:bg-champagne hover:text-charcoal',
  ghost:
    'border border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-[11px]',
  lg: 'h-[52px] px-7 text-[12px]',
};

export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  className?: string
) {
  return cn(
    'inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-[0.18em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-60',
    sizes[size],
    variants[variant],
    className
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonClasses(variant, size, className)}
    >
      {children}
    </a>
  );
}