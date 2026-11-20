import { useMemo, useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import {
  BURGER_CATEGORIES,
  BURGER_ITEMS,
  type BurgerCategory,
  type BurgerItem,
} from '../data/menuData';

interface PopularBurgersProps {
  cartQuantities: Record<string, number>;
  onAddToCart: (item: BurgerItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export function PopularBurgers({
  cartQuantities,
  onAddToCart,
  onUpdateQuantity,
}: PopularBurgersProps) {
  const [selectedCategory, setSelectedCategory] = useState<BurgerCategory>('All');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const popularList = useMemo(() => {
    const items = BURGER_ITEMS.filter((item) => item.popular);
    if (selectedCategory === 'All') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleAdd = (item: BurgerItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((prev) => (prev === item.id ? null : prev));
    }, 900);
  };

  return (
    <section
      id="popular"
      className="bg-[#FAFAFA] py-16 lg:py-24 border-t border-zinc-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Interactive Category Filter */}
        <div
          data-reveal
          className="reveal-up flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-2">
            <h2
              className="font-display font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Popular Burgers
            </h2>
            <p className="text-sm sm:text-base text-zinc-500">
              Fan-favorite char-grilled classics, crispy chicken, and seasoned sides.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter popular burgers"
            className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-zinc-200"
          >
            {BURGER_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                    isActive
                      ? 'bg-[#FF6B00] text-white'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 3-Column Popular Burgers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {popularList.map((item) => {
            const qty = cartQuantities[item.id] ?? 0;
            const isJustAdded = justAddedId === item.id;

            return (
              <article
                key={item.id}
                className="fastos-card group bg-white rounded-2xl border border-zinc-200/80 p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-100 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="fastos-card-img w-full h-full object-cover"
                    />
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1.5">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.calories}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.prepTime}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-zinc-950 tracking-tight mb-1.5">
                    {item.name}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Price + Add to Cart / Quantity Stepper */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#FF6B00]/12 text-[#FF6B00] font-display font-extrabold text-base tabular-nums">
                    ${item.price.toFixed(2)}
                  </span>

                  {qty > 0 ? (
                    <div className="inline-flex items-center gap-1 bg-zinc-950 text-white rounded-lg p-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="w-7 h-7 inline-flex items-center justify-center rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="min-w-6 text-center text-xs font-bold tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="w-7 h-7 inline-flex items-center justify-center rounded hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00] ${
                        isJustAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#E31E24] hover:bg-[#c5171c] text-white'
                      }`}
                    >
                      {isJustAdded ? (
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
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
