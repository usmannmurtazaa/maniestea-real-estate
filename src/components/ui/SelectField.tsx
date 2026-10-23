import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
};

export function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  className,
}: SelectFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className="text-[10px] font-medium uppercase tracking-[0.18em] text-stone"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none border border-line bg-white px-3.5 pr-9 text-sm text-charcoal transition-colors hover:border-champagne/60 focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}