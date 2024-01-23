import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() shoppingCartItems: number = 0;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() shoppingCartButtonClick: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(public translate: TranslateService) {}

  someMethod() {
    this.trigger.openMenu();
  }

  shoppingCart() {
    this.shoppingCartButtonClick.emit();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
