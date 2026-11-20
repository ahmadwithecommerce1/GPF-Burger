import { useState, type FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { BurgerItem } from '../data/menuData';

export interface CartEntry {
  item: BurgerItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  entries: CartEntry[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const FREE_DELIVERY_THRESHOLD = 25;
const STANDARD_DELIVERY_FEE = 2.99;

export function CartDrawer({
  isOpen,
  entries,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [orderTotalSnapshot, setOrderTotalSnapshot] = useState<number>(0);

  if (!isOpen) return null;

  const subtotal = entries.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );
  const qualifiesFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee =
    entries.length === 0 || qualifiesFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progressPercent = Math.min(
    100,
    (subtotal / FREE_DELIVERY_THRESHOLD) * 100
  );

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!entries.length) return;
    const generatedId = `FS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderTotalSnapshot(total);
    setConfirmedOrderId(generatedId);
    onClearCart();
  };

  const handleCloseDrawer = () => {
    setConfirmedOrderId(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        onClick={handleCloseDrawer}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <aside className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl border-l border-zinc-200">
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E31E24]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="font-display font-bold text-lg text-zinc-950"
            >
              Your Fastos Order
            </h2>
          </div>

          <button
            type="button"
            onClick={handleCloseDrawer}
            aria-label="Close order drawer"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {confirmedOrderId ? (
            <div className="py-10 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Order Confirmed · On the Grill
                </p>
                <h3 className="font-display font-black text-2xl text-zinc-950">
                  Order #{confirmedOrderId}
                </h3>
                <p className="text-sm text-zinc-600 max-w-xs mx-auto">
                  Thanks{customerName ? `, ${customerName}` : ''}. Your freshly grilled Fastos order is being prepared now.
                </p>
              </div>

              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 text-left text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total</span>
                  <span className="font-bold text-zinc-950 tabular-nums">
                    ${orderTotalSnapshot.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Payment</span>
                  <span className="font-semibold text-zinc-800">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card on Arrival'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="w-full py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 mx-auto">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="font-display font-bold text-base text-zinc-950">
                Your bag is empty
              </p>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                Add grilled beef burgers, crispy chicken, or golden fries from the menu to place an order.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-xl bg-orange-50 border border-orange-200/80 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-800">
                    {qualifiesFreeDelivery
                      ? 'Free Delivery Unlocked'
                      : `Add $${remainingForFree.toFixed(2)} more for Free Delivery`}
                  </span>
                  <span className="text-[#FF6B00] font-bold tabular-nums">
                    ${subtotal.toFixed(2)} / ${FREE_DELIVERY_THRESHOLD}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-orange-200/70 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full bg-[#FF6B00] transition-all duration-300"
                  />
                </div>
              </div>

              <ul className="divide-y divide-zinc-200/80">
                {entries.map(({ item, quantity }) => (
                  <li key={item.id} className="py-4 flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-zinc-950 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500 tabular-nums mt-0.5">
                        ${item.price.toFixed(2)} each
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="inline-flex items-center border border-zinc-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name}`}
                            className="w-7 h-7 inline-flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" aria-hidden="true" />
                          </button>
                          <span className="px-2 text-xs font-bold tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name}`}
                            className="w-7 h-7 inline-flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="p-1.5 text-zinc-400 hover:text-[#E31E24] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <span className="font-display font-bold text-sm text-zinc-950 tabular-nums shrink-0">
                      ${(item.price * quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <form
                id="fastos-checkout-form"
                onSubmit={handleCheckout}
                className="space-y-3.5 pt-4 border-t border-zinc-200"
              >
                <p className="font-display font-bold text-sm text-zinc-950">
                  Delivery Information
                </p>

                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name"
                  aria-label="Full Name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />

                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />

                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street Address & Apartment"
                  aria-label="Delivery Street Address"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-zinc-950 text-white border-zinc-950'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    Card on Arrival
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {!confirmedOrderId && entries.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Delivery</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-display font-black text-base text-zinc-950 pt-1.5 border-t border-zinc-200">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              form="fastos-checkout-form"
              className="w-full py-3.5 rounded-xl bg-[#E31E24] hover:bg-[#c5171c] text-white font-bold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B00]"
            >
              Place Order · ${total.toFixed(2)}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
