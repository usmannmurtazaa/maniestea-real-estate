import { Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { InquiryForm } from '../forms/InquiryForm';
import { siteConfig } from '../../data/site';

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-ivory py-24 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              id="contact-heading"
              eyebrow="Start a conversation"
              title={
                <>
                  Tell us what
                  <br />
                  you're looking for.
                </>
              }
              description="Share your preferred areas, budget, and timing. We'll use your brief to prepare a focused shortlist and a time to speak."
            />

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-champagne transition-colors group-hover:border-champagne group-hover:bg-champagne group-hover:text-charcoal">
                  <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-stone">
                    Email
                  </span>
                  <span className="mt-1 block text-sm text-charcoal">
                    {siteConfig.email}
                  </span>
                </span>
              </a>

              <a
                href={siteConfig.phoneHref}
                className="group flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-champagne transition-colors group-hover:border-champagne group-hover:bg-champagne group-hover:text-charcoal">
                  <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-stone">
                    Phone
                  </span>
                  <span className="mt-1 block text-sm text-charcoal">
                    {siteConfig.phone}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-champagne">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.18em] text-stone">
                    Location
                  </span>
                  <span className="mt-1 block text-sm text-charcoal">
                    {siteConfig.address}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone">
                What happens next
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone">
                We'll review your brief, identify the most relevant options, and
                arrange a private consultation.
              </p>
            </div>
          </div>

          <InquiryForm />
        </div>
      </div>
    </section>
  );
}