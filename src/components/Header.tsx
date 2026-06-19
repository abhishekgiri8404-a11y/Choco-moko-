import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, MapPin, Check, ChevronRight, Phone } from 'lucide-react';
import { VALID_PINCODES, MOCK_AREAS } from '../data';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  onSetView: (view: 'home' | 'cakes' | 'about' | 'reviews' | 'track' | 'contact' | 'custom-inquiry') => void;
  currentView: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  cartCount,
  onOpenCart,
  selectedLocation,
  setSelectedLocation,
  onSetView,
  currentView,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [pincodeSuccess, setPincodeSuccess] = useState('');
  const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPincodeError('');
    setPincodeSuccess('');

    const query = pincodeInput.trim();
    if (!/^\d{6}$/.test(query)) {
      setPincodeError('Please enter a valid 6-digit pincode');
      return;
    }

    if (VALID_PINCODES[query]) {
      const areaName = VALID_PINCODES[query];
      setPincodeSuccess(`Delivering to ${areaName}!`);
      setSelectedLocation(`PIN: ${query} - ${areaName.split('(')[0].trim()}`);
      setTimeout(() => {
        setIsLocationModalOpen(false);
        setPincodeSuccess('');
      }, 1500);
    } else {
      // General fall-back delivery
      setPincodeSuccess('Standard delivery available for this pin (estimate 4 hours)!');
      setSelectedLocation(`PIN: ${query} - Regional Zone`);
      setTimeout(() => {
        setIsLocationModalOpen(false);
        setPincodeSuccess('');
      }, 2000);
    }
  };

  const handleSelectPredefined = (area: string) => {
    setSelectedLocation(area);
    setIsLocationModalOpen(false);
  };

  const useCurrentLocation = () => {
    const rIdx = Math.floor(Math.random() * MOCK_AREAS.length);
    const mockLoc = MOCK_AREAS[rIdx];
    setSelectedLocation(mockLoc);
    setIsLocationModalOpen(false);
  };

  const navItems = [
    { label: 'Home', view: 'home' as const },
    { label: 'Our Cakes', view: 'cakes' as const },
    { label: 'Custom Masterpieces', view: 'custom-inquiry' as const },
    { label: 'Reviews', view: 'reviews' as const },
    { label: 'Track Order', view: 'track' as const },
  ];

  return (
    <>
      {/* Top Premium Sticky / Announcement Bar */}
      <div id="announcement-bar" className="bg-[#2A1B18] text-[#FAF6F0] py-2 px-4 text-xs font-mono tracking-wider text-center flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 border-b border-[#C5A880]/20">
        <span>✨ SAME-DAY LUXURY DISPATCH WITHIN 2 HOURS IN SELECT REGIONS</span>
        <span className="hidden sm:inline text-[#C5A880]">|</span>
        <span className="font-sans font-medium text-[#C5A880] tracking-normal">Code: CHOCO10 for 10% Off First Feast Order</span>
      </div>

      {/* Primary Sticky Header */}
      <header id="main-header" className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#C5A880]/15 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Mobile Hamburger Menu */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-[#2A1B18] p-2 hover:text-[#C5A880] transition-colors"
              aria-label="Open Navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo / Brand Name */}
            <div 
              id="brand-logo" 
              onClick={() => onSetView('home')} 
              className="flex flex-col items-center cursor-pointer select-none group"
            >
              <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#2A1B18] group-hover:text-[#B5945F] transition-colors">
                Choco moko
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C5A880] -mt-1 group-hover:text-[#2A1B18] transition-colors">
                C a k e s • B o u t i q u e
              </span>
            </div>

            {/* Desktop Navigation Items */}
            <nav id="desktop-nav" className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onSetView(item.view)}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-colors py-2 ${
                    currentView === item.view 
                      ? 'text-[#B5945F]' 
                      : 'text-[#2A1B18] hover:text-[#B5945F]'
                  }`}
                >
                  {item.label}
                  {currentView === item.view && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B5945F] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Location Selector Component */}
            <button
              id="location-selector"
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden md:flex items-center gap-2 bg-[#FAF6F0] border border-[#C5A880]/30 hover:border-[#C5A880] text-[#2A1B18] px-4 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 hover:shadow-sm"
            >
              <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
              <span className="max-w-[150px] truncate text-left">
                {selectedLocation || 'Set Delivery Location'}
              </span>
              <span className="text-[10px] text-[#B5945F] font-semibold border-l border-[#C5A880]/30 pl-2">CHANGE</span>
            </button>

            {/* Right Side Tools: Search and Cart */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Search Toggle */}
              <div className="relative flex items-center">
                {isSearchFieldOpen && (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chocolate, bento, mango..."
                    className="absolute right-10 w-44 sm:w-60 bg-[#FAF6F0] border border-[#C5A880]/40 rounded-full px-4 py-1.5 text-xs text-[#2A1B18] focus:outline-none focus:border-[#C5A880] transition-all"
                    autoFocus
                  />
                )}
                <button
                  onClick={() => setIsSearchFieldOpen(!isSearchFieldOpen)}
                  className="p-2 text-[#2A1B18] hover:text-[#C5A880] transition-colors cursor-pointer"
                  title="Search cakes"
                >
                  <Search className="w-5.5 h-5.5" />
                </button>
              </div>

              {/* Call Hotline */}
              <a 
                href="tel:+1800CAKEPASS" 
                className="hidden sm:flex items-center justify-center p-2 text-[#2A1B18] hover:text-[#C5A880] transition-colors"
                title="Call Patisserie Hotline"
              >
                <Phone className="w-5 h-5" />
              </a>

              {/* Luxury Cart Trigger Bag */}
              <button
                id="cart-trigger-btn"
                onClick={onOpenCart}
                className="relative bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] p-3 rounded-full transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C5A880] text-[#2A1B18] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FAF6F0] shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Inline Location Bar */}
        <div id="mobile-location-bar" className="md:hidden flex items-center justify-between bg-[#FAF6F0] border-t border-b border-[#C5A880]/15 px-4 py-2">
          <div className="flex items-center gap-1.5 text-[11px] text-[#2A1B18] font-medium truncate max-w-[80%]">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="truncate">{selectedLocation || 'Where to deliver delicious cakes?'}</span>
          </div>
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="text-[10px] text-[#B5945F] uppercase font-bold tracking-wider"
          >
            Select Area
          </button>
        </div>
      </header>

      {/* Floating Mobile Side Drawer Menu */}
      {isMenuOpen && (
        <div id="mobile-drawer-overlay" className="fixed inset-0 z-50 bg-[#2A1B18]/60 backdrop-blur-sm lg:hidden flex justify-start">
          <div className="bg-[#FAF6F0] w-4/5 max-w-[320px] h-full shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold tracking-wide text-[#2A1B18]">Choco moko</span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C5A880] -mt-1">C a k e s  B o u t i q u e</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#2A1B18] hover:text-[#C5A880] p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Side Nav Links */}
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => {
                      onSetView(item.view);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between py-3 px-4 rounded-xl text-left font-sans text-sm font-semibold tracking-wide transition-all ${
                      currentView === item.view 
                        ? 'bg-[#2A1B18] text-[#FAF6F0]' 
                        : 'text-[#2A1B18] hover:bg-[#C5A880]/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Delivery info prompt inside menu */}
              <div className="mt-8 p-4 bg-[#C5A880]/10 rounded-2xl border border-[#C5A880]/20">
                <p className="text-[11px] font-mono text-[#B5945F] uppercase tracking-wider mb-2">My Delivery Zone</p>
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#2A1B18]">
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span className="truncate">{selectedLocation || 'Not set yet'}</span>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLocationModalOpen(true);
                  }}
                  className="text-[11px] text-[#B5945F] underline font-bold"
                >
                  Update Pincode
                </button>
              </div>
            </div>

            {/* Custom order trigger call at bottom */}
            <div className="border-t border-[#C5A880]/20 pt-6">
              <p className="text-xs text-gray-500 mb-1">Corporate or Custom Orders?</p>
              <a
                href="https://wa.me/15550000000?text=Hello%20Choco%20Moko%20Cakes!%20I%20would%20like%20to%20inquire%20about%20a%20custom%20luxury%20cake."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#128C7E] text-white flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
              >
                <span>Chat via WhatsApp</span>
              </a>
              <div className="text-center mt-3 text-[10px] text-gray-400">
                © {new Date().getFullYear()} Choco Moko Cakes
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pincode & Delivery Area Modal Pop-Up */}
      {isLocationModalOpen && (
        <div id="location-modal-overlay" className="fixed inset-0 z-50 bg-[#2A1B18]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] border-2 border-[#C5A880] w-full max-w-md rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="absolute top-4 right-4 text-[#2A1B18] hover:text-[#C5A880] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#C5A880]/15 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2A1B18]">Check Pincode Delivery</h3>
              <p className="text-xs text-gray-600 mt-1">Check availability for express 2-hr transit & fresh delivery slots</p>
            </div>

            {/* Verification Form */}
            <form onSubmit={handlePincodeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#2A1B18] mb-1.5 text-left">
                  Enter 6-Digit Delivery Pincode
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => {
                      setPincodeInput(e.target.value.slice(0, 6));
                      setPincodeError('');
                    }}
                    placeholder="e.g. 560001 or 400050"
                    className="w-full bg-white border border-[#C5A880]/50 rounded-xl px-4 py-3 text-sm text-[#2A1B18] focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Check
                  </button>
                </div>
                
                {pincodeError && <p className="text-red-600 text-xs mt-1.5 font-medium text-left">⚠️ {pincodeError}</p>}
                {pincodeSuccess && (
                  <p className="text-[#128C7E] text-xs mt-1.5 font-semibold text-left flex items-center gap-1">
                    <Check className="w-4 h-4 shrink-0" /> {pincodeSuccess}
                  </p>
                )}
              </div>
            </form>

            {/* Quick detect current location button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={useCurrentLocation}
                className="w-full border border-[#C5A880]/40 text-[#2A1B18] py-2.5 rounded-xl text-xs font-semibold hover:bg-[#C5A880]/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🎯 Use My Current Location</span>
              </button>
            </div>

            {/* Popular coverage slots helper */}
            <div className="mt-6 border-t border-[#C5A880]/20 pt-4">
              <p className="text-[10px] font-mono text-[#B5945F] uppercase tracking-wider mb-2 text-left text-center">🌟 Popular Delivery Neighborhoods</p>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#2A1B18]">
                {Object.keys(VALID_PINCODES).slice(0, 4).map((pin) => (
                  <button
                    key={pin}
                    onClick={() => handleSelectPredefined(`PIN: ${pin} - ${VALID_PINCODES[pin].split('(')[0]}`)}
                    className="bg-[#C5A880]/5 hover:bg-[#C5A880]/15 border border-[#C5A880]/15 py-1.5 px-2 rounded-lg text-left truncate transition-colors text-xs"
                    title={VALID_PINCODES[pin]}
                  >
                    🚀 {pin} - {VALID_PINCODES[pin].split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
