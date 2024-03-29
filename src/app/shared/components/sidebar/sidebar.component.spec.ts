/* tslint:disable:no-unused-variable */
import { EventEmitter } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import {
  faBoxOpen,
  faCashRegister,
  faHome,
  faStore,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

describe('SidebarComponent', () => {
  let component: SidebarComponent;

  const mockNavbarData = [
    {
      routerLink: '',
      icon: faHome as unknown as IconName,
      label: 'shop.admin.dashboard.title',
      childOptions: [
        {
          routerLink: 'products',
          label: 'shop.admin.dashboard.products',
        },
        {
          routerLink: 'sections',
          label: 'shop.admin.dashboard.sections',
        },
      ],
    },
    {
      routerLink: 'catalog',
      icon: faStore as unknown as IconName,
      label: 'shop.admin.dashboard.catalog',
    },
    {
      routerLink: 'cash-registers',
      icon: faCashRegister as unknown as IconName,
      label: 'shop.admin.dashboard.cashRegister',
    },
    {
      routerLink: 'orders',
      icon: faBoxOpen as unknown as IconName,
      label: 'shop.admin.dashboard.orders',
    },
  ];

  beforeEach(() => {
    component = new SidebarComponent();
    component.navbarData = mockNavbarData;
    component.toggleSidebar = new EventEmitter<boolean>();
    jest.spyOn(component.toggleSidebar, 'emit'); // Spy on component.toggleSidebar.emit
  });

  it('should toggle sidebar', () => {
    component.isExpanded = false;
    component.handleSidebarToggle();
    expect(component.toggleSidebar.emit).toHaveBeenCalledWith(true); // This should now work
  });

  it('should initialize navData correctly', () => {
    expect(component.navbarData).toEqual(mockNavbarData);
  });

  it('should initialize openStates correctly', () => {
    const expectedOpenStates = mockNavbarData.reduce<Record<string, boolean>>(
      (acc, item) => {
        acc[item.routerLink] = false;
        return acc;
      },
      {}
    );
    expect(component.openStates).toEqual(expectedOpenStates);
  });

  it('should toggle openStates correctly', () => {
    const testItem = mockNavbarData[0];
    component.handleChildOptions(testItem);
    expect(component.openStates[testItem.routerLink]).toBe(true);
  });
});
