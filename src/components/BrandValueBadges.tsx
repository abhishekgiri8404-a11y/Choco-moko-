import { ShieldCheck, Flame, Heart, Sparkles, Award, RotateCcw } from 'lucide-react';

export default function BrandValueBadges() {
  const values = [
    {
      icon: Flame,
      title: 'Baked Fresh on Demand',
      desc: 'We never pre-freeze. Your sponges are whipped and slow-baked within 2 hours of your celebration event.'
    },
    {
      icon: Award,
      title: 'Boutique Patisserie Grade',
      desc: 'We solely use single-origin dark chocolate, pure butter, and authentic fresh fields organic fruits.'
    },
    {
      icon: ShieldCheck,
      title: 'segregated Safe Kitchens',
      desc: 'Our Eggless recipes are mixed and baked in designated, certified vegetarian zones with dedicated ovens.'
    },
    {
      icon: RotateCcw,
      title: 'Freshness Replacements',
      desc: 'Not fully content with details? We immediately prepare replacement cupcakes or issue refunds instantly.'
    }
  ];

  return (
    <div id="brand-values-block" className="py-12 bg-white border-t border-b border-[#C5A880]/15 my-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex justify-center items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B5945F]">The Choco Moko Difference</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B18]">Our Meticulous Baking Standard</h3>
          <p className="text-xs text-stone-500 mt-2">Why urban celebrate-makers trust Choco Moko for their most precious milestones.</p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div 
                key={i} 
                className="bg-[#FAF6F0] border border-[#C5A880]/15 p-6 rounded-3xl space-y-3 hover:border-[#C5A880] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#2A1B18] text-[#FAF6F0] flex items-center justify-center shadow">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#2A1B18]">{v.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Accolades Bar */}
        <div className="mt-12 bg-[#FAF6F0] border-2 border-[#C5A880]/15 p-6 rounded-3xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#C5A880]/25 text-center justify-items-center items-center">
          <div className="flex-1 pb-4 md:pb-0 md:px-4 py-2">
            <span className="text-2xl font-serif font-bold text-[#2A1B18] block">4.9 ★★★★★</span>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mt-1">Average Patron Rating</span>
          </div>
          <div className="flex-1 py-4 md:py-0 md:px-4">
            <span className="text-2xl font-serif font-bold text-[#2A1B18] block">15,000+</span>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mt-1">Birthday Celebrations Shared</span>
          </div>
          <div className="flex-1 pt-4 md:pt-0 md:px-4 py-2">
            <span className="text-2xl font-serif font-bold text-[#2A1B18] block">100% Traceable</span>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mt-1">organic single-origin chocolate</span>
          </div>
        </div>

      </div>
    </div>
  );
}
