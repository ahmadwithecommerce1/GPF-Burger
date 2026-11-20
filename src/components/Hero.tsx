import { useEffect, useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { BURGER_ITEMS, type BurgerItem } from '../data/menuData';

interface HeroProps {
  onAddToCart: (item: BurgerItem) => void;
}

export function Hero({ onAddToCart }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroBurger = BURGER_ITEMS[0];

  // Subtle GPU-accelerated scroll parallax on hero burger & warm ember glow
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(Math.min(window.scrollY, 450));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#141416] text-white pt-12 pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Parallax Ambient Studio Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{ transform: `translate3d(0, ${scrollY * 0.16}px, 0)` }}
          className="absolute -top-24 right-0 w-[560px] h-[560px] rounded-full bg-radial from-[#FF6B00]/28 via-[#E31E24]/14 to-transparent blur-3xl"
        />
        <div
          style={{ transform: `translate3d(0, ${scrollY * -0.1}px, 0)` }}
          className="absolute -bottom-24 -left-16 w-[420px] h-[420px] rounded-full bg-radial from-[#E31E24]/20 via-[#FF6B00]/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Fastos Headline, Tagline & Dual CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FF6B00]">
              It&apos;s a Good Time for the Great Taste of Burgers
            </p>

            <h1
              className="font-display font-black uppercase text-4xl sm:text-5xl lg:text-[4rem] leading-[1.02] tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Grilled Beef <span className="text-[#FF6B00]">Burger</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-lg">
              Grilling season is here, and we are firing up char-grilled double beef patties, melted aged cheddar, crisp pickles, and golden seasoned fries.
            </p>

            {/* Primary Red Order Now + Outlined View Menu */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onAddToCart(heroBurger)}
                className="btn-order-pulse inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#E31E24] hover:bg-[#c5171c] hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-zinc-600 hover:border-[#FF6B00] hover:text-[#FF6B00] text-white font-bold text-sm sm:text-base transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Menu
              </a>
            </div>
          </div>

          {/* Right Column: Floating Parallax Burger Photography + Price Tag */}
          <div className="lg:col-span-6 relative">
            <div
              style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
              className="hero-burger-float relative"
            >
              {/* Floating Vibrant Orange Price Tag */}
              <div className="absolute -top-4 right-4 sm:right-6 z-20 rounded-xl bg-[#FF6B00] text-white px-4 py-2.5 shadow-xl border border-orange-300/30 text-center">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-orange-100">
                  From
                </span>
                <span className="font-display font-black text-xl leading-none tabular-nums">
                  $6.99
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={heroBurger.image}
                    alt="Grilled Beef Burger with melted cheddar and golden fries"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                  />
                </div>

                {/* Bottom Overlay Callout */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#FF6B00]">
                      Signature Double Beef
                    </p>
                    <p className="font-display font-bold text-lg text-white">
                      Big Burger · Little Money
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onAddToCart(heroBurger)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E31E24] hover:bg-[#c5171c] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Add · $6.99</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Signature Fastos Curved Bottom Edge into White Section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-none"
      >
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-11 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0C360 52 1080 52 1440 0V56H0V0Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
