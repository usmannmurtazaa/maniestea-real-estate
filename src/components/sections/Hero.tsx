import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { SearchPanel } from '../ui/SearchPanel';
import { unsplash } from '../../lib/images';
import type { FilterState } from '../../types';

const heroImage = unsplash('photo-1512453979798-5ea266f8880c', 2200);

type HeroProps = {
  onSearch: (filters: FilterState) => void;
};

export function Hero({ onSearch }: HeroProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setOffset(Math.min(window.scrollY * 0.16, 100));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img
          src={heroImage}
          alt="Dubai skyline with palm trees at golden hour, United Arab Emirates."
          className="absolute -top-[10%] left-0 h-[120%] w-full object-cover object-center will-change-transform"
          style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-charcoal/45" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/85 via-charcoal/40 to-charcoal/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-charcoal/85 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8 lg:pb-56 lg:pt-36">
        <div className="max-w-3xl">
          <div
            className="animate-rise flex items-center gap-3"
            style={{ animationDelay: '80ms' }}
          >
            <span className="h-px w-10 bg-champagne" aria-hidden="true" />
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-champagne-light">
              Dubai · United Arab Emirates
            </p>
          </div>

          <h1
            className="animate-rise mt-6 font-serif text-[clamp(3.4rem,8.5vw,7.5rem)] leading-[0.9] tracking-[-0.03em] text-ivory"
            style={{ animationDelay: '160ms' }}
          >
            Find Your Place
            <br />
            <span className="italic text-champagne-light">in Dubai.</span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base"
            style={{ animationDelay: '260ms' }}
          >
            Discover exceptional properties, prestigious communities, and
            investment opportunities in one of the world's most dynamic cities.
          </p>

          <div
            className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '360ms' }}
          >
            <ButtonLink href="#properties" variant="light" size="lg">
              Explore Properties
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#communities" variant="ghost" size="lg">
              Discover Dubai
              <ArrowDown className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </ButtonLink>
          </div>

          <p
            className="animate-rise mt-8 text-[10px] uppercase tracking-[0.22em] text-ivory/50"
            style={{ animationDelay: '440ms' }}
          >
            Private viewings · Investment guidance · Relocation support
          </p>
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-10 w-full max-w-6xl px-5 pb-8 sm:px-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:translate-y-1/2 lg:pb-0">
        <SearchPanel onSearch={onSearch} />
      </div>
    </section>
  );
}