import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoBanner() {
  return (
    <section id="promo" className="bg-white py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="reveal-zoom relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FF6B00] via-[#FF7A14] to-[#F25C05] text-white p-8 sm:p-12 lg:p-14 shadow-xl"
        >
          {/* Subtle Diagonal Geometric Texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              {/* Free Fries Callout Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-950 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" aria-hidden="true" />
                <span>Free Fries Included</span>
              </div>

              <h2
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                From Our Chef With Love
              </h2>

              <p className="text-sm sm:text-base text-orange-50 leading-relaxed max-w-lg">
                With a wide range of gourmet burgers to choose from—including char-grilled beef, crispy buttermilk chicken, and smoky bacon melts—every combo comes hot with complimentary golden seasoned fries.
              </p>

              <div className="pt-1">
                <a
                  href="#popular"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#E31E24] hover:bg-[#c5171c] hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-sm transition-all duration-200 shadow-md whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>View Menu</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative max-w-md mx-auto lg:ml-auto">
                {/* Floating Callout */}
                <div className="absolute -top-4 -left-3 sm:-left-6 z-20 rounded-2xl bg-white text-zinc-950 px-4 py-2.5 shadow-lg text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Combo Bonus
                  </span>
                  <span className="font-display font-black text-base text-[#E31E24]">
                    Free Fries
                  </span>
                </div>

                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/25 bg-white group">
                  <img
                    src="/src/assets/images/fastos_ultimate_bacon_burger_1795197764876.jpg"
                    alt="Chef special bacon cheeseburger with free fries"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
