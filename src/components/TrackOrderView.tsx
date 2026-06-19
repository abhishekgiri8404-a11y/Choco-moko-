import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { Truck, ChefHat, Check, Award, Search, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

interface TrackOrderViewProps {
  activeOrder: Order | null;
}

export default function TrackOrderView({ activeOrder }: TrackOrderViewProps) {
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(activeOrder);
  const [trackingStep, setTrackingStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (activeOrder) {
      setFoundOrder(activeOrder);
    }
  }, [activeOrder]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const query = searchId.trim().toUpperCase();
    if (!query) return;

    if (activeOrder && activeOrder.id === query) {
      setFoundOrder(activeOrder);
    } else if (query.startsWith('CM-') && query.length === 9) {
      // Create custom mock tracking structure if they insert another order ID
      const mockOrd: Order = {
        id: query,
        customerName: 'Gourmet Patron',
        email: 'patron@example.com',
        phone: '+91 90000 00000',
        pincode: '560001',
        area: 'Indiranagar',
        address: 'Signature Villa No. 7, Bangalore',
        deliveryDate: 'Today',
        deliverySlot: 'Standard Express',
        items: [],
        subtotal: 35,
        deliveryCharges: 0,
        discount: 5,
        total: 30,
        paymentMethod: 'Prepaid Razorpay',
        status: 'baking'
      };
      setFoundOrder(mockOrd);
    } else {
      setErrorMessage('Order ID not found. Enter your 9-character code starting with CM- (e.g. CM-ORDER)');
    }
  };

  const advanceSimulation = () => {
    setTrackingStep((prev) => (prev < 5 ? (prev + 1 as any) : 1));
  };

  const stepsList = [
    {
      id: 1,
      title: 'Order Approved',
      sub: 'Patisserie kitchen has authorized details & allocated ingredients.',
      icon: ChefHat,
      color: 'bg-stone-800'
    },
    {
      id: 2,
      title: 'Artisanal Sponge Baking',
      sub: 'Cake sponge is slow baking inside professional stone deck ovens.',
      icon: ChefHat,
      color: 'bg-amber-600'
    },
    {
      id: 3,
      title: 'Bespoke Ganache Frosting & Detail',
      sub: 'Detallist is applying Belgian glaze, hazard piping & 24k gold leaf.',
      icon: Sparkles,
      color: 'bg-[#C5A880]'
    },
    {
      id: 4,
      title: 'Dispatched in Cold Transit',
      sub: 'Placed in climate-safe compartments. Courier is cruising.',
      icon: Truck,
      color: 'bg-amber-800'
    },
    {
      id: 5,
      title: 'Fresh Feast Handover',
      sub: 'Handed over fresh! Let celebratory memories begin.',
      icon: Award,
      color: 'bg-emerald-600'
    },
  ];

  const getPercentage = () => {
    return (trackingStep - 1) * 25;
  };

  return (
    <div id="track-order-outer-pane" className="max-w-3xl mx-auto px-4 my-12">
      
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A880]">Real-Time Dispatch Care</span>
        <h3 className="font-serif text-3xl font-bold text-[#2A1B18] mt-1">Patisserie Tracking Desk</h3>
        <p className="text-xs text-gray-500 mt-1.5">Trace the meticulous baking steps of your custom design below.</p>
      </div>

      {/* Manual lookup input */}
      <div className="bg-white border border-[#C5A880]/20 rounded-2xl p-5 shadow-xs mb-8">
        <form onSubmit={handleTrackSubmit} className="space-y-3">
          <label className="block text-xs font-mono font-bold uppercase text-[#2A1B18]">Track using Order Reference ID</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. CM-403915"
              className="flex-1 bg-[#FAF6F0] border border-stone-250 rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-[#C5A880]"
            />
            <button
              type="submit"
              className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" /> Trace
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-650 text-xs mt-1 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
            </p>
          )}
        </form>
      </div>

      {foundOrder ? (
        <div className="bg-white border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 space-y-8 shadow-md">
          
          {/* Header descriptor */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C5A880]/10 pb-4">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" />
                <span className="font-mono text-sm font-bold text-[#2A1B18]">{foundOrder.id} Tracker</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Allocated to: <strong className="text-stone-800">{foundOrder.customerName}</strong> | Delivery: <strong>{foundOrder.deliveryDate} ({foundOrder.deliverySlot})</strong>
              </p>
            </div>

            {/* Fast-forward simulator CTA */}
            <button
              onClick={advanceSimulation}
              className="bg-[#C5A880]/10 hover:bg-[#C5A880]/20 text-[#B5945F] border border-[#C5A880]/30 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Click to simulate delivery status transitions"
            >
              <RefreshCw className="w-3 h-3 animate-spin" /> Fast-Forward Status
            </button>
          </div>

          {/* Dynamic Progress indicator */}
          <div className="relative">
            <div className="absolute top-4 left-4 right-4 h-1 bg-stone-100 -z-10 rounded-full" />
            
            {/* Filled bar progress indicators */}
            <div 
              style={{ width: `${getPercentage()}%` }}
              className="absolute top-4 left-4 h-1 bg-[#C5A880] -z-10 rounded-full transition-all duration-700" 
            />

            <div className="grid grid-cols-5 gap-1 text-center">
              {[1, 2, 3, 4, 5].map((idx) => {
                const StepIcon = stepsList[idx - 1].icon;
                const isCompleted = trackingStep >= idx;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-[#2A1B18] border-[#2A1B18] text-[#FAF6F0] shadow-sm' 
                          : 'bg-white border-[#C5A880]/30 text-stone-300'
                      }`}
                    >
                      {isCompleted && trackingStep > idx ? (
                        <Check className="w-4.5 h-4.5" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-[10px] font-mono font-bold mt-2 leading-none block ${
                      trackingStep === idx ? 'text-[#B5945F]' : isCompleted ? 'text-stone-700' : 'text-gray-300'
                    }`}>
                      Stage {idx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expanded focus on active step status info */}
          <div className="bg-[#FAF6F0] border-2 border-[#C5A880]/15 p-5 rounded-2xl flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 ${stepsList[trackingStep - 1].color} shadow`}>
              {(() => {
                const ActiveIcon = stepsList[trackingStep - 1].icon;
                return <ActiveIcon className="w-6 h-6" />;
              })()}
            </div>
            <div className="text-left space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#B5945F]">active milestone status</span>
              <h4 className="font-serif text-lg font-bold text-[#2A1B18]">{stepsList[trackingStep - 1].title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{stepsList[trackingStep - 1].sub}</p>
            </div>
          </div>

          {/* Baker facts footer block */}
          <div className="text-center pt-2">
            <p className="text-[10px] text-gray-400 font-mono">
              ⚡ Temperature stats: Cake Center: -4.2°C Cold Pack | Dispatch Humidity: 32% optimal.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FAF6F0]/60 border border-dashed border-[#C5A880]/30 rounded-3xl">
          <span className="text-4xl block">🔎</span>
          <p className="font-serif text-base font-bold text-[#2A1B18] mt-2">No Active Order Selected</p>
          <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">If you have recently placed an order, please search using the reference ID sent in your confirmation receipt (e.g. CM-403915).</p>
        </div>
      )}
    </div>
  );
}
