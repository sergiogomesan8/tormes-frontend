/* tslint:disable:no-unused-variable */
import { CustomerComponent } from './customer.component';
import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@shop/models/user.model';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { of } from 'rxjs';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let authServiceMock: jest.Mocked<AuthenticationService>;
  let shoppingCartServiceMock: jest.Mocked<ShoppingCartService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      getUserInfo: jest.fn(),
      logout: jest.fn(),
    } as unknown as jest.Mocked<AuthenticationService>;

    shoppingCartServiceMock = {
      getShoppingCart: jest.fn(),
      shoppingCart$: of({
        shoppingCartProducts: [{ amount: 1 }, { amount: 2 }],
      }),
    } as unknown as jest.Mocked<ShoppingCartService>;

    routerMock = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as any;

    component = new CustomerComponent(
      authServiceMock,
      shoppingCartServiceMock,
      routerMock
    );
  });

  it('should set userInfo and isLoggedIn correctly on ngOnInit', () => {
    const user: User = {
      id: 'id',
      name: 'Test User',
      email: 'test@mail.com',
    };
    authServiceMock.getUserInfo.mockReturnValue(user);

    component.ngOnInit();

    expect(component.userInfo).toEqual(user);
    expect(component.isLoggedIn).toBe(true);
  });

  it('should call logout on AuthenticationService and navigate to /catalog on logout', async () => {
    await component.logout();

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/catalog']);
  });

  it('should toggle sidebarExpanded on handleShoppingCart', () => {
    component.handleShoppingCart();
    expect(component.sidebarExpanded).toBe(true);

    component.handleShoppingCart();
    expect(component.sidebarExpanded).toBe(false);
  });

  it('should return total amount of shopping cart items', () => {
    const totalItems = component.shoppingCartItems;

    expect(totalItems).toBe(3);
  });
});
