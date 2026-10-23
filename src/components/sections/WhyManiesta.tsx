import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { unsplash } from '../../lib/images';

const benefits = [
  {
    title: 'Personalised property discovery',
    description:
      'We begin with how you want to live, then shortlist properties that fit your brief rather than sending an endless feed.',
  },
  {
    title: 'Local market context',
    description:
      'Area-level pricing, supply, and rental context help you compare options with a clearer frame of reference.',
  },
  {
    title: 'Lifestyle matching',
    description:
      'Schools, commute, amenities, and community character are considered alongside the property itself.',
  },
  {
    title: 'Investment-oriented guidance',
    description:
      'Clear assumptions and transparent costs, with no guaranteed-return promises or pressure to move faster than you need.',
  },
];

export function WhyManiesta() {
  return (
    <section
      id="about"
      className="bg-ivory-50 py-24 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="about-heading"
              eyebrow="Why Maniesta"
              title={
                <>
                  A more considered way
                  <br />
                  to buy in Dubai.
                </>
              }
              description="Buying property in a new city should feel clear, not overwhelming. Our role is to bring structure, local context, and a calm point of view to the process."
            />

            <Reveal delay={120} className="mt-8">
              <img
                src={unsplash('photo-1600210492486-724fe5c67fb0', 900)}
                alt="Warm, minimal interior with natural materials and soft daylight."
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <p className="mt-3 text-[11px] leading-relaxed text-stone">
                A research-led alternative to browsing listings alone.
              </p>
            </Reveal>
          </div>

          <div>
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 70}>
                <div className="group border-t border-line py-7 last:border-b">
                  <div className="flex gap-5">
                    <span className="font-serif text-lg text-champagne">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl text-charcoal">
                        {benefit.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-stone">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}