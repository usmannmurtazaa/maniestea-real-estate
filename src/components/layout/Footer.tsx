import { Wordmark } from '../ui/Wordmark';
import { communities, navLinks, siteConfig } from '../../data/site';

export function Footer() {
  const socials = [
    { label: 'Instagram', href: siteConfig.social.instagram },
    { label: 'LinkedIn', href: siteConfig.social.linkedin },
  ].filter((social) => social.href);

  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <a href="#home" aria-label="Maniesta Real Estate home">
              <Wordmark light size="lg" />
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-ivory/40">
              Dubai · United Arab Emirates
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-ivory">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne">
              Communities
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              {communities.map((community) => (
                <li key={community.id}>
                  <a
                    href="#communities"
                    className="transition-colors hover:text-ivory"
                  >
                    {community.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-champagne">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-ivory/70">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-ivory"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-ivory"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>Dubai, United Arab Emirates</li>
            </ul>

            {socials.length > 0 ? (
              <div className="mt-5 flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] uppercase tracking-[0.16em] text-ivory/50 transition-colors hover:text-ivory"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory/10 py-6 text-[11px] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Maniesta Real Estate. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#home" className="transition-colors hover:text-ivory">
              Back to top ↑
            </a>
            {siteConfig.portfolioUrl ? (
              <a
                href={siteConfig.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-ivory"
              >
                Designed &amp; Developed by {siteConfig.portfolioLabel}
              </a>
            ) : (
              <span>Designed &amp; Developed by {siteConfig.portfolioLabel}</span>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[30%] text-center font-serif text-[18vw] leading-none text-ivory/[0.04]">
          MANIESTA
        </p>
      </div>
    </footer>
  );
}