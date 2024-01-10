import { Product } from './product';

export interface ShoppingCart {
  id: string;
  shoppingCartProducts: ShoppingCartProduct[];
}

export interface ShoppingCartProduct {
  product: Partial<Product>;
  amount: number;
}
