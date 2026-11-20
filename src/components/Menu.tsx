import { useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { BURGER_ITEMS, type BurgerItem } from '../data/menuData';

interface MenuProps {
  onAddToCart: (item: BurgerItem) => void;
}

export function Menu({ onAddToCart }: MenuProps) {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const chooseItems = BURGER_ITEMS.filter((item) => item.chooseAndEnjoy);

  const handleOrderClick = (item: BurgerItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1100);
  };

  return (
    <section id="menu" className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Fastos Section Heading */}
        <div
          data-reveal
          className="reveal-up text-center max-w-xl mx-auto mb-12 space-y-2.5"
        >
          <h2
            className="font-display font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Choose &amp; Enjoy
          </h2>
          <p className="text-sm sm:text-base text-zinc-500">
            Inspired by recipes and creations of world-class chefs, grilled fresh to order.
          </p>
        </div>

        {/* 4-Column Choose & Enjoy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chooseItems.map((item, idx) => {
            const isAdded = recentlyAddedId === item.id;

            return (
              <article
                key={item.id}
                data-reveal
                style={{ transitionDelay: `${idx * 75}ms` }}
                className="reveal-up fastos-card group bg-white rounded-2xl border border-zinc-200/80 p-4 flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* 4:3 Image Frame with Orange Price Tag */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-50 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="fastos-card-img w-full h-full object-cover"
                    />
                  </div>

                  {/* Orange Price Tag (Fastos Signature Rectangular Tag) */}
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#FF6B00] text-white font-display font-bold text-xs tracking-wide tabular-nums">
                      ${item.price.toFixed(2)} USD
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold uppercase text-base sm:text-lg text-zinc-950 tracking-tight mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Order Now Button */}
                <div className="mt-5 pt-3">
                  <button
                    type="button"
                    onClick={() => handleOrderClick(item)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#E31E24] hover:bg-[#c5171c] hover:scale-[1.01] active:scale-[0.98] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <span>Order Now</span>
                        <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
