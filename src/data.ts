import { Category, Cake, Review } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'all', label: 'All Delights', icon: '🍰' },
  { id: 'chocolate', name: 'chocolate', label: 'Chocolate', icon: '🍫' },
  { id: 'velvet', name: 'velvet', label: 'Red Velvet', icon: '🔴' },
  { id: 'mango', name: 'mango', label: 'Mango Special', icon: '🥭' },
  { id: 'bento', name: 'bento', label: 'Bento Cakes', icon: '📦' },
  { id: 'cheesecake', name: 'cheesecake', label: 'Cheesecakes', icon: '🧀' },
  { id: 'photo', name: 'photo', label: 'Photo Cakes', icon: '📷' },
  { id: 'flowers', name: 'flowers', label: 'Cake & Flowers', icon: '🌸' },
  { id: 'tea', name: 'tea', label: 'Tea Cakes', icon: '☕' },
];

export const CAKES: Cake[] = [
  {
    id: 'choco-1',
    name: 'Signature Choco Moko Truffle',
    description: 'Dense Belgian chocolate glaze, toasted Turkish hazelnuts, and beautiful 24k edible gold flakes.',
    startingPrice: 28,
    rating: 4.9,
    reviewsCount: 312,
    image: '/src/assets/images/choco_moko_hero_1781843372065.jpg',
    category: 'chocolate',
    flavor: 'Belgian Dark Chocolate & Hazelnut',
    isBestseller: true,
    descriptionLong: 'Our absolute masterpiece. Handcrafted by our master chocolatier, this signature cake brings together rich 64% Belgian dark chocolate ganache, moist Dutch cocoa sponges, and roasted caramelized hazelnuts. Crowned with magnificent edible 24k gold leaf, it is the perfect hallmark of luxury and taste.',
    allergens: ['Soy', 'Nuts', 'Gluten', 'Dairy'],
    suggestedAddons: ['Scented Candles', 'Elegant Rose Bouquet']
  },
  {
    id: 'velvet-1',
    name: 'Royal Crimson Red Velvet',
    description: 'Ruby cocoa sponge infused with organic buttermilk and a signature Madagascar cream cheese frosting.',
    startingPrice: 30,
    rating: 4.8,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=600&auto=format&fit=crop&q=80',
    category: 'velvet',
    flavor: 'Crimson Buttermilk & Cream Cheese',
    isBestseller: true,
    descriptionLong: 'An exquisite classic. Light, moist, ruby-red chocolate velvet cake layers stacked beautifully with decadent Madagascar vanilla whipped cream cheese frosting. Elegant, rich, and balanced with zero artificial aftertaste.',
    allergens: ['Dairy', 'Gluten', 'Eggless Optional'],
    suggestedAddons: ['Premium Birthday Sparkler']
  },
  {
    id: 'mango-1',
    name: 'Alphonso Golden Sun Torte',
    description: 'Fresh, sun-ripened Alphonso mango gelée with vanilla cardamon chantilly and mango slices arranged like a rose.',
    startingPrice: 32,
    rating: 4.7,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    category: 'mango',
    flavor: 'Fresh Alphonso Mango & Cardamom',
    isBestseller: false,
    descriptionLong: 'The absolute taste of Indian summer. Layers of cloud-soft sponge, filled with pure Alphonso mango purée cooked into a rich gelée, stacked with delicate light cream kissed with crushed organic cardamom, and topped with fresh overlapping mango slices.',
    allergens: ['Dairy', 'Gluten'],
    suggestedAddons: ['Vanilla Butter Cookies']
  },
  {
    id: 'bento-1',
    name: 'Berries & Blossoms Bento',
    description: 'Korean minimalist bento cake with wild strawberries, fresh raspberry compote and double cream vanilla.',
    startingPrice: 16,
    rating: 4.6,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=600&auto=format&fit=crop&q=80',
    category: 'bento',
    flavor: 'Vanilla Bean & Wild Berry Compote',
    isBestseller: true,
    descriptionLong: 'Our adorable 250g Korean bento cake. Designed for intimate celebrations, this sweet treat packs big flavors: soft Genoise sponge, homemade tangy strawberry-raspberry preserves, and customized pastel vanilla-cream exterior piping. Comes in a biodegradable sugarcane clamshell with a wooden spoon and a single pastel candle.',
    allergens: ['Dairy', 'Gluten'],
    suggestedAddons: ['Handwritten Note Card']
  },
  {
    id: 'bento-2',
    name: 'Caramel Lotus Biscoff Bento',
    description: 'Intimate mini bento cake with alternating speculoos cream and brown-butter salted caramel.',
    startingPrice: 18,
    rating: 4.8,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1557925923-cd4648e21187?w=600&auto=format&fit=crop&q=80',
    category: 'bento',
    flavor: 'Speculoos Cookie Butter & Salted Caramel',
    isBestseller: false,
    descriptionLong: 'Indulgent, spiced sweetness in a petite bento avatar. Infused with Belgian Lotus Biscoff crumbs, layered with velvety whipped cookie-butter filling and rich homemade fleur de sel caramel.',
    allergens: ['Gluten', 'Dairy', 'Soy'],
    suggestedAddons: ['Scented Candles']
  },
  {
    id: 'cheesecake-1',
    name: 'Classic New York Baked Custom',
    description: 'Decadent baked cream cheese with crushed brown butter Graham cracker base and citrus glaze.',
    startingPrice: 34,
    rating: 4.9,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1524351119519-14af92c6c12e?w=600&auto=format&fit=crop&q=80',
    category: 'cheesecake',
    flavor: 'Rich Vanilla Bean & Lemon Zest Cream Cheese',
    isBestseller: true,
    descriptionLong: 'Slow-baked with pride using traditional NY patisserie guidelines. Extremely dense, silky-smooth cream cheese block over a caramelized butter Graham cracker crust, brightened with fresh lemon peel infusion. True cheesecake heaven.',
    allergens: ['Dairy', 'Gluten'],
    suggestedAddons: ['Luxurious Raspberry Coulis Jar']
  },
  {
    id: 'photo-1',
    name: 'High-Def Custom Photo Cake',
    description: 'Print your favorite memories in HD vegan sugar-ink on premium butterscotch ganache layers.',
    startingPrice: 42,
    rating: 4.7,
    reviewsCount: 72,
    image: 'https://images.unsplash.com/photo-1562266648-a400f98e10d8?w=600&auto=format&fit=crop&q=80',
    category: 'photo',
    flavor: 'Butterscotch Praline & White Chocolate',
    isBestseller: false,
    descriptionLong: 'Personalized premium cake where you define the cover! Simply submit your photo at checkout, and our advanced food-printers render it in pure, high-contrast sugar edible ink. Underneath is a blissful cake containing crunchy roasted cashew praline, warm butterscotch drip, and rich white chocolate velvet creme.',
    allergens: ['Dairy', 'Gluten', 'Nuts'],
    suggestedAddons: ['Scented Candles', 'Premium Helium Balloon Set']
  },
  {
    id: 'flowers-1',
    name: 'Elysian Rose Petal & Rose Bouquet Combo',
    description: 'A beautiful pairing of Persian rosewater torte and fresh-cut long stem organic Red Roses.',
    startingPrice: 58,
    rating: 5.0,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600&auto=format&fit=crop&q=80',
    category: 'flowers',
    flavor: 'Persian Rosewater, Pistachio & Cardamom',
    isBestseller: false,
    descriptionLong: 'The ultimate royal gift. Features our exquisite Persian Rosewater-infused butter cake layered with double cream and crushed roasted green pistachios, paired elegantly with a tied bouquet of 10 freshly harvested, dew-kissed aromatic deep red roses.',
    allergens: ['Dairy', 'Nuts', 'Gluten'],
    suggestedAddons: ['Handwritten Luxury Letter']
  },
  {
    id: 'tea-1',
    name: 'Gourmet Almond Teatime Loaf',
    description: 'Soft organic honey cake packed with pure almond flour, premium toasted almonds, and warm spices.',
    startingPrice: 14,
    rating: 4.6,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop&q=80',
    category: 'tea',
    flavor: 'Toasted Almond & Wildwood Honey',
    isBestseller: false,
    descriptionLong: 'Our premium dry cake designed specifically for high-tea pairings. Made with extra-pure ground California almonds, high-grade butter, spiced honey, and baked to golden-brown fluffy perfection. Excellent served warm with afternoon espresso.',
    allergens: ['Dairy', 'Nuts', 'Glutenless Recipe'],
    suggestedAddons: ['Premium loose Chamomile tea box']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r-1',
    userName: 'Meera Deshmukh',
    rating: 5,
    comment: 'The Signature Choco Moko Truffle is out of this world! It arrived in exactly 90 minutes. The golden leaf and hazelnuts make it look like a piece of high art, and the taste is rich and elegant. Not overly sweet, which is exactly what we wanted!',
    date: 'June 12, 2026',
    city: 'Bangalore',
    isVerified: true
  },
  {
    id: 'r-2',
    userName: 'Rochelle D’Souza',
    rating: 5,
    comment: 'Ordered the Royal Crimson Red Velvet for my mother’s birthday. The cream cheese frosting was exceptionally fresh, with real vanilla bean seeds visible. Ordering took under 45 seconds on my phone. Customer for life!',
    date: 'June 15, 2026',
    city: 'Mumbai',
    isVerified: true
  },
  {
    id: 'r-3',
    userName: 'Aadi Verma',
    rating: 4,
    comment: 'The Lotus Biscoff bento cake was perfect for our anniversary. Tiny, cute, and packed with flavor. The location check was very fast and they matched the midnight delivery slot exactly. Highlight of our celebration.',
    date: 'June 08, 2026',
    city: 'Delhi NCR',
    isVerified: true
  },
  {
    id: 'r-4',
    userName: 'Priya Iyer',
    rating: 5,
    comment: 'Absolutely love their commitment to zero artificial preservatives! The fresh Alphonso Mango cake tastes like real field fruit and delicate cream, rather than sweet food coloring. Worth every single cent.',
    date: 'June 17, 2026',
    city: 'Bangalore',
    isVerified: true
  }
];

export const VALID_PINCODES: Record<string, string> = {
  '560001': 'Bangalore Central (Express 2-hr Delivery)',
  '560008': 'Indiranagar, Bangalore (Express 2-hr Delivery)',
  '560034': 'Koramangala, Bangalore (Express 2-hr Delivery)',
  '560037': 'Marathahalli, Bangalore (Express 2-hr Delivery)',
  '560103': 'HSR Layout, Bangalore (Express 2-hr Delivery)',
  '400001': 'Fort, Mumbai (Express 2-hr Delivery)',
  '400050': 'Bandra, Mumbai (Express 2-hr Delivery)',
  '110001': 'Connaught Place, Delhi (Express 2-hr Delivery)',
  '110016': 'Hauz Khas, Delhi (Express 2-hr Delivery)'
};
export const MOCK_AREAS = [
  'Koramangala, Bangalore',
  'Indiranagar, Bangalore',
  'HSR Layout, Bangalore',
  'Bandra West, Mumbai',
  'Bandra East, Mumbai',
  'Fort, South Mumbai',
  'Connaught Place, New Delhi',
  'Hauz Khas, New Delhi',
  'Whitefield, Bangalore'
];
