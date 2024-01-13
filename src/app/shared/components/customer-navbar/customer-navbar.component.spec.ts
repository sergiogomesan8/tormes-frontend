/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerNavbarComponent } from './customer-navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerNavbarComponent', () => {
  let component: CustomerNavbarComponent;
  let fixture: ComponentFixture<CustomerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerNavbarComponent],
      imports: [MatMenuModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have undefined customer initially', () => {
    expect(component.customer).toBeUndefined();
  });

  it('should open menu when someMethod is called', () => {
    jest.spyOn(component.trigger, 'openMenu');
    component.someMethod();
    expect(component.trigger.openMenu).toHaveBeenCalled();
  });

  it('should have a defined trigger', () => {
    expect(component.trigger).toBeDefined();
  });

  it('should emit logoutButtonClick event when logout is called', () => {
    const spy = jest.spyOn(component.logoutButtonClick, 'emit');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit addButtonClick event when clicked and not disabled', () => {
    component.shoppingCartButtonClick.emit = jest.fn();
    component.shoppingCart();
    expect(component.shoppingCartButtonClick.emit).toHaveBeenCalled();
  });
});
