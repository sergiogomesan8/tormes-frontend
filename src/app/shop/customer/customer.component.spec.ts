/* tslint:disable:no-unused-variable */
import { CustomerComponent } from './customer.component';
import { AuthenticationService } from '@core/services/authentication.service';
import { User } from '@shop/models/user.model';
import { Router } from '@angular/router';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let authServiceMock: jest.Mocked<AuthenticationService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      getUserInfo: jest.fn(),
      logout: jest.fn(),
    } as unknown as jest.Mocked<AuthenticationService>;

    routerMock = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    } as any;

    component = new CustomerComponent(authServiceMock, routerMock);
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
});
