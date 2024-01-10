import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { environment } from '@env';
import { take } from 'rxjs';

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

  deleteProduct(product: any) {
    console.log('delete', product);
    this.shoppingCartService.shoppingCart$.pipe(take(1)).subscribe((cart) => {
      console.log('cart', cart);
      const index = cart.shoppingCartProducts.findIndex(
        (p) => p.product.id === product.product.id
      );
      console.log('index', index);
      if (index !== -1) {
        cart.shoppingCartProducts.splice(index, 1);
        console.log('after splice', cart);
        this.shoppingCartService.updateShoppingCart(cart);
        console.log('updateShoppingCart called');
      }
    });
  }

  removeProduct(product: any) {
    if (product.amount > 1) {
      product.amount--;
      this.shoppingCartService.shoppingCart$.pipe(take(1)).subscribe((cart) => {
        this.shoppingCartService.updateShoppingCart(cart);
      });
    }
  }

  addProduct(product: any) {
    product.amount++;
    this.shoppingCartService.shoppingCart$.pipe(take(1)).subscribe((cart) => {
      this.shoppingCartService.updateShoppingCart(cart);
    });
  }

  get productImageUrl() {
    return `${environment.TORMES_BACKEND_IMAGES_PRODUCTS}/`;
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
