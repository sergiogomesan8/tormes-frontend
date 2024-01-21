import { AuthInterceptor } from './auth.interceptor';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import { AuthenticationService } from '@core/services/authentication.service';

describe('AuthInterceptor', () => {
  const mockJwtDecode = jest.fn();

  let interceptor: AuthInterceptor;
  let authServiceMock: jest.Mocked<AuthenticationService>;
  let httpHandlerMock: jest.Mocked<HttpHandler>;
  let httpRequestMock: jest.Mocked<HttpRequest<any>>;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
      isRefreshingToken: false,
      refreshToken: jest.fn(),
    } as any;

    httpRequestMock = {
      clone: jest.fn(),
    } as any;

    httpHandlerMock = {
      handle: jest.fn(),
    } as any;

    jest.spyOn(jwtDecode, 'jwtDecode').mockImplementation(() => ({
      exp: Date.now() / 1000 + 60,
    }));

    interceptor = new AuthInterceptor(authServiceMock);
  });

  it('should handle request without token', () => {
    authServiceMock.getToken.mockReturnValue('');

    interceptor.intercept(httpRequestMock, httpHandlerMock);

    expect(httpHandlerMock.handle).toHaveBeenCalledWith(httpRequestMock);
  });

  it('should add token to request if token is not expired', () => {
    const token = 'token';
    authServiceMock.getToken.mockReturnValue(token);

    mockJwtDecode.mockImplementation(() => ({
      exp: Date.now() / 1000 + 60,
    }));

    interceptor.intercept(httpRequestMock, httpHandlerMock);

    expect(httpRequestMock.clone).toHaveBeenCalledWith({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  });

  it('should handle request when isRefreshingToken is true', () => {
    authServiceMock.isRefreshingToken = true;

    interceptor.intercept(httpRequestMock, httpHandlerMock);

    expect(httpHandlerMock.handle).toHaveBeenCalledWith(httpRequestMock);
  });
});
