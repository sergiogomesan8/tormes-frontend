import { UserType } from '@shop/models/user.model';
import { RoleGuardService } from './role-guard.service';

describe('RoleGuardService', () => {
  let service: RoleGuardService;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      getUserInfo: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    service = new RoleGuardService(authServiceMock, routerMock);
  });

  it('should allow access if user role matches expected roles', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager, UserType.employee] },
    };
    authServiceMock.getUserInfo.mockReturnValue({ userType: UserType.manager });

    expect(service.canActivate(routeMock, {} as any)).toBe(true);
  });

  it('should redirect to home if user role does not match expected roles', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager] },
    };
    authServiceMock.getUserInfo.mockReturnValue({
      userType: UserType.customer,
    });

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false if user role is undefined', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager] },
    };
    authServiceMock.getUserInfo.mockReturnValue({
      userType: undefined,
    });

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
  });

  it('should return false if user info is not available', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager] },
    };
    authServiceMock.getUserInfo.mockReturnValue(null);

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
