import { useState, useMemo } from 'react';
import Header from './components/Header';
import CakeFinder from './components/CakeFinder';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutView from './components/CheckoutView';
import TrackOrderView from './components/TrackOrderView';
import BrandValueBadges from './components/BrandValueBadges';
import FAQContact from './components/FAQContact';
import { CAKES, CATEGORIES, REVIEWS } from './data';
import { Cake, CartItem, Order } from './types';
import { Star, Clock, Trophy, MapPin, Sparkles, MessageCircle, Heart, ChevronRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cakes' | 'reviews' | 'track' | 'custom-inquiry'>('home');
  const [selectedLocation, setSelectedLocation] = useState('560001 - Bangalore Central (Express)');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Shopping Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Modal selector for Product configured view
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);

  // Category filter for the main cake listings
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterEgglessOnly, setFilterEgglessOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');

  // Checkout cached calculation states
  const [checkoutDate, setCheckoutDate] = useState('');
  const [checkoutSlot, setCheckoutSlot] = useState('');
  const [checkoutCouponCode, setCheckoutCouponCode] = useState('');
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutNotes, setCheckoutNotes] = useState('');

  // Cart Counts
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.pricePerItem * item.quantity), 0);
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if duplicate config already exists
      const duplicateIdx = prevItems.findIndex(
        (prev) => 
          prev.cake.id === item.cake.id && 
          prev.selectedWeight === item.selectedWeight && 
          prev.isEggless === item.isEggless &&
          prev.cakeMessage === item.cakeMessage
      );

      if (duplicateIdx > -1) {
        const updated = [...prevItems];
        updated[duplicateIdx].quantity += item.quantity;
        return updated;
      }
      return [...prevItems, item];
    });
    
    // Close detail modal & open Cart preview instantly for visual confirmation
    setSelectedCake(null);
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    setCartItems((prev) => 
      prev.map((item) => item.id === id ? { ...item, quantity: qty } : item)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Trigger Checkout Transition
  const handleProceedToCheckout = (
    scheduledDate: string,
    scheduledSlot: string,
    coupon: string,
    discountVal: number,
    notes: string
  ) => {
    setCheckoutDate(scheduledDate);
    setCheckoutSlot(scheduledSlot);
    setCheckoutCouponCode(coupon);
    setCheckoutDiscount(discountVal);
    setCheckoutNotes(notes);
    
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order Placement finalized
  const handleOrderPlacementCompleted = (confirmedOrder: Order) => {
    setActiveOrder(confirmedOrder);
    setCartItems([]); // Clear cart
    setIsCheckoutOpen(false);
    setCurrentView('track'); // Take user straight to progress desk
  };

  // Comprehensive Catalog Filters
  const processedCakes = useMemo(() => {
    let list = [...CAKES];

    // Category match
    if (selectedCategory !== 'all') {
      list = list.filter((c) => c.category === selectedCategory);
    }

    // Search query match (broad fuzzy match)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) => 
          c.name.toLowerCase().includes(q) || 
          c.flavor.toLowerCase().includes(q) || 
          c.description.toLowerCase().includes(q)
      );
    }

    // Eggless filters
    if (filterEgglessOnly) {
      // Show those whose description indicates eggless compatibility or bento custom
      list = list.filter((c) => c.category === 'bento' || c.isEgglessOnly || c.flavor.toLowerCase().match(/(strawberry|berry|almond|cheese)/));
    }

    // Sort order
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // popularity -> Bestsellers first, then reviewsCount
      list.sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return b.reviewsCount - a.reviewsCount;
      });
    }

    return list;
  }, [selectedCategory, searchQuery, filterEgglessOnly, sortBy]);

  // Bestsellers specifically extracted
  const bestsellerCakes = useMemo(() => {
    return CAKES.filter((c) => c.isBestseller);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1B18] font-sans antialiased selection:bg-[#C5A880]/30 selection:text-[#2A1B18] flex flex-col justify-between">
      
      {/* Navigation Headers and locations */}
      <Header
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onSetView={(view) => {
          setIsCheckoutOpen(false);
          setCurrentView(view as any);
        }}
        currentView={currentView}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q) {
            setIsCheckoutOpen(false);
            setCurrentView('cakes'); // Jump straight to search results page
          }
        }}
      />

      {/* SECURE CHECKOUT OVERLAY SCREEN */}
      {isCheckoutOpen ? (
        <CheckoutView
          cartItems={cartItems}
          subtotal={cartSubtotal}
          deliveryFee={checkoutSlot.includes('Express') ? 5 : checkoutSlot.includes('Midnight') ? 8 : 0}
          discount={checkoutDiscount}
          total={cartSubtotal + (checkoutSlot.includes('Express') ? 5 : checkoutSlot.includes('Midnight') ? 8 : 0) - checkoutDiscount}
          deliveryDate={checkoutDate}
          deliverySlot={checkoutSlot}
          orderNotes={checkoutNotes}
          onPlaceOrder={handleOrderPlacementCompleted}
          onCancelCheckout={() => setIsCheckoutOpen(false)}
          pincodePrefilled={selectedLocation.match(/\d{6}/)?.[0] || ''}
        />
      ) : (
        /* STANDARD APP VIEWS MANAGER */
        <main className="flex-1">
          
          {/* VIEW 1: HOME LANDING PAGE */}
          {currentView === 'home' && (
            <div id="home-view" className="w-full">
              
              {/* HERO CHAMPION BANNER */}
              <section id="hero-banner-section" className="relative bg-[#2A1B18] text-[#FAF6F0] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[500px] flex items-center">
                
                {/* Background Golden Grids */}
                <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=1920&q=40')] bg-cover bg-center mix-blend-overlay" />
                
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                  
                  {/* Left Column Text description */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center gap-2 bg-[#C5A880]/15 border border-[#C5A880]/40 px-3 py-1 rounded-full text-xs font-mono text-[#C5A880]">
                      <Trophy className="w-4 h-4" /> VIP Luxury Patisserie Standard
                    </div>
                    
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white select-none">
                      Handcrafted Cakes For Your <span className="text-[#C5A880] italic">Golden Moments.</span>
                    </h1>
                    
                    <p className="text-sm sm:text-base text-stone-300 max-w-xl leading-relaxed font-sans">
                      Ditch the preservatives. Treat your loved ones with bespoke bento boxes, gold-leaf chocolate truffles, and rich cheesecakes slow-baked and delivered in pristine ice transport boxes within 2 hours.
                    </p>

                    <div className="font-mono text-xs text-[#C5A880] flex flex-wrap items-center gap-y-2 gap-x-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> Delivered fresh in 2 hours
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Verified Pincode tracking
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                      <button
                        onClick={() => setCurrentView('cakes')}
                        className="bg-[#C5A880] hover:bg-[#FAF6F0] text-[#2A1B18] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                      >
                        Browse Cakes
                      </button>
                      <a
                        href="#cake-finder-widget"
                        className="border border-white/40 hover:border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-colors text-center"
                      >
                        Bespoke Planner Quiz
                      </a>
                    </div>
                  </div>

                  {/* Right Column Canvas representing our newly generated chocolate truffle */}
                  <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                    <div className="relative group max-w-sm mx-auto sm:max-w-none">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C5A880] to-[#FAF6F0] rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition duration-1000" />
                      <div className="relative bg-[#FAF6F0] p-3 rounded-3xl shadow-2xl overflow-hidden aspect-video sm:aspect-square flex justify-stretch items-center">
                        <img 
                          src="/src/assets/images/choco_moko_hero_1781843372065.jpg" 
                          alt="Signature Gold Chocolate Truffle Cake" 
                          className="w-full h-full object-cover rounded-2xl transform hover:scale-103 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Miniature overlay card detailing our gold truffle flagship */}
                    <div className="absolute -bottom-6 -left-6 bg-[#2A1B18] border border-[#C5A880]/35 text-[#FAF6F0] p-4 rounded-2xl shadow-xl max-w-[200px] text-left hidden sm:block">
                      <p className="text-[9px] font-mono uppercase text-[#C5A880] tracking-widest">SIGNATURE FLAVOR</p>
                      <h4 className="font-serif text-sm font-bold mt-1">Choco Moko Gold Truffle</h4>
                      <p className="text-[10px] text-gray-300 mt-1">Turkish hazelnut, rich dark ganache, real 24k gold leaf flakes.</p>
                      <button 
                        onClick={() => {
                          const mainChoco = CAKES.find((c) => c.id === 'choco-1');
                          if (mainChoco) setSelectedCake(mainChoco);
                        }} 
                        className="text-[10px] text-[#C5A880] underline mt-3 inline-block font-black"
                      >
                        Customize Now
                      </button>
                    </div>
                  </div>

                </div>
              </section>

              {/* DYNAMIC POPULAR CATEGORIES HORIZONTAL NAVIGATION MAP */}
              <section id="categories-slider-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-6">
                <div className="text-left mb-6 flex justify-between items-end">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#B5945F] uppercase tracking-wider">Gourmet Selection</span>
                    <h3 className="font-serif text-2xl font-bold text-[#2A1B18] mt-0.5">Shop Culinary Styles</h3>
                  </div>
                  <button 
                    onClick={() => { setSelectedCategory('all'); setCurrentView('cakes'); }}
                    className="text-xs text-[#B5945F] font-bold hover:underline"
                  >
                    View All Categories →
                  </button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentView('cakes');
                      }}
                      className={`p-4 rounded-2xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                        selectedCategory === cat.name
                          ? 'bg-[#2A1B18] border-[#2A1B18] text-[#FAF6F0] shadow-md scale-102 font-bold'
                          : 'bg-white border-[#C5A880]/15 hover:border-[#C5A880] text-[#2A1B18] hover:shadow-xs'
                      }`}
                    >
                      <span className="text-2xl" role="img" aria-label={cat.label}>
                        {cat.icon}
                      </span>
                      <span className="text-[11px] font-medium tracking-tight whitespace-nowrap block mt-1">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Bespoke interactive Cake Finder (matching algorithm widget) */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <CakeFinder onQuickView={(cake) => setSelectedCake(cake)} />
              </section>

              {/* CHAMPION BESTSELLERS GRID SECTION */}
              <section id="bestsellers-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <div className="inline-flex justify-center items-center gap-1.5 bg-[#C5A880]/10 border border-[#C5A880]/20 px-3 py-1 rounded-full text-xs font-mono text-[#B5945F]">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" /> MOST ADORED RECIPES
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#2A1B18] mt-2.5">The Choco Moko Bestsellers</h3>
                  <p className="text-xs text-gray-500 mt-2 font-sans">These masterpieces are baked fresh five times daily to ensure they can arrive at your celebratory doorstep in under 2 hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestsellerCakes.slice(0, 4).map((cake) => (
                    <ProductCard
                      key={cake.id}
                      cake={cake}
                      onSelect={(c) => setSelectedCake(c)}
                    />
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => { setSelectedCategory('all'); setCurrentView('cakes'); }}
                    className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] font-sans text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full transition-colors cursor-pointer text-center"
                  >
                    View All Cakes Customizations
                  </button>
                </div>
              </section>

              {/* BRADY VALUE BADGES */}
              <BrandValueBadges />

              {/* INTEGRATED CUSTOMER REVIEWS BLOG */}
              <section id="homepage-testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880]">verified joy stories</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B18] mt-1">Feasts Shared by Choco Patrons</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {REVIEWS.map((r) => (
                    <div 
                      key={r.id} 
                      className="bg-white border border-[#C5A880]/15 p-6 rounded-3xl text-left space-y-4 shadow-xs"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-serif font-bold text-sm text-[#2A1B18]">{r.userName}</p>
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">{r.city} • Verified Order ✔️</p>
                        </div>
                        <div className="flex text-[#C5A880]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed italic">
                        "{r.comment}"
                      </p>
                      <p className="text-[10px] text-gray-450 text-right">{r.date}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setCurrentView('reviews')}
                    className="text-xs text-[#B5945F] font-bold hover:underline"
                  >
                    Read All Verified Reviews ({REVIEWS.length} total) →
                  </button>
                </div>
              </section>

              {/* FAQS & CONTACT US DIRECTORY SECTION */}
              <FAQContact />

            </div>
          )}

          {/* VIEW 2: PRODUCT CATALOG LISTING WITH DETAILED METER FILTERS */}
          {currentView === 'cakes' && (
            <div id="catalog-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              
              {/* Directory Title Banner */}
              <div className="text-left mb-8 border-b border-[#C5A880]/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <span className="font-mono text-xs font-bold text-[#B5945F] uppercase tracking-wider">The Confectionery Closet</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A1B18] mt-1">Explore Handmade Delicacies</h2>
                  <p className="text-xs text-gray-500 mt-2">Filter and order from our rich lineup of chocolate truffles, organic cheesecakes, and bento gifts.</p>
                </div>

                {/* Quick inline search in catalog screen */}
                <div className="w-full md:w-auto">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chocolate, bento, mango..."
                    className="bg-white border border-[#C5A880]/40 rounded-full px-5 py-2.5 text-xs text-[#2A1B18] focus:outline-none focus:border-[#C5A880] w-full md:w-64"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column METRIC SIDEBAR FILTERS (DOGMA COMPLIANT) */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Category selections */}
                  <div className="bg-white border border-[#C5A880]/15 p-5 rounded-2xl space-y-3 shadow-xs">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#2A1B18] border-b border-[#C5A880]/10 pb-2">📂 Product Category</h4>
                    <div className="flex flex-col gap-1 text-xs">
                      {CATEGORIES.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.id)}
                          className={`w-full text-left py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-between ${
                            selectedCategory === c.id 
                              ? 'bg-[#2A1B18] text-[#FAF6F0] font-bold' 
                              : 'text-[#2A1B18] hover:bg-[#C5A880]/10'
                          }`}
                        >
                          <span>{c.label}</span>
                          <span className="opacity-60">{c.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary checkboxes */}
                  <div className="bg-white border border-[#C5A880]/15 p-5 rounded-2xl space-y-3 shadow-xs text-left">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#2A1B18] border-b border-[#C5A880]/10 pb-2">🌱 Dietary preference</h4>
                    <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer text-[#2A1B18]">
                      <input
                        type="checkbox"
                        checked={filterEgglessOnly}
                        onChange={() => setFilterEgglessOnly(!filterEgglessOnly)}
                        className="accent-[#2A1B18]"
                      />
                      <span>Vegetarian Segregated Option</span>
                    </label>
                  </div>

                  {/* Sort Order dropdown */}
                  <div className="bg-white border border-[#C5A880]/15 p-5 rounded-2xl space-y-3 shadow-xs text-left">
                    <h4 className="text-xs font-mono font-bold uppercase text-[#2A1B18] border-b border-[#C5A880]/10 pb-2">⚖️ Sort Arrangement</h4>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full bg-[#FAF6F0] border border-stone-250 rounded-xl p-2.5 text-xs text-stone-850 focus:outline-none"
                    >
                      <option value="popularity">Bestsellers & Popularity First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Patrons Top Rating</option>
                    </select>
                  </div>

                </div>

                {/* Right Column PRODUCT TILES GRID */}
                <div className="lg:col-span-9 space-y-8">
                  
                  {processedCakes.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-dashed border-[#C5A880]/30 rounded-3xl">
                      <span className="text-4xl">🍰</span>
                      <p className="font-serif text-lg font-bold text-[#2A1B18] mt-2">No cakes found</p>
                      <p className="text-xs text-gray-550 mt-1 max-w-xs mx-auto">No matching recipes fit your selected filters. Please adjust your keywords or choose another category.</p>
                      <button
                        onClick={() => {setSelectedCategory('all'); setSearchQuery(''); setFilterEgglessOnly(false);}}
                        className="bg-[#2A1B18] hover:bg-[#B5945F] text-[#FAF6F0] text-xs font-bold px-6 py-2 rounded-xl transition-all mt-4"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {processedCakes.map((cake) => (
                        <ProductCard
                          key={cake.id}
                          cake={cake}
                          onSelect={(c) => setSelectedCake(c)}
                        />
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* VIEW 3: DEDICATED VERIFIED REVIEWS STATS VIEW */}
          {currentView === 'reviews' && (
            <div id="reviews-exclusive-view" className="max-w-4xl mx-auto px-4 my-12 text-left">
              <div className="text-center mb-10">
                <span className="text-xs uppercase font-mono tracking-widest text-[#B5945F]">Patron Social Proof</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A1B18] mt-1">Honest Confectionery Feedback</h2>
                <p className="text-xs text-gray-500 mt-2">All reviews originate from customers who bought verified cakes using the Choco Moko system.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
                <div className="bg-[#FAF6F0] border-2 border-[#C5A880]/20 p-6 rounded-3xl text-center space-y-2 flex flex-col justify-center">
                  <p className="text-5xl font-serif font-extrabold text-[#2A1B18]">4.9</p>
                  <p className="text-xs text-amber-600 font-bold">★★★★★ (OUT OF 5)</p>
                  <p className="text-[10px] text-gray-400 font-mono tracking-wider">Based on 1,480 verified receipts</p>
                </div>

                <div className="bg-white border border-[#C5A880]/15 p-6 rounded-3xl md:col-span-2 space-y-2 text-xs">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-2">Flavor metrics performance</p>
                  <div className="space-y-2 font-medium">
                    <div className="flex justify-between items-center">
                      <span className="w-24">Ganache Truffle:</span>
                      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[98%] h-full bg-[#2A1B18]" />
                      </div>
                      <span>98% superb</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="w-24">Veg Segregation:</span>
                      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[100%] h-full bg-[#2A1B18]" />
                      </div>
                      <span>100% clean</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="w-24">On-Time Transit:</span>
                      <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden mx-3">
                        <div className="w-[94%] h-full bg-[#2A1B18]" />
                      </div>
                      <span>94% prompt</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {REVIEWS.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-white border border-[#C5A880]/15 p-6 rounded-3xl space-y-4 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#2A1B18]">{review.userName}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{review.city} • Verified Order ✔️</p>
                      </div>
                      <div className="flex text-[#C5A880]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 italic">
                      "{review.comment}"
                    </p>
                    <div className="text-right text-[10px] text-gray-450">{review.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: LIVE DISPATCH TRACKER VIEW */}
          {currentView === 'track' && (
            <div id="track-exclusive-view" className="w-full">
              <TrackOrderView activeOrder={activeOrder} />
            </div>
          )}

          {/* VIEW 5: CUSTOM MASTERPIECES */}
          {currentView === 'custom-inquiry' && (
            <div id="custom-inquiry-exclusive-view" className="max-w-4xl mx-auto px-4 my-12">
              <FAQContact />
            </div>
          )}

        </main>
      )}

      {/* FOOTER DIRECTORY SECTION */}
      <footer id="main-footer" className="bg-[#2A1B18] text-[#FAF6F0] pt-16 pb-8 border-t border-[#C5A880]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-[#C5A880]/15 pb-12 mb-8 text-left">
            
            {/* Column 1 - Brand intro */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wide text-white">Choco moko</span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5A880] -mt-1">C a k e s • B o u t i q u e</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                A premium, mobile-first patisserie combining European baking meticulousness with lightning-speed local neighborhood dispatch.
              </p>
              <div className="flex gap-3 text-xs">
                <a href="https://wa.me/15550000000" target="_blank" rel="noreferrer" className="text-[#C5A880] hover:text-white transition-colors">WhatsApp support</a>
                <span>•</span>
                <a href="tel:+1800CAKEPASS" className="text-[#C5A880] hover:text-white transition-colors">Patissier hotline</a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-[#C5A880] mb-4">Gourmet Selection</h5>
              <ul className="text-xs text-stone-300 space-y-2">
                <li><button onClick={() => { setSelectedCategory('chocolate'); setCurrentView('cakes'); }} className="hover:text-white hover:underline transition-all">Belgium Truffle Cakes</button></li>
                <li><button onClick={() => { setSelectedCategory('bento'); setCurrentView('cakes'); }} className="hover:text-white hover:underline transition-all">Korean Bento Box Cakes</button></li>
                <li><button onClick={() => { setSelectedCategory('cheesecake'); setCurrentView('cakes'); }} className="hover:text-white hover:underline transition-all font-sans">Baked NY Cheesecakes</button></li>
                <li><button onClick={() => { setSelectedCategory('all'); setCurrentView('cakes'); }} className="hover:text-white hover:underline transition-all">Full Custom Selection</button></li>
              </ul>
            </div>

            {/* Column 3 - Policies links */}
            <div>
              <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-[#C5A880] mb-4">Compliances & Trust</h5>
              <ul className="text-xs text-stone-300 space-y-2">
                <li><button onClick={() => { setCurrentView('custom-inquiry'); }} className="hover:text-white hover:underline transition-all">Special Custom Orders</button></li>
                <li><button onClick={() => { setCurrentView('custom-inquiry'); }} className="hover:text-white hover:underline transition-all">Refund & Cancellation Rules</button></li>
                <li><button onClick={() => { setCurrentView('custom-inquiry'); }} className="hover:text-white hover:underline transition-all">Terms & Freshness Guarantee</button></li>
                <li><button onClick={() => { setCurrentView('track'); }} className="hover:text-white hover:underline transition-all">Trace Live Bakery Progress</button></li>
              </ul>
            </div>

            {/* Column 4 - Newsletter / Signup */}
            <div className="space-y-4">
              <h5 className="font-serif text-sm font-bold uppercase tracking-wider text-[#C5A880] mb-4">Patron Offer Inbox</h5>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                Subscribe to receive private feast discounts and premium seasonal flavor catalog releases.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed perfectly to our VIP updates list!'); }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@celebrate.com"
                  className="bg-[#FAF6F0] border border-[#C5A880]/30 rounded-xl px-3 py-2 text-xs text-[#2A1B18] focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="bg-[#C5A880] hover:bg-white text-[#2A1B18] font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  Join Us
                </button>
              </form>
            </div>

          </div>

          <div className="text-center font-mono text-[10px] text-stone-400 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Choco Moko Cakes. All Rights Reserved. Crafted for delicious milestone moments.</p>
            <p className="text-[#C5A880] uppercase tracking-[0.15em]">Luxury Patisserie, Fast Delivery</p>
          </div>

        </div>
      </footer>

      {/* DETAILED OPTION CONFIGURATOR PRODUCT MODAL */}
      <ProductDetailModal
        cake={selectedCake}
        onClose={() => setSelectedCake(null)}
        onAddToCart={handleAddToCart}
      />

      {/* SIDE CART BANQUET DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        deliveryPincodeSet={selectedLocation}
      />

    </div>
  );
}
