import { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Promo', href: '#promo' },
  { label: 'Popular', href: '#popular' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-zinc-200 shadow-sm'
          : 'bg-white border-zinc-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Fastos Stylized Brand Wordmark */}
        <a
          href="#home"
          className="font-display font-black italic text-2xl tracking-tight text-[#E31E24] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded"
        >
          GPF Buger
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-700"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-[#E31E24] transition-colors duration-150 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#FF6B00] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Bright Red Order Now CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Order Now, ${cartCount} items in cart`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E31E24] hover:bg-[#c5171c] active:scale-[0.98] text-white text-sm font-bold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-2"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span>Order Now</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded bg-[#FF6B00] text-white text-xs font-extrabold tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-zinc-200 bg-white px-4 py-3 flex flex-col gap-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-[#E31E24] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
