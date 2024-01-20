import { Product } from './product';
import { User } from './user.model';

export interface Order {
  id: string;
  orderId: string;

  status: OrderStatus;

  date: number;
  total: number;
  trackingNumber?: string;

  customer: User;
  customerName?: string;
  customerContact?: number;
  deliveryAddress?: string;
  billingAddress?: string;
  paymentMethod?: string;

  orderedProducts: OrderedProduct[];
}

export interface OrderedProduct {
  product: Product;
  amount: number;
}

export interface ShoppingOrderedProduct {
  productId: Product['id'];
  amount: number;
}

export enum OrderStatus {
  processing = 'processing',
  shipped = 'shipped',
  delayed = 'delayed',
  delivered = 'delivered',
  cancelled = 'cancelled',
}
