import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from '../ui/Wordmark';
import { ButtonLink } from '../ui/Button';
import { navLinks, siteConfig } from '../../data/site';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-line bg-ivory-50 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Maniesta Real Estate home">
          <Wordmark light={!solid} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'nav-link text-[11px] font-medium uppercase tracking-[0.2em] transition-colors',
                solid
                  ? 'text-charcoal hover:text-champagne'
                  : 'text-ivory/80 hover:text-ivory'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink
            href="#contact"
            variant={solid ? 'primary' : 'ghost'}
            size="md"
          >
            Book a Consultation
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center border transition-colors lg:hidden',
            solid
              ? 'border-charcoal/20 text-charcoal'
              : 'border-ivory/30 text-ivory'
          )}
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-ivory-50 lg:hidden"
        >
          <div className="flex min-h-full flex-col px-5 pb-10 pt-28 sm:px-8">
            <nav aria-label="Mobile primary" className="flex flex-col">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="animate-menu-in border-b border-line py-5 font-serif text-4xl text-charcoal"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-8">
              <ButtonLink
                href="#contact"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Book a Consultation
              </ButtonLink>
            </div>

            <div className="mt-auto pt-12">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone">
                Dubai, United Arab Emirates
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 block text-sm text-charcoal"
              >
                {siteConfig.email}
              </a>
              <a
                href={siteConfig.phoneHref}
                className="mt-1 block text-sm text-charcoal"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}