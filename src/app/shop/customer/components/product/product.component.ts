import { Component, Input } from '@angular/core';
import { environment } from '@env';
import { Product } from '@shop/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;

  get productImageUrl() {
    return `${environment.TORMES_BACKEND_IMAGES_PRODUCTS}/${this.product.image}`;
  }
}
