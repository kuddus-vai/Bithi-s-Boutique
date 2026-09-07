export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages: string[];
  fabric: string;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  featured?: boolean;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'Customer';
  status: 'Active' | 'Suspended';
  avatar?: string;
  address: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Dispatched'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderProductDetail {
  productId: string;
  productName: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryCity: string;
  paymentMethod: 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Card';
  paymentStatus: 'Paid' | 'Pending COD' | 'Refunded';
  items: OrderProductDetail[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  courierName: 'Steadfast Courier' | 'Pathao Courier' | 'RedX' | 'Sundarban' | 'In-House';
  trackingNumber: string;
  notes?: string;
  createdAt: string;
  timeline: OrderTimelineEvent[];
}
