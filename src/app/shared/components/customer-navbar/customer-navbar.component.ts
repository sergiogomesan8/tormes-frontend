import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { User } from '@shop/models/user.model';

@Component({
  selector: 'customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss'],
})
export class CustomerNavbarComponent {
  @Input() customer: User | undefined;
  @Input() shoppingCartItems: number = 0;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() logoutButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() shoppingCartButtonClick: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(public translate: TranslateService) {}

  someMethod() {
    this.trigger.openMenu();
  }

  logout() {
    this.logoutButtonClick.emit();
  }

  shoppingCart() {
    this.shoppingCartButtonClick.emit();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
