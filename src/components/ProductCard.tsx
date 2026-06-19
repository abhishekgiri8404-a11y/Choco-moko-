import React from 'react';
import { Cake } from '../types';
import { Star, Shield, HelpCircle } from 'lucide-react';

interface ProductCardProps {
  key?: React.Key | string;
  cake: Cake;
  onSelect: (cake: Cake) => void;
}

export default function ProductCard({ cake, onSelect }: ProductCardProps) {
  return (
    <div 
      id={`cake-card-${cake.id}`}
      className="group bg-white border border-[#C5A880]/15 hover:border-[#C5A880] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      {/* Product Image Area */}
      <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onSelect(cake)}>
        <img 
          src={cake.image} 
          alt={cake.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Accent badges on Thumbnail */}
        {cake.isBestseller && (
          <span className="absolute top-3 left-3 bg-[#C5A880] text-[#2A1B18] text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
            👑 Best Seller
          </span>
        )}

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-mono text-[#2A1B18] font-bold tracking-tight">
          {cake.category.toUpperCase()}
        </div>

        {/* Short flavor tag badge overlay */}
        <div className="absolute bottom-3 left-3 bg-[#2A1B18]/85 backdrop-blur-xs text-[#FAF6F0] px-3 py-1 rounded-lg text-[10px] font-medium max-w-[90%] truncate">
          ✨ {cake.flavor}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Star Index */}
          <div className="flex items-center gap-1 text-xs text-[#B5945F] mb-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < Math.floor(cake.rating) ? 'fill-[#C5A880] text-[#C5A880]' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-bold text-[#2A1B18] ml-1">{cake.rating}</span>
            <span className="text-gray-400">({cake.reviewsCount})</span>
          </div>

          <h4 
            onClick={() => onSelect(cake)}
            className="font-serif text-lg font-bold text-[#2A1B18] leading-snug hover:text-[#B5945F] transition-colors cursor-pointer truncate"
          >
            {cake.name}
          </h4>

          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {cake.description}
          </p>
        </div>

        {/* Pricing Actions */}
        <div className="mt-5 pt-4 border-t border-[#C5A880]/10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none">Starting at</span>
            <span className="text-lg font-serif font-bold text-[#2A1B18] mt-0.5">${cake.startingPrice}</span>
          </div>

          <button
            onClick={() => onSelect(cake)}
            className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-sans text-xs font-bold px-4 py-2.5 rounded-full transition-all duration-300 transform group-hover:scale-102 cursor-pointer shadow-xs active:scale-98"
          >
            Order & Customize
          </button>
        </div>
      </div>
    </div>
  );
}
