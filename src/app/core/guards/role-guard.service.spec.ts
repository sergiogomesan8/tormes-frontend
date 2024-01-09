import { UserType } from '@shop/models/user.model';
import { RoleGuardService } from './role-guard.service';
import * as jwt from 'jsonwebtoken';

describe('RoleGuardService', () => {
  let service: RoleGuardService;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    service = new RoleGuardService(authServiceMock, routerMock);
  });

  it('should return true if user role matches expected roles', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager, UserType.employee] },
    };
    const mockToken = jwt.sign({ userType: UserType.manager }, 'secret');
    authServiceMock.getToken.mockReturnValue(mockToken);

    expect(service.canActivate(routeMock, {} as any)).toBe(true);
  });

  it('should redirect to home if user role does not match expected roles', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager, UserType.employee] },
    };
    const mockToken = jwt.sign({ userType: UserType.customer }, 'secret');
    authServiceMock.getToken.mockReturnValue(mockToken);

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false if user role is undefined', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager] },
    };

    const mockToken = jwt.sign({ userType: undefined }, 'secret');
    authServiceMock.getToken.mockReturnValue(mockToken);

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
  });

  it('should redirect to login if token is invalid', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager, UserType.employee] },
    };
    authServiceMock.getToken.mockReturnValue(null);

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
