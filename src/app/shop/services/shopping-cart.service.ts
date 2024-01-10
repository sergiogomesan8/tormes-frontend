import { Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorage.service';
import { Product } from '@shop/models/product';
import { ShoppingCart, ShoppingCartProduct } from '@shop/models/shoppping-cart';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService implements OnInit {
  private shoppingCart = new BehaviorSubject<ShoppingCart>({
    id: '',
    shoppingCartProducts: [],
  });
  shoppingCart$ = this.shoppingCart.asObservable();

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getShoppingCart();
  }

  addProductToShoppingCart(product: Product) {
    let currentCart = this.shoppingCart.getValue();
    let existingProduct = currentCart.shoppingCartProducts.find(
      (p) => p.product.id === product.id
    );

    if (existingProduct) {
      existingProduct.amount += 1;
    } else {
      currentCart.shoppingCartProducts.push({
        product: { id: product.id, name: product.name, image: product.image },
        amount: 1,
      });
    }

    this.shoppingCart.next(currentCart);

    let localStorageCart = JSON.parse(JSON.stringify(currentCart));
    localStorageCart.shoppingCartProducts.forEach(
      (item: ShoppingCartProduct) => {
        item.product = { id: item.product.id, name: item.product.name };
      }
    );

    this.localStorageService.setItem(
      'shopping_cart',
      JSON.stringify(localStorageCart)
    );
  }

  async getShoppingCart() {
    let localStorageShoppingCart =
      this.localStorageService.getItem('shopping_cart');

    if (localStorageShoppingCart) {
      let shoppingCart = JSON.parse(localStorageShoppingCart) as ShoppingCart;

      for (let i = 0; i < shoppingCart.shoppingCartProducts.length; i++) {
        let productId = shoppingCart.shoppingCartProducts[i].product.id;

        if (productId) {
          this.productService
            .findProductById(productId)
            .subscribe((product) => {
              if (product) {
                shoppingCart.shoppingCartProducts[i].product = product;
              }
            });
        }
      }

      this.shoppingCart.next(shoppingCart);
    }

    return this.shoppingCart.getValue();
  }

  updateShoppingCart(newCart: ShoppingCart) {
    console.log('newCart', newCart);
    this.shoppingCart.next(newCart);

    let localStorageCart = JSON.parse(JSON.stringify(newCart));
    localStorageCart.shoppingCartProducts.forEach(
      (item: ShoppingCartProduct) => {
        item.product = { id: item.product.id, name: item.product.name };
      }
    );

    this.localStorageService.setItem(
      'shopping_cart',
      JSON.stringify(localStorageCart)
    );
  }
}
