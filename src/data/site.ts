import type {
  BudgetOption,
  Community,
  FilterState,
  Property,
} from '../types';
import { unsplash } from '../lib/images';

export const siteConfig = {
  name: 'Maniesta Real Estate',
  shortName: 'Maniesta',
  description:
    'A boutique Dubai real estate experience for international buyers, families, and investors seeking considered guidance.',
  email: 'hello@maniestea.example',
  phone: '+971 4 000 0000',
  phoneHref: 'tel:+97140000000',
  address: 'Dubai, United Arab Emirates',
  canonicalUrl: 'https://maniesta-real-estate.netlify.app/',
  portfolioUrl: 'https://usmanmurtaza.netlify.app/',
  portfolioLabel: 'Usman Murtaza',
  social: {
    instagram: '',
    linkedin: '',
  },
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'Communities', href: '#communities' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const properties: Property[] = [
  {
    id: 'marina-residence',
    name: 'Marina Sky Residence',
    location: 'Dubai Marina',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 3,
    area: 1320,
    price: 2_450_000,
    image: unsplash('photo-1600607687920-4e2a09cf159d', 1000),
    imageAlt:
      'Contemporary living room with floor-to-ceiling windows in a Dubai Marina apartment.',
  },
  {
    id: 'downtown-penthouse',
    name: 'Downtown Horizon Penthouse',
    location: 'Downtown Dubai',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 4,
    area: 2100,
    price: 4_800_000,
    image: unsplash('photo-1600566753086-00f18fb6b3ea', 1000),
    imageAlt:
      'Warm, contemporary penthouse living space with a neutral palette in Downtown Dubai.',
  },
  {
    id: 'palm-villa',
    name: 'Palm Crest Villa',
    location: 'Palm Jumeirah',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    price: 12_500_000,
    image: unsplash('photo-1613490493576-7fde63acd811', 1000),
    imageAlt:
      'Contemporary villa with a private pool and landscaped garden in Palm Jumeirah.',
  },
  {
    id: 'hills-family-home',
    name: 'Hills Garden House',
    location: 'Dubai Hills Estate',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 5,
    area: 4100,
    price: 6_900_000,
    image: unsplash('photo-1600585154340-be6161a56a0c', 1000),
    imageAlt:
      'Modern family home with a lawn and warm exterior lighting in Dubai Hills Estate.',
  },
  {
    id: 'business-bay-loft',
    name: 'Business Bay Loft',
    location: 'Business Bay',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 2,
    area: 860,
    price: 1_750_000,
    image: unsplash('photo-1600607687939-ce8a6c25118c', 1000),
    imageAlt:
      'Open-plan living space with timber accents and city views in Business Bay.',
  },
  {
    id: 'creek-harbour-townhouse',
    name: 'Creek Harbour Townhouse',
    location: 'Dubai Creek Harbour',
    type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 3,
    area: 1540,
    price: 3_200_000,
    image: unsplash('photo-1600596542815-ffad4c1539a9', 1000),
    imageAlt:
      'Contemporary townhouse with clean lines and a private terrace in Dubai Creek Harbour.',
  },
];

export const communities: Community[] = [
  {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    eyebrow: 'Waterfront living',
    description:
      'A lively marina promenade, beach access, and a dense choice of dining and nightlife.',
    image: unsplash('photo-1512453979798-5ea266f8880c', 1400),
    imageAlt: 'Dubai Marina skyline and waterfront promenade at twilight.',
  },
  {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    eyebrow: 'The city core',
    description:
      'Iconic skyline views, cultural landmarks, and walkable access to Dubai Mall and the Opera District.',
    image: unsplash('photo-1518684079-3c830dcef090', 1200),
    imageAlt: 'Burj Khalifa rising above the Downtown Dubai skyline.',
  },
  {
    id: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    eyebrow: 'Island address',
    description:
      'Beachfront villas, resort-style amenities, and a uniquely recognisable island setting.',
    image: unsplash('photo-1582672060674-bc2bd808a8b5', 1200),
    imageAlt: 'Dubai coastline and resort architecture viewed from above.',
  },
  {
    id: 'dubai-hills',
    name: 'Dubai Hills Estate',
    eyebrow: 'Green calm',
    description:
      'Golf-course views, family-oriented villas, and a quieter pace minutes from the city.',
    image: unsplash('photo-1600566753190-17f0baa2a6c3', 1200),
    imageAlt:
      'Modern house with a deep porch and landscaped garden in Dubai Hills Estate.',
  },
];

export const budgetOptions: BudgetOption[] = [
  { label: 'Any budget', min: 0, max: Number.POSITIVE_INFINITY },
  { label: 'Under AED 2M', min: 0, max: 2_000_000 },
  { label: 'AED 2M – 5M', min: 2_000_000, max: 5_000_000 },
  { label: 'AED 5M – 10M', min: 5_000_000, max: 10_000_000 },
  { label: 'AED 10M+', min: 10_000_000, max: Number.POSITIVE_INFINITY },
];

export const locationOptions = [
  'All locations',
  ...Array.from(new Set(properties.map((property) => property.location))),
];

export const propertyTypeOptions = [
  'All types',
  'Apartment',
  'Penthouse',
  'Villa',
  'Townhouse',
];

export const sortOptions = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Largest area',
];

export const initialFilters: FilterState = {
  location: 'All locations',
  type: 'All types',
  budget: 'Any budget',
  sort: 'Featured',
};

export function filterProperties(list: Property[], filters: FilterState) {
  const budget =
    budgetOptions.find((option) => option.label === filters.budget) ?? budgetOptions[0];

  const filtered = list.filter((property) => {
    const locationMatch =
      filters.location === 'All locations' || property.location === filters.location;
    const typeMatch =
      filters.type === 'All types' || property.type === filters.type;
    const budgetMatch =
      property.price >= budget.min && property.price < budget.max;
    return locationMatch && typeMatch && budgetMatch;
  });

  const sorted = [...filtered];

  switch (filters.sort) {
    case 'Price: Low to High':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'Price: High to Low':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'Largest area':
      sorted.sort((a, b) => b.area - a.area);
      break;
    default:
      break;
  }

  return sorted;
}

export function hasActiveFilters(filters: FilterState) {
  return (
    filters.location !== initialFilters.location ||
    filters.type !== initialFilters.type ||
    filters.budget !== initialFilters.budget ||
    filters.sort !== initialFilters.sort
  );
}