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

  async getShoppingCart() {
    let localStorageShoppingCart =
      this.localStorageService.getItem('shopping_cart');

    if (localStorageShoppingCart) {
      let shoppingCart = JSON.parse(localStorageShoppingCart) as ShoppingCart;

      for (let shoppingCartProduct of shoppingCart.shoppingCartProducts) {
        let productId = shoppingCartProduct.product.id;
        if (productId) {
          this.productService
            .findProductById(productId)
            .subscribe((product) => {
              if (product) {
                shoppingCartProduct.product = product;
              }
            });
        }
      }

      this.shoppingCart.next(shoppingCart);
    }

    return this.shoppingCart.getValue();
  }

  addProductToShoppingCart(product: Product) {
    let currentCart = this.shoppingCart.getValue();
    let existingProduct = currentCart.shoppingCartProducts.find(
      (p) => p.product.id === product.id
    );

    if (existingProduct) {
      existingProduct.amount += 1;
      this.updateShoppingCart(currentCart);
    } else {
      this.productService
        .findProductById(product.id)
        .subscribe((fullProduct) => {
          if (fullProduct) {
            currentCart.shoppingCartProducts.push({
              product: fullProduct,
              amount: 1,
            });
            this.updateShoppingCart(currentCart);
          }
        });
    }
  }

  removeProductFromShoppingCart(product: Product) {
    let currentCart = this.shoppingCart.getValue();
    let existingProduct = currentCart.shoppingCartProducts.find(
      (p) => p.product.id === product.id
    );

    if (existingProduct && existingProduct.amount > 1) {
      existingProduct.amount -= 1;
    } else if (existingProduct && existingProduct.amount === 1) {
      const index = currentCart.shoppingCartProducts.indexOf(existingProduct);
      if (index > -1) {
        currentCart.shoppingCartProducts.splice(index, 1);
      }
    }

    this.updateShoppingCart(currentCart);
  }

  deleteProductFromShoppingCart(product: Product) {
    let currentCart = this.shoppingCart.getValue();
    let existingProduct = currentCart.shoppingCartProducts.find(
      (p) => p.product.id === product.id
    );

    if (existingProduct && existingProduct.amount == 1) {
      const index = currentCart.shoppingCartProducts.findIndex(
        (p) => p.product.id === product.id
      );
      if (index !== -1) {
        currentCart.shoppingCartProducts.splice(index, 1);
      }
      this.updateShoppingCart(currentCart);
    }
  }

  updateShoppingCart(newCart: ShoppingCart) {
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

  cleanShoppingCart(){
    this.shoppingCart.next({id: '', shoppingCartProducts: []});
    this.localStorageService.removeItem('shopping_cart');
  }
}
