import { Component, Input } from '@angular/core';
import { environment } from '@env';
import { Product } from '@shop/models/product';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private readonly shoppingCartService: ShoppingCartService) {}

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
}
