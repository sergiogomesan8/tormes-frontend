/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';

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
  let fixture: ComponentFixture<SidebarComponent>;
  let mockEventEmitter: any;

  const mockNavbarData = [
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

  beforeEach(() => {
    component = new SidebarComponent();
    component.navData = mockNavbarData;
    component.toggleSidebar = new EventEmitter<boolean>();
    jest.spyOn(component.toggleSidebar, 'emit'); // Spy on component.toggleSidebar.emit
  });

  it('should toggle sidebar', () => {
    component.isExpanded = false;
    component.handleSidebarToggle();
    expect(component.toggleSidebar.emit).toHaveBeenCalledWith(true); // This should now work
  });

  it('should initialize navData correctly', () => {
    expect(component.navData).toEqual(mockNavbarData);
  });
});
