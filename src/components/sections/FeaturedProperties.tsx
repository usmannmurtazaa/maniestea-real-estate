import type { Dispatch, SetStateAction } from 'react';
import { RotateCcw } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SelectField } from '../ui/SelectField';
import { PropertyCard } from '../ui/PropertyCard';
import {
  budgetOptions,
  filterProperties,
  hasActiveFilters,
  initialFilters,
  locationOptions,
  properties,
  propertyTypeOptions,
  sortOptions,
} from '../../data/site';
import type { FilterState } from '../../types';

type FeaturedPropertiesProps = {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
};

export function FeaturedProperties({
  filters,
  setFilters,
}: FeaturedPropertiesProps) {
  const filtered = filterProperties(properties, filters);
  const active = hasActiveFilters(filters);

  function updateFilter(key: keyof FilterState, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  return (
    <section
      id="properties"
      className="bg-ivory-50 pb-24 pt-20 lg:pb-32 lg:pt-44"
      aria-labelledby="properties-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="properties-heading"
            eyebrow="Portfolio"
            title="Featured residences"
            description="A selection of sample residences across Dubai's most established communities. Use the filters to explore by area, type, and budget."
          />
          <p className="max-w-xs text-[11px] leading-relaxed text-stone lg:text-right">
            Illustrative listings only. Prices are indicative and do not
            represent actual availability.
          </p>
        </div>

        <div className="mt-10 border-y border-line py-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-end">
            <SelectField
              id="filter-location"
              label="Location"
              value={filters.location}
              options={locationOptions}
              onChange={(value) => updateFilter('location', value)}
            />
            <SelectField
              id="filter-type"
              label="Property type"
              value={filters.type}
              options={propertyTypeOptions}
              onChange={(value) => updateFilter('type', value)}
            />
            <SelectField
              id="filter-budget"
              label="Budget"
              value={filters.budget}
              options={budgetOptions.map((option) => option.label)}
              onChange={(value) => updateFilter('budget', value)}
            />
            <SelectField
              id="filter-sort"
              label="Sort by"
              value={filters.sort}
              options={sortOptions}
              onChange={(value) => updateFilter('sort', value)}
            />
            <button
              type="button"
              onClick={resetFilters}
              disabled={!active}
              className="inline-flex h-12 items-center justify-center gap-2 border border-line px-4 text-[10px] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-champagne hover:bg-champagne disabled:cursor-not-allowed disabled:opacity-30"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Reset
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone">
            <p>
              Showing{' '}
              <span className="font-medium text-charcoal">{filtered.length}</span>{' '}
              of {properties.length} sample residences
            </p>
            <p>Indicative prices in AED</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((property, index) => (
              <Reveal key={property.id} delay={index * 60} className="h-full">
                <PropertyCard property={property} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full border border-dashed border-line bg-ivory-50 p-12 text-center">
              <p className="font-serif text-3xl text-charcoal">
                No sample residences match those filters.
              </p>
              <p className="mt-3 text-sm text-stone">
                Try widening your budget or selecting a different area.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 inline-flex h-11 items-center justify-center border border-charcoal/20 px-5 text-[10px] font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-champagne hover:bg-champagne"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <p className="mt-8 max-w-2xl text-[10px] leading-relaxed text-stone">
          Sample content notice: the properties shown are illustrative
          demonstration listings, not live availability. Prices, sizes, and
          specifications are indicative only.
        </p>
      </div>
    </section>
  );
}