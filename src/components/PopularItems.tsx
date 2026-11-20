import { useState } from 'react';
import { Check, Plus, Star } from 'lucide-react';
import { MENU_ITEMS, type MenuItem } from '../data/menuData';

interface PopularItemsProps {
  onAddToCart: (item: MenuItem) => void;
}

export function PopularItems({ onAddToCart }: PopularItemsProps) {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const popularItems = MENU_ITEMS.filter((item) => item.featured);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  return (
    <section id="popular" className="bg-white py-16 lg:py-24 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div
          data-reveal
          className="reveal-up flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-[#D12525] mb-2">
              Crispy, Every Bite Taste
            </p>
            <h2
              className="font-display font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Popular Food Items
            </h2>
          </div>

          <a
            href="#menu"
            className="text-sm font-semibold text-zinc-700 hover:text-[#D12525] transition-colors whitespace-nowrap shrink-0"
          >
            View All Menu Items &rarr;
          </a>
        </div>

        {/* 4-Column Popular Grid (Pizza, Shawarma, Burger, Fries) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item, idx) => {
            const isAdded = recentlyAddedId === item.id;
            const isAmber = Boolean(item.highlightAmber);

            return (
              <article
                key={item.id}
                data-reveal
                style={{ transitionDelay: `${idx * 70}ms` }}
                className={`reveal-up food-card group rounded-2xl overflow-hidden flex flex-col justify-between p-4 ${
                  isAmber
                    ? 'bg-[#FFB936] text-zinc-950 border border-[#eab308]/50'
                    : 'bg-[#F8F7F4] text-zinc-950 border border-zinc-200/70'
                }`}
              >
                <div>
                  {/* 4:3 Image Frame with Smooth Zoom on Hover */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-200 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="food-card-img w-full h-full object-cover"
                    />
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div
                    className={`flex items-center gap-2 text-xs font-medium mb-1.5 ${
                      isAmber ? 'text-zinc-900/80' : 'text-zinc-500'
                    }`}
                  >
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Star
                        className={`w-3.5 h-3.5 fill-current ${
                          isAmber ? 'text-zinc-950' : 'text-[#FFB936]'
                        }`}
                        aria-hidden="true"
                      />
                      {item.rating.toFixed(1)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.prepTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-zinc-950 leading-snug mb-1.5">
                    {item.name}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed line-clamp-2 ${
                      isAmber ? 'text-zinc-900/85' : 'text-zinc-600'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Price & Add to Cart Row */}
                <div
                  className={`mt-5 pt-4 border-t flex items-center justify-between gap-3 ${
                    isAmber ? 'border-zinc-950/15' : 'border-zinc-200/80'
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-lg text-zinc-950 tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span
                        className={`text-xs line-through tabular-nums ${
                          isAmber ? 'text-zinc-900/60' : 'text-zinc-400'
                        }`}
                      >
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 ${
                      isAdded
                        ? 'bg-emerald-700 text-white'
                        : isAmber
                          ? 'bg-zinc-950 hover:bg-zinc-800 text-white'
                          : 'bg-[#D12525] hover:bg-[#a81b1b] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Add to Cart</span>
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
