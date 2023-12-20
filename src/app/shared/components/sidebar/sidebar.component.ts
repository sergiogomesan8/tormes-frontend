import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { IconName, faHome } from '@fortawesome/free-solid-svg-icons';
import {
  faBoxOpen,
  faCashRegister,
  faStore,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
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
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  navData = navbarData;
}
export const navbarData = [
  {
    routerLink: 'dashboard',
    icon: faHome as unknown as IconName,
    label: 'Dashboard',
  },
  {
    routerLink: 'catalog',
    icon: faStore as unknown as IconName,
    label: 'Catalog',
  },
  {
    routerLink: 'cash-register',
    icon: faCashRegister as unknown as IconName,
    label: 'Cash Register',
  },
  {
    routerLink: 'employee-management',
    icon: faUsers as unknown as IconName,
    label: 'Employee',
  },
  {
    routerLink: 'order',
    icon: faBoxOpen as unknown as IconName,
    label: 'Orders',
  },
];
