export interface Cake {
  id: string;
  name: string;
  description: string;
  startingPrice: number; // Base price for smallest weight
  rating: number;
  reviewsCount: number;
  image: string;
  category: string; // Chocolate, Red Velvet, Mango, Bento, Cheesecake, Photo Cake, Flowers, Tea Cake
  flavor: string;
  isBestseller: boolean;
  isEgglessOnly?: boolean; // If eggless-only by nature
  suggestedAddons?: string[];
  descriptionLong?: string;
  allergens?: string[];
}

export interface Category {
  id: string;
  name: string;
  label: string;
  icon: string;
}

export interface CartItem {
  id: string; // unique item id in cart (incorporates choice details)
  cake: Cake;
  selectedWeight: string; // "250g", "0.5 kg", "1.0 kg", "1.5 kg", "2.0 kg"
  isEggless: boolean;
  cakeMessage: string;
  quantity: number;
  pricePerItem: number;
  selectedAddons: {
    candles: boolean;
    sparklers: boolean;
    flowerBouquet: boolean;
    handwrittenCard: boolean;
  };
  cardMessage?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  city: string;
  isVerified: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  pincode: string;
  area: string;
  address: string;
  deliveryDate: string;
  deliverySlot: string; // "Express 2hr", "Morning (9 AM - 12 PM)", "Standard (12 PM - 4 PM)", "Evening (5 PM - 8 PM)", "Midnight (11:15 PM - 12 AM)"
  items: CartItem[];
  subtotal: number;
  deliveryCharges: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'ordered' | 'baking' | 'out_for_delivery' | 'delivered';
  couponCode?: string;
}

export interface CustomInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  guestCount: number;
  flavorPreference: string;
  weightPreference: string;
  referenceNotes: string;
  status: 'submitted';
}
