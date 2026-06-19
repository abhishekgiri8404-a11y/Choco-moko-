import { useState, useEffect } from 'react';
import { Cake, CartItem } from '../types';
import { X, Star, Sparkles, Check, Info, ShieldCheck, ShoppingCart } from 'lucide-react';

interface ProductDetailModalProps {
  cake: Cake | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export default function ProductDetailModal({ cake, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'story' | 'allergens'>('story');
  
  // Custom celebrations add-ons
  const [candles, setCandles] = useState(false);
  const [sparklers, setSparklers] = useState(false);
  const [flowerBouquet, setFlowerBouquet] = useState(false);
  const [handwrittenCard, setHandwrittenCard] = useState(false);
  const [cardMessage, setCardMessage] = useState('');

  // Sizing definitions depending on category
  const isMiniCake = cake?.category === 'bento' || cake?.category === 'tea';
  const weightOptions = isMiniCake 
    ? ['250g', '500g'] 
    : ['0.5 kg', '1.0 kg', '1.5 kg', '2.0 kg'];

  useEffect(() => {
    if (cake) {
      // Reset variables on cake change
      setSelectedWeight(weightOptions[0]);
      setIsEggless(false);
      setCakeMessage('');
      setQuantity(1);
      setCandles(false);
      setSparklers(false);
      setFlowerBouquet(false);
      setHandwrittenCard(false);
      setCardMessage('');
    }
  }, [cake]);

  if (!cake) return null;

  // Real-time price calculation logic
  const getCalculatedPricePerUnit = (): number => {
    let price = cake.startingPrice;
    
    // Weight multiplier ratios
    if (selectedWeight === '500g') price = Math.round(price * 1.6);
    if (selectedWeight === '1.0 kg') price = Math.round(price * 1.7);
    if (selectedWeight === '1.5 kg') price = Math.round(price * 2.3);
    if (selectedWeight === '2.0 kg') price = Math.round(price * 3.0);

    // Eggless premium surcharge
    if (isEggless) {
      price += 2;
    }

    return price;
  };

  const currentPricePerUnit = getCalculatedPricePerUnit();
  
  // Surcharges for add-ons
  const getAddonTotal = (): number => {
    let addonSum = 0;
    if (candles) addonSum += 2;
    if (sparklers) addonSum += 4;
    if (flowerBouquet) addonSum += 15;
    if (handwrittenCard) addonSum += 25; // includes premium bouquet or fine envelope letter card
    return addonSum;
  };

  const finalTotal = (currentPricePerUnit * quantity) + (getAddonTotal() * quantity);

  const handleSubmitAddToCart = () => {
    const item: CartItem = {
      id: `${cake.id}-${selectedWeight}-${isEggless ? 'eggless' : 'classic'}-${Date.now()}`,
      cake,
      selectedWeight,
      isEggless,
      cakeMessage,
      quantity,
      pricePerItem: currentPricePerUnit + getAddonTotal(),
      selectedAddons: {
        candles,
        sparklers,
        flowerBouquet,
        handwrittenCard
      },
      cardMessage: handwrittenCard ? cardMessage : undefined
    };
    onAddToCart(item);
  };

  return (
    <div id="product-detail-overlay" className="fixed inset-0 z-50 bg-[#2A1B18]/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF6F0] border-2 border-[#C5A880] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-[#2A1B18] hover:text-[#FAF6F0] p-2 rounded-full shadow-sm text-[#2A1B18] transition-colors cursor-pointer"
          title="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Gorgeous Cover Imagery & Fast stats */}
        <div className="w-full md:w-1/2 relative bg-gray-50 flex items-stretch min-h-[300px] md:min-h-0">
          <img 
            src={cake.image} 
            alt={cake.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B18]/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Slogan over image */}
          <div className="absolute bottom-6 left-6 right-6 text-[#FAF6F0]">
            <span className="bg-[#C5A880] text-[#2A1B18] text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              🏆 Masterpiece
            </span>
            <h3 className="font-serif text-2xl font-bold leading-tight select-none">
              {cake.name}
            </h3>
            <p className="text-xs text-stone-300 font-mono mt-1.5 uppercase tracking-widest">{cake.flavor}</p>
          </div>
        </div>

        {/* Right Side: Scrollable options workspace */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header detail */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold text-[#C5A880] border border-[#C5A880]/40 px-2.5 py-0.5 rounded-full font-mono">
                {cake.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#B5945F]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold">{cake.rating}</span>
                <span className="text-gray-500">({cake.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-sans">{cake.description}</p>

            {/* TAB SELECTORS: Story vs Allergy */}
            <div className="flex gap-4 border-b border-[#C5A880]/20 mt-4 mb-4">
              <button
                onClick={() => setActiveTab('story')}
                className={`py-2 text-xs font-bold tracking-wider uppercase border-b-2 text-left transition-colors ${
                  activeTab === 'story' ? 'border-[#2A1B18] text-[#2A1B18]' : 'border-transparent text-gray-400 hover:text-[#2A1B18]'
                }`}
              >
                The Story Behind It
              </button>
              <button
                onClick={() => setActiveTab('allergens')}
                className={`py-2 text-xs font-bold tracking-wider uppercase border-b-2 text-left transition-colors ${
                  activeTab === 'allergens' ? 'border-[#2A1B18] text-[#2A1B18]' : 'border-transparent text-gray-400 hover:text-[#2A1B18]'
                }`}
              >
                Allergen Advisory
              </button>
            </div>

            {activeTab === 'story' ? (
              <p className="text-xs text-gray-600 leading-relaxed italic mb-4">
                "{cake.descriptionLong || 'No details available.'}"
              </p>
            ) : (
              <div className="mb-4 text-xs text-stone-600 bg-amber-50 border border-amber-200/50 p-3 rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 text-[#B5945F] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#2A1B18]">Contains the following:</p>
                  <p className="mt-1">{cake.allergens?.join(', ') || 'Wheat gluten, Whipped cream, Soy lecithin trace.'}</p>
                  <p className="mt-1 text-[10px] text-gray-400">Prepared in a boutique facility handling hazelnuts and pistachios.</p>
                </div>
              </div>
            )}

            {/* CONFIGURATION OPTIONS */}
            <div className="space-y-5 border-t border-[#C5A880]/15 pt-4">
              
              {/* SIZE SELECTOR */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2A1B18] mb-2 text-left">
                  ⚖️ Step 1: Choose Cake Size / Weight
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {weightOptions.map((weight) => (
                    <button
                      key={weight}
                      type="button"
                      onClick={() => setSelectedWeight(weight)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        selectedWeight === weight
                          ? 'bg-[#2A1B18] border-[#2A1B18] text-[#FAF6F0]'
                          : 'bg-white border-[#C5A880]/30 hover:border-[#2A1B18]'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* DIETARY CHOICE */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2A1B18] mb-2 text-left">
                  🌱 Step 2: Dietary Customization
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEggless(false)}
                    className={`p-3 rounded-2xl text-xs font-bold text-left border flex items-center justify-between ${
                      !isEggless
                        ? 'bg-white border-[#2A1B18] ring-1 ring-[#2A1B18]'
                        : 'bg-white border-[#C5A880]/30'
                    }`}
                  >
                    <div>
                      <p className="text-[#2A1B18]">Traditional Recipe</p>
                      <p className="text-[10px] text-gray-400 font-normal">Our master baker's classic sponge</p>
                    </div>
                    {!isEggless && <Check className="w-4 h-4 text-[#2A1B18]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEggless(true)}
                    className={`p-3 rounded-2xl text-xs font-bold text-left border flex items-center justify-between ${
                      isEggless
                        ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-white border-[#C5A880]/30'
                    }`}
                  >
                    <div>
                      <p className="text-emerald-800">100% Eggless (+ $2)</p>
                      <p className="text-[10px] text-emerald-600/75 font-normal">Prepared in segregated pure-veg ovens</p>
                    </div>
                    {isEggless && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* MESSAGING ON THE CAKE */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2A1B18] mb-1.5 text-left">
                  ✍️ Step 3: Frosting Text / Message on Cake (Max 30 chars)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder="e.g. Happy 30th Birthday Rahul!"
                  className="w-full bg-white border border-[#C5A880]/40 rounded-xl px-4 py-2.5 text-xs text-[#2A1B18] focus:outline-none focus:border-[#2A1B18]"
                />
              </div>

              {/* CELEBRATION COMPANION ADD-ONS */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2A1B18] mb-2 text-left">
                  🎉 Step 4: Add Celebration Companions (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* Candles */}
                  <button
                    type="button"
                    onClick={() => setCandles(!candles)}
                    className={`p-2.5 rounded-xl border text-left flex justify-between items-center ${candles ? 'bg-[#C5A880]/15 border-[#B5945F]' : 'bg-white border-stone-200'}`}
                  >
                    <span>🕯️ Scented Wax Candles (+$2)</span>
                    <input type="checkbox" checked={candles} onChange={() => {}} className="pointer-events-none accent-[#2A1B18]" />
                  </button>

                  {/* Sparkler */}
                  <button
                    type="button"
                    onClick={() => setSparklers(!sparklers)}
                    className={`p-2.5 rounded-xl border text-left flex justify-between items-center ${sparklers ? 'bg-[#C5A880]/15 border-[#B5945F]' : 'bg-white border-stone-200'}`}
                  >
                    <span>🚀 Cold Sparkler Candle (+$4)</span>
                    <input type="checkbox" checked={sparklers} onChange={() => {}} className="pointer-events-none accent-[#2A1B18]" />
                  </button>

                  {/* Flower Bouquet */}
                  <button
                    type="button"
                    onClick={() => setFlowerBouquet(!flowerBouquet)}
                    className={`col-span-2 p-2.5 rounded-xl border text-left flex justify-between items-center ${flowerBouquet ? 'bg-[#C5A880]/15 border-[#B5945F]' : 'bg-white border-stone-200'}`}
                  >
                    <span>💐 Elegant Red Rose Bouquet (+$15)</span>
                    <input type="checkbox" checked={flowerBouquet} onChange={() => {}} className="pointer-events-none accent-[#2A1B18]" />
                  </button>

                  {/* Card Message */}
                  <button
                    type="button"
                    onClick={() => setHandwrittenCard(!handwrittenCard)}
                    className={`col-span-2 p-2.5 rounded-xl border text-left flex justify-between items-center ${handwrittenCard ? 'bg-[#C5A880]/15 border-[#B5945F] mb-1' : 'bg-white border-stone-200'}`}
                  >
                    <span>✉️ Handwritten Letter on Fine Calligraphy Card (+$25)</span>
                    <input type="checkbox" checked={handwrittenCard} onChange={() => {}} className="pointer-events-none accent-[#2A1B18]" />
                  </button>
                </div>

                {handwrittenCard && (
                  <div className="mt-2 text-xs">
                    <textarea
                      rows={2}
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      placeholder="Write your beautiful card envelope message here..."
                      className="w-full bg-white border border-[#C5A880]/40 rounded-xl p-3 text-xs text-[#2A1B18] focus:outline-none focus:border-[#2A1B18]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ADD TO CART & QUANTITY SECTION BAR */}
          <div className="mt-8 pt-4 border-t-2 border-[#C5A880]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500 font-bold uppercase">Qty:</span>
              <div className="flex items-center border border-[#C5A880]/50 rounded-lg overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-[#C5A880]/10 text-[#2A1B18] font-bold"
                >
                  -
                </button>
                <span className="px-4 font-mono font-bold text-sm text-[#2A1B18]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-[#C5A880]/10 text-[#2A1B18] font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total price indices & checkout bag CTA */}
            <div className="flex items-center gap-4 justify-between sm:justify-end">
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-400 capitalize block leading-none">Configured Prize</span>
                <span className="text-2xl font-serif font-bold text-[#2A1B18]">${finalTotal}</span>
              </div>

              <button
                type="button"
                onClick={handleSubmitAddToCart}
                className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-bold text-xs uppercase px-6 py-3.5 rounded-full flex items-center gap-2 tracking-wider transition-all cursor-pointer shadow-md"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                Add To Banquet Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
