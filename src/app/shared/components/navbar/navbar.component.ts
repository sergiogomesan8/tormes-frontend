import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() shoppingCartButtonClick: EventEmitter<void> =
    new EventEmitter<void>();

  someMethod() {
    this.trigger.openMenu();
  }

  shoppingCart() {
    this.shoppingCartButtonClick.emit();
  }
}
