import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  IconName,
  faHome,
  faBoxOpen,
  faCashRegister,
  faStore,
  faUsers,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

interface NavItem {
  routerLink: string;
  icon: IconName;
  label: string;
  childOptions?: ChildNavItem[];
}

interface ChildNavItem {
  routerLink: string;
  label: string;
}

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

  navbarData: NavItem[] = [
    {
      routerLink: 'dashboard',
      icon: faHome as unknown as IconName,
      label: 'shop.admin.dashboard.title',
      childOptions: [
        {
          routerLink: 'products',
          label: 'shop.admin.dashboard.options.products.title',
        },
        {
          routerLink: 'sections',
          label: 'shop.admin.dashboard.options.sections',
        },
      ],
    },
    {
      routerLink: 'catalog',
      icon: faStore as unknown as IconName,
      label: 'shop.admin.catalog.title',
    },
    {
      routerLink: 'cash-registers',
      icon: faCashRegister as unknown as IconName,
      label: 'shop.admin.cashRegister.title',
    },
    {
      routerLink: 'employee-management',
      icon: faUsers as unknown as IconName,
      label: 'shop.admin.employee.title',
    },
    {
      routerLink: 'orders',
      icon: faBoxOpen as unknown as IconName,
      label: 'shop.admin.orders.title',
    },
  ];

  faChevronDown = faChevronDown;
  openStates: Record<string, boolean> = {};

  constructor() {
    this.navbarData.forEach((item) => {
      this.openStates[item.routerLink] = false;
    });
  }

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  handleChildOptions(item: NavItem) {
    this.openStates[item.routerLink] = !this.openStates[item.routerLink];
  }
}
