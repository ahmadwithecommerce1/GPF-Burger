import { ArrowRight, Bike, Flame } from 'lucide-react';
import { MENU_ITEMS, type MenuItem } from '../data/menuData';

interface PromoBannersProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenCart: () => void;
}

export function PromoBanners({ onAddToCart, onOpenCart }: PromoBannersProps) {
  const burgerItem = MENU_ITEMS.find((i) => i.id === 'double-smash-burger');
  const pizzaItem = MENU_ITEMS.find((i) => i.id === 'stone-oven-pepperoni');

  return (
    <section id="offers" className="bg-white pb-16 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Two-Column Dark Charcoal + Red Promotional Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Dark Charcoal Burger Promo Card */}
          <div
            data-reveal
            className="reveal-zoom lg:col-span-5 group relative overflow-hidden rounded-2xl bg-[#161619] text-white p-7 sm:p-8 flex flex-col justify-between min-h-[300px]"
          >
            <div className="relative z-10 max-w-xs space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFB936]">
                Every Bite Better · Save 15%
              </p>
              <h3
                className="font-display font-black text-2xl sm:text-3xl leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Super Delicious Burger
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Twin seared beef patties, melted aged cheddar, and toasted brioche—crafted fresh on the flat-top.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => burgerItem && onAddToCart(burgerItem)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFB936] hover:bg-[#f59e0b] text-zinc-950 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Order Burger</span>
                  <span className="tabular-nums">$13.49</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:absolute lg:right-4 lg:bottom-4 lg:w-52 lg:h-40 rounded-xl overflow-hidden border border-zinc-800">
              <img
                src="/src/assets/images/food_smash_burger_1795194395478.jpg"
                alt="Double smash cheeseburger promo"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Vibrant Red Special Pizza Promo Card */}
          <div
            data-reveal
            style={{ transitionDelay: '90ms' }}
            className="reveal-zoom lg:col-span-7 group relative overflow-hidden rounded-2xl bg-[#D12525] text-white p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[300px]"
          >
            <div className="relative z-10 max-w-sm space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFB936]">
                Limited Weekend Special
              </p>
              <h3
                className="font-display font-black text-3xl sm:text-4xl leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Special Delicious Pizza
              </h3>
              <p className="text-sm sm:text-base text-red-50 leading-relaxed">
                48-hour fermented sourdough crust blistered in our stone oven with crispy pepperoni and chili honey.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => pizzaItem && onAddToCart(pizzaItem)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB936]"
                >
                  <span>Order Pizza</span>
                  <span className="text-[#FFB936] tabular-nums">$16.99</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="w-full sm:w-64 lg:w-72 aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-white/15 shrink-0">
              <img
                src="/src/assets/images/food_pepperoni_pizza_1795194395223.jpg"
                alt="Stone-oven pepperoni pizza special"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 30 Minutes Fast Delivery Challenge Banner */}
        <div
          data-reveal
          className="reveal-up rounded-2xl bg-[#163829] text-white p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-emerald-900/60"
        >
          <div className="flex items-start sm:items-center gap-5">
            <div className="hidden sm:inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFB936] text-zinc-950 shrink-0">
              <Bike className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFB936]">
                Hot &amp; Fresh Guarantee
              </p>
              <h3
                className="font-display font-black text-2xl sm:text-3xl tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                30 Minutes Fast Delivery Challenge
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl">
                Every order leaves our pass piping hot—free delivery on orders over $30.00, tracked straight to your doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB936]"
            >
              <Flame className="w-4 h-4 text-[#D12525]" aria-hidden="true" />
              <span>Build Your Order</span>
            </a>
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D12525] hover:bg-[#b51d1d] text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>View Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
