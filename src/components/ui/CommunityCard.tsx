import { ArrowUpRight } from 'lucide-react';
import type { Community } from '../../types';
import { cn } from '../../lib/utils';

type CommunityCardProps = {
  community: Community;
  onSelect: (location: string) => void;
  className?: string;
};

export function CommunityCard({
  community,
  onSelect,
  className,
}: CommunityCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(community.name)}
      aria-label={`View sample properties in ${community.name}`}
      className={cn(
        'group relative isolate flex min-h-[340px] w-full cursor-pointer overflow-hidden bg-charcoal text-left sm:min-h-[400px]',
        className
      )}
    >
      <img
        src={community.image}
        alt={community.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.05]"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent"
        aria-hidden="true"
      />

      <div className="mt-auto flex w-full items-end justify-between gap-4 p-6 sm:p-8">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-champagne-light">
            {community.eyebrow}
          </p>
          <h3 className="mt-2 font-serif text-3xl leading-none text-ivory sm:text-4xl">
            {community.name}
          </h3>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-ivory/75 sm:text-sm">
            {community.description}
          </p>
          <span className="mt-5 inline-block h-px w-10 bg-champagne transition-all duration-500 group-hover:w-16" />
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/25 text-ivory transition-colors duration-300 group-hover:border-champagne group-hover:bg-champagne group-hover:text-charcoal">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}