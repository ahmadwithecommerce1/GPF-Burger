import { useMemo, useState } from 'react';
import { Check, Minus, Plus, Star } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
} from '../data/menuData';

interface MenuShopProps {
  cartQuantities: Record<string, number>;
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function MenuShop({
  cartQuantities,
  onAddToCart,
  onUpdateQuantity,
}: MenuShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const base =
      selectedCategory === 'All'
        ? MENU_ITEMS
        : MENU_ITEMS.filter((item) => item.category === selectedCategory);

    if (sortBy === 'price-asc') {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...base].sort((a, b) => b.price - a.price);
    }
    return base;
  }, [selectedCategory, sortBy]);

  const handleQuickAdd = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    window.setTimeout(() => {
      setJustAddedId((prev) => (prev === item.id ? null : prev));
    }, 900);
  };

  return (
    <section
      id="menu"
      className="bg-[#F8F7F4] py-16 lg:py-24 border-t border-zinc-200/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Filter Controls */}
        <div
          data-reveal
          className="reveal-up flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-xs font-bold tracking-wider uppercase text-[#D12525] mb-2">
              Explore Our Kitchen
            </p>
            <h2
              className="font-display font-black text-3xl sm:text-4xl text-zinc-950 tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Fresh Menu &amp; Shop
            </h2>
          </div>

          {/* Filter & Sort Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div
              role="tablist"
              aria-label="Filter menu by category"
              className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-zinc-200/80"
            >
              {MENU_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D12525] ${
                      isActive
                        ? 'bg-[#D12525] text-white shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="sr-only" htmlFor="menu-sort-select">
              Sort menu items
            </label>
            <select
              id="menu-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-10 px-3.5 rounded-xl bg-white border border-zinc-200/80 text-xs font-semibold text-zinc-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D12525]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const qty = cartQuantities[item.id] ?? 0;
            const isJustAdded = justAddedId === item.id;

            return (
              <article
                key={item.id}
                className="food-card group bg-white rounded-2xl border border-zinc-200/80 overflow-hidden flex flex-col justify-between p-4"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-100 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="food-card-img w-full h-full object-cover"
                    />
                  </div>

                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1.5">
                    <span>{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{item.calories}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums text-zinc-700 font-semibold">
                      <Star
                        className="w-3.5 h-3.5 text-[#FFB936] fill-current"
                        aria-hidden="true"
                      />
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-zinc-950 leading-snug mb-1.5">
                    {item.name}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Price + Cart Stepper / Add Button */}
                <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-lg text-zinc-950 tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-zinc-400 line-through tabular-nums">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

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
                      onClick={() => handleQuickAdd(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D12525] ${
                        isJustAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#D12525] hover:bg-[#a81b1b] text-white'
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
