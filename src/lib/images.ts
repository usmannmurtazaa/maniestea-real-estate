const UNSPLASH_BASE = 'https://images.unsplash.com';

export function unsplash(id: string, width = 1200, quality = 80) {
  return `${UNSPLASH_BASE}/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}