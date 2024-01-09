import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { User } from '@shop/models/user.model';

@Component({
  selector: 'customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.scss'],
})
export class CustomerNavbarComponent {
  @Input() customer: User | undefined;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Output() logoutButtonClick: EventEmitter<void> = new EventEmitter<void>();

  someMethod() {
    this.trigger.openMenu();
  }

  logout() {
    this.logoutButtonClick.emit();
  }
}
