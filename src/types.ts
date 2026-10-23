export type PropertyType = 'Apartment' | 'Penthouse' | 'Villa' | 'Townhouse';

export type LocationName =
  | 'Dubai Marina'
  | 'Downtown Dubai'
  | 'Palm Jumeirah'
  | 'Dubai Hills Estate'
  | 'Business Bay'
  | 'Dubai Creek Harbour';

export interface Property {
  id: string;
  name: string;
  location: LocationName;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  image: string;
  imageAlt: string;
}

export interface Community {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface BudgetOption {
  label: string;
  min: number;
  max: number;
}

export interface FilterState {
  location: string;
  type: string;
  budget: string;
  sort: string;
}