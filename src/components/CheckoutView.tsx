import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { ShieldCheck, Truck, CreditCard, ShoppingBag, CheckCircle, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryDate: string;
  deliverySlot: string;
  orderNotes: string;
  onPlaceOrder: (order: Order) => void;
  onCancelCheckout: () => void;
  pincodePrefilled: string;
}

export default function CheckoutView({
  cartItems,
  subtotal,
  deliveryFee,
  discount,
  total,
  deliveryDate,
  deliverySlot,
  orderNotes,
  onPlaceOrder,
  onCancelCheckout,
  pincodePrefilled,
}: CheckoutViewProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState(pincodePrefilled || '');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card (Stripe Enabled)');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [finalOrder, setFinalOrder] = useState<Order | null>(null);

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !pincode || !address) {
      alert('Please fill out all the necessary fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury processing connection
    setTimeout(() => {
      const orderId = `CM-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: Order = {
        id: orderId,
        customerName: name,
        email,
        phone,
        pincode,
        area,
        address,
        deliveryDate,
        deliverySlot,
        items: [...cartItems],
        subtotal,
        deliveryCharges: deliveryFee,
        discount,
        total,
        paymentMethod,
        status: 'ordered'
      };

      setFinalOrder(order);
      setIsSubmitting(false);
      setIsDone(true);
    }, 2000);
  };

  const handleTriggerTracking = () => {
    if (finalOrder) {
      onPlaceOrder(finalOrder);
    }
  };

  if (isDone && finalOrder) {
    return (
      <div id="checkout-completed-screen" className="max-w-xl mx-auto bg-white border-2 border-emerald-500 rounded-3xl p-8 shadow-xl text-center space-y-6 my-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <CheckCircle className="w-10 h-10 text-emerald-600 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#B5945F] font-bold">celebrating your moment</span>
          <h3 className="font-serif text-3xl font-bold text-[#2A1B18]">Order Confirmed!</h3>
          <p className="text-xs text-gray-500">Your custom recipe has been dispatched to our gourmet baking stations.</p>
        </div>

        <div className="bg-[#FAF6F0] border border-[#C5A880]/20 rounded-2xl p-4 text-left space-y-3 font-sans text-xs">
          <div className="flex justify-between border-b border-gray-150 pb-2">
            <span className="text-gray-400">Order Reference ID:</span>
            <span className="font-mono font-bold text-[#2A1B18]">{finalOrder.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Delivery Recipient:</span>
            <span className="font-semibold text-stone-800">{finalOrder.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Target Date:</span>
            <span className="text-[#2A1B18] font-bold">{finalOrder.deliveryDate} ({finalOrder.deliverySlot})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pincode:</span>
            <span className="font-semibold text-stone-800">{finalOrder.pincode}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-dashed border-gray-250 font-serif text-sm font-bold text-[#2A1B18]">
            <span>Total Account Charged</span>
            <span>${finalOrder.total}</span>
          </div>
        </div>

        {whatsappOptIn && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-2xl text-xs text-left flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">WhatsApp Updates Engaged</p>
              <p className="text-[11px] text-emerald-650 mt-0.5">We will chat real-time baker photos and live tracking coordinates to your phone <strong>{finalOrder.phone}</strong>.</p>
            </div>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <button
            onClick={handleTriggerTracking}
            className="w-full bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-bold text-xs uppercase py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <span>Live Baker Progress Tracker</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={onCancelCheckout} // Goes back to home
            className="text-xs text-[#B5945F] font-bold hover:underline"
          >
            Go Back To Cake Showcase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout-view-pane" className="max-w-6xl mx-auto px-4 my-12">
      
      {/* Back CTA */}
      <button 
        onClick={onCancelCheckout}
        className="text-xs font-mono font-bold tracking-wider text-[#B5945F] hover:underline uppercase mb-6 inline-block"
      >
        ← Back To Shopping Drawer
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Details collection */}
        <div className="lg:col-span-7 bg-white border border-[#C5A880]/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="border-b border-[#C5A880]/10 pb-4">
            <h3 className="font-serif text-2xl font-bold text-[#2A1B18]">Secure Patron Checkout</h3>
            <p className="text-xs text-gray-500 mt-1">Please provide accurate residential or event coordinates for prompt delivery.</p>
          </div>

          <form onSubmit={handlePlaceOrderSubmit} className="space-y-4">
            
            {/* NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 capitalize mb-1">Recipient Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl px-4 py-2.5 text-xs text-stone-850 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-400 capitalize mb-1">WhatsApp Mobile *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl px-4 py-2.5 text-xs text-stone-850 focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[11px] font-mono text-gray-400 capitalize mb-1">Email Coordinates *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl px-4 py-2.5 text-xs text-stone-850 focus:outline-none focus:border-[#C5A880]"
              />
              <p className="text-[10px] text-gray-400 mt-1">Receipt invoice will be forwarded to this inbox.</p>
            </div>

            {/* PINCODE & SUB-LOCALITY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-gray-400 capitalize mb-1">Authorized Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="6-digit PIN"
                  className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl px-4 py-2.5 text-xs text-stone-850 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-gray-400 capitalize mb-1">Neighborhood Area (Optional)</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Koramangala, Indiranagar"
                  className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl px-4 py-2.5 text-xs text-stone-850 focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* RESIDENTIAL ADDRESS */}
            <div>
              <label className="block text-[11px] font-mono text-gray-400 capitalize mb-1">Full Delivery Street Address *</label>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Villa No, Building details, Street or Cross landmark info Description"
                className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            {/* PAYMENT CHOICE BANNER */}
            <div>
              <label className="block text-xs font-mono text-[#B5945F] uppercase tracking-wider font-bold mb-2">💳 Choose Custom Payment Mode</label>
              <div className="space-y-2">
                {[
                  'Credit/Debit Card (Visa, MasterCard, Amex)',
                  'UPI Instant Dispatch (GPay, PhonePe, Paytm)',
                  'Cash on Safe Premium Delivery'
                ].map((mode) => (
                  <label 
                    key={mode} 
                    className={`flex items-center gap-3 border p-3 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      paymentMethod === mode ? 'bg-[#C5A880]/10 border-[#C5A880] text-[#2A1B18]' : 'bg-white border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_group"
                      value={mode}
                      checked={paymentMethod === mode}
                      onChange={() => setPaymentMethod(mode)}
                      className="accent-[#2A1B18]"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span>{mode}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* WHATSAPP UPDATE OPTION */}
            <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={() => setWhatsappOptIn(!whatsappOptIn)}
                  className="mt-0.5 accent-emerald-650 w-4 h-4"
                />
                <div className="text-xs">
                  <p className="font-bold text-emerald-800">✉️ Real-Time WhatsApp Progress Updates (Recommended)</p>
                  <p className="text-gray-500 text-[11px]">Opt-in to securely receive baking state photos, active dispatch notifications, and high-accuracy progress mapping coordinates.</p>
                </div>
              </label>
            </div>

            {/* SECURE SUBMIT ACTION */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authenticating Transact Gateway...</span>
                ) : (
                  <>
                    <span>Confirm Order & Secure checkout</span>
                    <ArrowRight className="w-4.5 h-4.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Form: Order Summary Tally */}
        <div className="lg:col-span-5 bg-[#FAF6F0] border border-[#C5A880]/30 rounded-3xl p-6 space-y-6">
          <div className="border-b border-[#C5A880]/20 pb-4">
            <h4 className="font-serif text-lg font-bold text-[#2A1B18]">Order Feast Summary</h4>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
              <span>Delivery Slot:</span>
              <span className="font-mono text-[#2A1B18] font-bold">{deliveryDate} ({deliverySlot})</span>
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-3 pr-2 border-b border-[#C5A880]/20 pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 justify-between items-start text-xs">
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-[#2A1B18] truncate">
                    {item.cake.name} <span className="font-mono font-normal text-gray-400">x{item.quantity}</span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
                    {item.selectedWeight} • {item.isEggless ? 'Eggless' : 'Classic Recipe'}
                  </p>
                </div>
                <span className="font-mono font-bold text-[#2A1B18]">
                  ${item.pricePerItem * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {orderNotes && (
            <div className="bg-amber-55/15 p-3 rounded-xl border border-[#C5A880]/30 text-stone-600 text-[11px]">
              <p className="font-bold mb-0.5">⚠️ Collector Note:</p>
              <p className="italic">"{orderNotes}"</p>
            </div>
          )}

          <div className="space-y-2 text-xs text-stone-650">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-mono font-semibold">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Priority Slot Transit Fee</span>
              <span className="font-mono font-semibold">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Promotional Savings</span>
                <span className="font-mono">-${discount}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-serif font-bold text-[#2A1B18] pt-3 border-t border-dashed border-[#C5A880]/35 uppercase">
              <span>Grand Balance Charged</span>
              <span className="text-lg">${total}</span>
            </div>
          </div>

          <div className="bg-white border border-[#C5A880]/20 p-4 rounded-2xl flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-stone-600" />
              <span>Priority Fresh Packing Guarantee</span>
            </div>
            <span className="text-emerald-700 font-bold font-mono">ENABLED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
