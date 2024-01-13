import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { environment } from '@env';
import { Product } from '@shop/models/product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('700ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ShoppingCartComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  shoppingCart$ = this.shoppingCartService.shoppingCart$;

  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getShoppingCart();
  }

  deleteProductFromShoppingCart(product: Partial<Product>) {
    this.shoppingCartService.deleteProductFromShoppingCart(product as Product);
  }

  removeProductFromShoppingCart(product: Partial<Product>) {
    this.shoppingCartService.removeProductFromShoppingCart(product as Product);
  }

  addProductToShoppingCart(product: Partial<Product>) {
    this.shoppingCartService.addProductToShoppingCart(product as Product);
  }

  get totalOrderPrice(): number {
    let total = 0;
    this.shoppingCart$.subscribe((cart) => {
      cart.shoppingCartProducts.forEach((shoppingCartProduct) => {
        if (shoppingCartProduct.product.price) {
          total +=
            shoppingCartProduct.product.price * shoppingCartProduct.amount;
        }
      });
    });
    return parseFloat(total.toFixed(2));
  }

  get productImageUrl() {
    return `${environment.tormes_backend_images}/products/`;
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
