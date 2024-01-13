import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@env';
import { Product } from '@shop/models/product';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  shoppingCart$ = this.shoppingCartService.shoppingCart$;

  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCart();
  }

  get productImageUrl() {
    return `${environment.TORMES_BACKEND_IMAGES_PRODUCTS}/${this.product.image}`;
  }

  deleteProductFromShoppingCart(product: Product) {
    this.shoppingCartService.deleteProductFromShoppingCart(product);
  }

  removeProductFromShoppingCart(product: Product) {
    this.shoppingCartService.removeProductFromShoppingCart(product);
  }

  addProductToShoppingCart(product: Product) {
    this.shoppingCartService.addProductToShoppingCart(product);
  }

  get totalProductAmount() {
    let total = 0;
    this.shoppingCart$.subscribe((cart) => {
      cart.shoppingCartProducts.forEach((shoppingCartProduct) => {
        if (shoppingCartProduct.product.id === this.product.id) {
          total += shoppingCartProduct.amount;
        }
      });
    });
    return total;
  }
}
