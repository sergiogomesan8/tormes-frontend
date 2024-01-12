/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartButton } from './cart-button.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartButton;
  let fixture: ComponentFixture<ShoppingCartButton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartButton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteButtonClick event when clicked and not disabled', () => {
    component.openCartClick.emit = jest.fn();
    component.openCart();
    expect(component.openCartClick.emit).toHaveBeenCalled();
  });
});
