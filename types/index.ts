export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // in cents
  weight: string;
  category: string;
  badge?: string | null;
  stock: number;
  imageUrl?: string | null;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  date: Date;
  timeSlot: string;
  type: 'PICKUP' | 'WORKSHOP';
  participants: number;
  message?: string;
}
