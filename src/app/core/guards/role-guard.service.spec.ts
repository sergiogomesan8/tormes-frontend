import { UserType } from '@shop/models/user.model';
import { RoleGuardService } from './role-guard.service';

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

    const mockToken = 'mockToken';
    const mockDecodedToken = { payload: { userType: UserType.manager } };
    authServiceMock.getToken.mockReturnValue(mockToken);

    service['getUserRoleFromToken'] = jest
      .fn()
      .mockReturnValue(mockDecodedToken.payload.userType);

    expect(service.canActivate(routeMock, {} as any)).toBe(true);
  });

  it('should redirect to home if user role does not match expected roles', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager, UserType.employee] },
    };

    const mockToken = 'mockToken';
    const mockDecodedToken = { payload: { userType: UserType.customer } };
    authServiceMock.getToken.mockReturnValue(mockToken);

    service['getUserRoleFromToken'] = jest
      .fn()
      .mockReturnValue(mockDecodedToken.payload.userType);

    expect(service.canActivate(routeMock, {} as any)).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return false if user role is undefined', () => {
    const routeMock: any = {
      data: { roles: [UserType.manager] },
    };

    const mockToken = 'mockToken';
    const mockDecodedToken = { payload: { userType: undefined } };
    authServiceMock.getToken.mockReturnValue(mockToken);

    service['getUserRoleFromToken'] = jest
      .fn()
      .mockReturnValue(mockDecodedToken.payload.userType);

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
