import { Check } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { RoiCalculator } from '../ui/RoiCalculator';
import { unsplash } from '../../lib/images';

const bullets = [
  {
    title: 'No annual property tax',
    description:
      'Transaction and service charges still apply, and these should be modelled into your total cost.',
  },
  {
    title: 'A broad rental market',
    description:
      'Demand varies by community, unit type, and timing; we help you compare like-for-like.',
  },
  {
    title: 'Numbers before promises',
    description:
      'We model scenarios with you and state our assumptions clearly. Rental yields are not guaranteed.',
  },
];

export function Investment() {
  return (
    <section
      id="investment"
      className="bg-charcoal py-24 text-ivory lg:py-32"
      aria-labelledby="investment-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative">
                <div
                  className="absolute -bottom-4 -right-4 h-full w-full border border-champagne/40"
                  aria-hidden="true"
                />
                <img
                  src={unsplash('photo-1512453979798-5ea266f8880c', 1000)}
                  alt="Dubai skyline and palm-lined waterfront at golden hour."
                  loading="lazy"
                  decoding="async"
                  className="relative aspect-[4/5] w-full object-cover"
                />
              </div>
              <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                Dubai · United Arab Emirates
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              id="investment-heading"
              light
              eyebrow="Investment perspective"
              title={
                <>
                  Own a piece of a city
                  <br />
                  that keeps moving.
                </>
              }
              description="Dubai's property market is diverse and fast-moving. A good investment decision starts with clear assumptions, not a promised outcome."
            />

            <div className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <div key={bullet.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-champagne/40 text-champagne">
                    <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-ivory">{bullet.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/60">
                      {bullet.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <RoiCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}