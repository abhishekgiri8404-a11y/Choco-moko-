import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Calendar, Clock, Tag, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (scheduledDate: string, scheduledSlot: string, coupon: string, discountVal: number, notes: string) => void;
  deliveryPincodeSet: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  deliveryPincodeSet,
}: CartDrawerProps) {
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState<string>('Standard (12 PM - 4 PM)');
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponMsg, setCouponMsg] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');

  if (!isOpen) return null;

  // Pricing tallies
  const subtotal = cartItems.reduce((acc, item) => acc + (item.pricePerItem * item.quantity), 0);
  
  // Delivery slot pricing logic
  const getDeliveryFee = (): number => {
    if (subtotal === 0) return 0;
    if (deliverySlot.includes('Express')) return 5.00;
    if (deliverySlot.includes('Midnight')) return 8.00;
    return 0.00; // standard is free
  };

  const deliveryFee = getDeliveryFee();
  const calculatedDiscount = Math.round(subtotal * (discountPercent / 100));
  const grandTotal = subtotal + deliveryFee - calculatedDiscount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponApplied(false);
    setCouponMsg('');

    const query = couponCode.trim().toUpperCase();
    if (!query) return;

    if (query === 'CHOCO10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponMsg('Success! 10% Discount applied to your order.');
    } else if (query === 'FREEDEL') {
      setDiscountPercent(0);
      setCouponApplied(true);
      setCouponMsg('Success! Free Priority Delivery slot unlocked.');
    } else {
      setDiscountPercent(0);
      setCouponMsg('Invalid coupon code. Try CHOCO10');
    }
  };

  // Helper helper to format chosen addons
  const renderAddonsLabel = (item: CartItem): string[] => {
    const labels: string[] = [];
    if (item.selectedAddons.candles) labels.push('🕯️ Candles');
    if (item.selectedAddons.sparklers) labels.push('🚀 Sparklers');
    if (item.selectedAddons.flowerBouquet) labels.push('💐 Rose Bouquet');
    if (item.selectedAddons.handwrittenCard) labels.push('✉️ Calligraphy Card');
    return labels;
  };

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 bg-[#2A1B18]/70 backdrop-blur-xs flex justify-end">
      <div 
        id="cart-drawer-content"
        className="bg-[#FAF6F0] w-full max-w-lg h-full shadow-2xl flex flex-col justify-between"
      >
        {/* Header Drawer */}
        <div className="p-6 border-b border-[#C5A880]/20 flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-[#2A1B18]">My Banquet Bag</span>
            <span className="bg-[#C5A880]/20 text-[#2A1B18] font-mono text-xs px-2.5 py-0.5 rounded-full font-bold">
              {cartItems.length} items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-[#2A1B18] hover:text-[#C5A880] p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Center Basket */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <span className="text-4xl block">🧁</span>
              <p className="font-serif text-lg font-bold text-[#2A1B18]">Your banquet bag is empty</p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Explore our range of premium chocolate truffle & artisanal cakes to fill your box with celebration!</p>
              <button
                onClick={onClose}
                className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-[#C5A880]/15 p-4 rounded-2xl shadow-xs relative flex gap-4 items-start hover:border-[#C5A880] transition-colors"
                >
                  <img 
                    src={item.cake.image} 
                    alt={item.cake.name} 
                    className="w-20 h-20 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="text-[10px] font-mono font-bold text-[#C5A880] uppercase tracking-wider">{item.cake.flavor.split('&')[0]}</p>
                    <h5 className="font-serif text-sm font-bold text-[#2A1B18] truncate leading-snug">{item.cake.name}</h5>
                    
                    {/* Customizable details summary */}
                    <div className="text-[11px] text-gray-500 mt-1.5 space-y-0.5">
                      <p>
                        ⚖️ Size: <span className="font-semibold text-stone-700">{item.selectedWeight}</span> | Prepared: <span className="font-semibold text-stone-700">{item.isEggless ? '🌱 Eggless' : '🥚 Classic'}</span>
                      </p>
                      {item.cakeMessage && (
                        <p className="italic text-[#B5945F]">
                          ✏️ Written: "{item.cakeMessage}"
                        </p>
                      )}
                      {renderAddonsLabel(item).length > 0 && (
                        <p className="text-stone-600 font-mono">
                          🎁 Combos: {renderAddonsLabel(item).join(', ')}
                        </p>
                      )}
                    </div>

                    {/* Quantity & Individual Price Block */}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-xs font-bold text-stone-650 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-xs font-bold text-stone-650 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-mono font-bold text-[#2A1B18]">
                        ${item.pricePerItem * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Bin Delete Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="absolute top-4 right-4 text-[#C5A880] hover:text-red-650 p-1 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              {/* SCHEDULING CALENDAR PREFERENCES */}
              <div className="bg-white border border-[#C5A880]/15 p-5 rounded-2xl space-y-4">
                <p className="text-xs font-mono text-[#B5945F] uppercase tracking-wider font-bold">📅 Schedule Fresh Delivery</p>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">Select Delivery Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-[#FAF6F0] border border-stone-250 p-2.5 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-500 mb-1">Select Delivery Slot (Slot pricing applies)</label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full bg-[#FAF6F0] border border-stone-250 p-2.5 rounded-xl text-xs text-stone-800 focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Standard (12 PM - 4 PM)">Standard Delivery (12 PM - 4 PM) (FREE)</option>
                    <option value="Evening (5 PM - 8 PM)">Sunset Delivery (5 PM - 8 PM) (FREE)</option>
                    <option value="Morning (9 AM - 12 PM)">Early Sunrise (9 AM - 12 PM) (+$2)</option>
                    <option value="Express 2hr (Fast-track)">Express Priority (As Fast As 2-hour transit) (+$5)</option>
                    <option value="Midnight (11:15 PM - 12 AM)">Midnight Celebration Shock (11:15 PM - 12 AM) (+$8)</option>
                  </select>
                </div>
              </div>

              {/* COUPON WORKSPACE FORM */}
              <div className="bg-white border border-[#C5A880]/15 p-5 rounded-2xl">
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="block text-xs font-mono text-[#B5945F] uppercase tracking-wider font-bold">🏷️ Apply Luxury Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. CHOCO10"
                      className="flex-1 bg-[#FAF6F0] border border-stone-250 rounded-xl px-3 py-2 text-xs text-[#2A1B18] focus:outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`text-[11px] font-semibold ${couponApplied ? 'text-emerald-700' : 'text-red-650'}`}>
                      {couponMsg}
                    </p>
                  )}
                </form>
              </div>

              {/* ORDER SPECIAL INSTRUCTIONS */}
              <div className="bg-white border border-[#C5A880]/15 p-5 rounded-2xl">
                <label className="block text-xs font-mono text-[#B5945F] uppercase tracking-wider font-bold mb-1.5">✍️ Delivery Notes / Special Directions</label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please do not ring the doorbell at midnight, baby sleeping! Call upon arrival."
                  className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 text-xs text-stone-800 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>

        {/* Pricing Subtotal details and checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#C5A880]/20 space-y-4">
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Slot Fee ({deliverySlot.split('(')[0].trim()})</span>
                <span className="font-mono font-bold">${deliveryFee === 0 ? 'FREE' : deliveryFee}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({discountPercent}%)</span>
                  <span className="font-mono">-${calculatedDiscount}</span>
                </div>
              )}
              {deliveryPincodeSet && (
                <div className="bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-[10px] text-gray-550 flex items-center justify-between">
                  <span>Pin matched: {deliveryPincodeSet.slice(0, 10)}...</span>
                  <span className="text-[#128C7E] font-bold">✔️ AVAILABILITY MATCHED</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif font-bold text-[#2A1B18] pt-2 border-t border-dashed border-gray-200">
                <span>Grand Celebration Total</span>
                <span className="text-xl">${grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(deliveryDate, deliverySlot, couponCode, calculatedDiscount, orderNotes)}
              className="w-full bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-bold text-xs uppercase py-4 rounded-full flex items-center justify-center gap-2 tracking-widest transition-all cursor-pointer shadow-md"
            >
              <span>Secure Banquet Checkout</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <p className="text-center text-[10px] text-gray-400">Secure transactions via SSL encryption. Order is customizable.</p>
          </div>
        )}
      </div>
    </div>
  );
}
