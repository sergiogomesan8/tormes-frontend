import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shopping-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss'],
})
export class ShoppingCartButton {
  @Input() amount: number = 0;
  @Output() openCartClick: EventEmitter<void> = new EventEmitter<void>();

  openCart() {
    this.openCartClick.emit();
  }
}
