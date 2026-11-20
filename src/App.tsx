/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { PromoBanner } from './components/PromoBanner';
import { PopularBurgers } from './components/PopularBurgers';
import { CartDrawer, type CartEntry } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import type { BurgerItem } from './data/menuData';

export default function App() {
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useScrollReveal();

  const cartEntries = useMemo(() => Object.values(cart), [cart]);

  const cartCount = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartEntries]
  );

  const cartQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cartEntries.forEach(({ item, quantity }) => {
      map[item.id] = quantity;
    });
    return map;
  }, [cartEntries]);

  const handleAddToCart = (item: BurgerItem) => {
    setCart((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });

    const msg = `Added ${item.name} to your cart`;
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQty = existing.quantity + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: { ...existing, quantity: nextQty },
      };
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Hero onAddToCart={handleAddToCart} />
        <Menu onAddToCart={handleAddToCart} />
        <PromoBanner />
        <PopularBurgers
          cartQuantities={cartQuantities}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        entries={cartEntries}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-zinc-950 text-white px-4 py-3 rounded-xl shadow-xl border border-zinc-800 text-sm font-medium"
        >
          <ShoppingBag className="w-4 h-4 text-[#FF6B00] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-xs font-bold text-[#FF6B00] hover:underline ml-1 cursor-pointer whitespace-nowrap"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
