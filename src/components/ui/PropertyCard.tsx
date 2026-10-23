import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from 'lucide-react';
import type { Property } from '../../types';
import { formatAED, formatNumber } from '../../lib/utils';

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-white transition-all duration-500 hover:border-champagne/60 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-200">
        <img
          src={property.image}
          alt={property.imageAlt}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="absolute left-4 top-4 border border-white/30 bg-charcoal/60 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ivory">
          Illustrative listing
        </span>
        <span className="absolute right-4 top-4 bg-ivory-50/95 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-charcoal">
          {property.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-champagne">
          <MapPin className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
          {property.location}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-tight text-charcoal">
          {property.name}
        </h3>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-stone">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {property.bedrooms} bed
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {property.bathrooms} bath
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Ruler className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            {formatNumber(property.area)} sq ft
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-line pt-5 mt-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone">
              Indicative price
            </p>
            <p className="mt-1 font-serif text-xl text-charcoal">
              {formatAED(property.price)}
            </p>
          </div>
          <a
            href="#contact"
            aria-label={`Enquire about ${property.name}`}
            className="flex h-9 w-9 items-center justify-center border border-line text-charcoal transition-colors group-hover:border-champagne group-hover:bg-champagne"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}