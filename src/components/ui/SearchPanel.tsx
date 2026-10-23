import { useState } from 'react';
import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import {
  budgetOptions,
  initialFilters,
  locationOptions,
  propertyTypeOptions,
} from '../../data/site';
import type { FilterState } from '../../types';
import { SelectField } from './SelectField';

type SearchPanelProps = {
  onSearch: (filters: FilterState) => void;
};

export function SearchPanel({ onSearch }: SearchPanelProps) {
  const [location, setLocation] = useState(initialFilters.location);
  const [type, setType] = useState(initialFilters.type);
  const [budget, setBudget] = useState(initialFilters.budget);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ location, type, budget, sort: 'Featured' });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-line bg-ivory-50 p-4 shadow-soft sm:p-5"
      aria-label="Property search"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_auto] lg:items-end">
        <SelectField
          id="hero-location"
          label="Location"
          value={location}
          options={locationOptions}
          onChange={setLocation}
        />
        <SelectField
          id="hero-type"
          label="Property type"
          value={type}
          options={propertyTypeOptions}
          onChange={setType}
        />
        <SelectField
          id="hero-budget"
          label="Budget"
          value={budget}
          options={budgetOptions.map((option) => option.label)}
          onChange={setBudget}
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 bg-charcoal px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-champagne hover:text-charcoal"
        >
          <Search className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Search
        </button>
      </div>
    </form>
  );
}