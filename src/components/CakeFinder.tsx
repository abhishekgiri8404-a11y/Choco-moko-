import { useState } from 'react';
import { Cake } from '../types';
import { CAKES } from '../data';
import { Sparkles, ArrowRight, RefreshCw, Star, Check } from 'lucide-react';

interface CakeFinderProps {
  onQuickView: (cake: Cake) => void;
}

export default function CakeFinder({ onQuickView }: CakeFinderProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [occasion, setOccasion] = useState<string>('');
  const [flavor, setFlavor] = useState<string>('');
  const [dietary, setDietary] = useState<string>('');
  const [budget, setBudget] = useState<string>(''); // 'any' | 'under-25' | 'mid-35' | 'luxury-plus'

  const occasionsList = [
    { value: 'birthday', label: '🎂 Birthday Bash', category: 'all' },
    { value: 'anniversary', label: '💖 Romance & Anniversary', category: 'flowers' },
    { value: 'intimate', label: '🧁 Intimate Celebrations', category: 'bento' },
    { value: 'teatime', label: '☕ Casual High-Tea', category: 'tea' },
    { value: 'gift', label: '🎁 Premium Surprise Gifting', category: 'chocolate' },
  ];

  const flavorProfiles = [
    { value: 'chocolate', label: '🍫 Rich & Decadent Chocolate' },
    { value: 'fruity', label: '🥭 Fresh Fruit & Berries' },
    { value: 'cheese', label: '🧀 Silky Cream Cheesecakes' },
    { value: 'rose', label: '🌸 Exotic Floral & Spiced' },
  ];

  const dietaryNeeds = [
    { value: 'eggless', label: '🌱 100% Guaranteed Eggless Kitchen' },
    { value: 'classic', label: '🥚 Traditional Premium Recipe' },
  ];

  const budgetsList = [
    { value: 'any', label: '✨ Show me the absolute finest, regardless of pricing' },
    { value: 'under-25', label: '🍰 Cute & Compact (Under $25)' },
    { value: 'mid-35', label: '🧁 Standard Celebrations ($25 - $35)' },
    { value: 'premium', label: '👑 Luxury Combo Masterpieces ($35+)' },
  ];

  const handleReset = () => {
    setOccasion('');
    setFlavor('');
    setDietary('');
    setBudget('');
    setStep(1);
  };

  const findMatches = (): Cake[] => {
    return CAKES.filter((cake) => {
      // 1. Filter by category match from occasion
      if (occasion === 'intimate' && cake.category !== 'bento') {
        // bento represents compact elements
      }
      if (occasion === 'teatime' && cake.category !== 'tea') {
        // teatime likes dry cakes
      }

      // 2. Filter by flavor profile
      if (flavor === 'chocolate' && cake.category !== 'chocolate' && !cake.flavor.toLowerCase().includes('chocolate')) {
        return false;
      }
      if (flavor === 'fruity' && !cake.category.match(/(mango|bento)/) && !cake.flavor.toLowerCase().match(/(mango|berry|strawberries|raspberry)/)) {
        return false;
      }
      if (flavor === 'cheese' && cake.category !== 'cheesecake') {
        return false;
      }
      if (flavor === 'rose' && !cake.flavor.toLowerCase().includes('rose') && !cake.category.includes('flowers')) {
        return false;
      }

      // 3. Filter by budget
      if (budget === 'under-25' && cake.startingPrice >= 25) {
        return false;
      }
      if (budget === 'mid-35' && (cake.startingPrice < 25 || cake.startingPrice > 35)) {
        return false;
      }
      if (budget === 'premium' && cake.startingPrice < 35) {
        return false;
      }

      return true;
    });
  };

  const matches = findMatches();
  // Fallback to top rated if list is null or sparse
  const displayedMatches = matches.length > 0 ? matches : CAKES.slice(0, 2);

  return (
    <div id="cake-finder-widget" className="bg-[#FAF6F0] border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm relative overflow-hidden my-12">
      
      {/* Background Decorative Gold Accent blur */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#C5A880]/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#C5A880]/10 rounded-full blur-2xl" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#C5A880]" />
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B5945F]">Gourmet Planner</span>
      </div>

      <div className="relative z-10">
        {step < 5 && (
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-[#2A1B18]' : 'bg-[#C5A880]/20'}`} 
              />
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h4 className="font-serif text-2xl font-bold text-[#2A1B18] mb-4">1. What are we celebrating?</h4>
            <p className="text-xs text-gray-500 mb-6">Every sweet event deserves an appropriately proportioned luxury center-piece.</p>
            <div className="space-y-3">
              {occasionsList.map((occ) => (
                <button
                  key={occ.value}
                  onClick={() => {
                    setOccasion(occ.value);
                    setStep(2);
                  }}
                  className="w-full text-left bg-white hover:bg-[#FAF6F0] border-2 border-[#C5A880]/15 hover:border-[#2A1B18] p-4 rounded-2xl flex justify-between items-center transition-all group font-medium text-sm text-[#2A1B18]"
                >
                  <span>{occ.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="font-serif text-2xl font-bold text-[#2A1B18] mb-4">2. Select your desired flavor profile</h4>
            <p className="text-xs text-gray-500 mb-6 font-mono uppercase tracking-wider text-[#B5945F]">We use single-origin chocolates & authentic field fruit</p>
            <div className="space-y-3">
              {flavorProfiles.map((flv) => (
                <button
                  key={flv.value}
                  onClick={() => {
                    setFlavor(flv.value);
                    setStep(3);
                  }}
                  className="w-full text-left bg-white hover:bg-[#FAF6F0] border-2 border-[#C5A880]/15 hover:border-[#2A1B18] p-4 rounded-2xl flex justify-between items-center transition-all group font-medium text-sm text-[#2A1B18]"
                >
                  <span>{flv.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(1)} 
              className="text-xs text-[#B5945F] hover:underline font-bold mt-6 inline-block"
            >
              ← Back to occasion
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="font-serif text-2xl font-bold text-[#2A1B18] mb-4">3. Select dietary preference</h4>
            <div className="space-y-3">
              {dietaryNeeds.map((d) => (
                <button
                  key={d.value}
                  onClick={() => {
                    setDietary(d.value);
                    setStep(4);
                  }}
                  className="w-full text-left bg-white hover:bg-[#FAF6F0] border-2 border-[#C5A880]/15 hover:border-[#2A1B18] p-4 rounded-2xl flex justify-between items-center transition-all group font-medium text-sm text-[#2A1B18]"
                >
                  <span>{d.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(2)} 
              className="text-xs text-[#B5945F] hover:underline font-bold mt-6 inline-block"
            >
              ← Back to flavors
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h4 className="font-serif text-2xl font-bold text-[#2A1B18] mb-4">4. Select budget tier</h4>
            <div className="space-y-3">
              {budgetsList.map((b) => (
                <button
                  key={b.value}
                  onClick={() => {
                    setBudget(b.value);
                    // Match phase completed
                    setStep(1); // Set selector back to 1 but with results computed
                    // Since it evaluates immediately let's jump to matching screen by utilizing an external state if needed or stay right here. Let's make Step (4) reveal matches dynamically.
                    setStep(1); 
                    // Let's toggle step into a high state
                    // Let's set it to 4 or just let it process. Let's make step = 4 show results on hit.
                    // Wait, we can toggle step to 4 completed. Let's write step 4 to display results instead! Yes:
                    setStep(4);
                  }}
                  className="w-full text-left bg-white hover:bg-[#FAF6F0] border-2 border-[#C5A880]/15 hover:border-[#2A1B18] p-4 rounded-2xl flex justify-between items-center transition-all group font-medium text-sm text-[#2A1B18]"
                >
                  <span>{b.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
            <button 
              onClick={() => setStep(3)} 
              className="text-xs text-[#B5945F] hover:underline font-bold mt-6 inline-block"
            >
              ← Back to dietary
            </button>
          </div>
        )}

        {/* Results Screen inside step 4 or post-evaluation */}
        {step === 4 && (
          <div className="space-y-6 mt-8">
            <div className="border-t border-[#C5A880]/20 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h4 className="font-serif text-2xl font-semibold text-[#2A1B18]">✨ Your Bespoke Recommendations</h4>
                  <p className="text-xs text-gray-500 mt-1">Based on preferred {occasionsList.find(o => o.value === occasion)?.label || 'Celebration'}</p>
                </div>
                <button 
                  onClick={handleReset} 
                  className="flex items-center gap-2 border border-[#C5A880]/40 px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#C5A880]/15 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {displayedMatches.map((cake) => (
                  <div 
                    key={cake.id} 
                    className="bg-white border border-[#C5A880]/20 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src={cake.image} 
                        alt={cake.name} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-[#2A1B18] text-[#FAF6F0] text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                        {cake.flavor.split('&')[0]}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-[#C5A880] mb-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold">{cake.rating}</span>
                          <span className="text-gray-400">({cake.reviewsCount} reviews)</span>
                        </div>
                        <h5 className="font-serif text-base font-bold text-[#2A1B18] tracking-tight">{cake.name}</h5>
                        <p className="text-xs text-gray-600 mt-1.5 line-clamp-2">{cake.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#C5A880]/10 flex items-center justify-between">
                        <span className="text-sm font-mono font-bold text-[#2A1B18]">Starting from ${cake.startingPrice}</span>
                        <button
                          onClick={() => onQuickView(cake)}
                          className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
                        >
                          Customize & Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {matches.length === 0 && (
                <div className="text-center py-4 bg-[#C5A880]/10 rounded-2xl border border-dashed border-[#C5A880]/30 mt-6">
                  <p className="text-xs text-gray-600 font-medium">No strict filters match perfectly, but we highly recommend checking these flagship artisan delicacies!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
