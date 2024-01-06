import { HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceMock: any;
  let httpHandlerMock: any;

  beforeEach(() => {
    authServiceMock = { getToken: jest.fn() };
    httpHandlerMock = { handle: jest.fn() };
    interceptor = new AuthInterceptor(authServiceMock);
  });

  it('should add Authorization header when token is available', () => {
    const request = new HttpRequest('GET', 'http://localhost');
    const token = 'test-token';
    authServiceMock.getToken.mockReturnValue(token);
    httpHandlerMock.handle.mockReturnValue(of(null));

    interceptor.intercept(request, httpHandlerMock);

    expect(httpHandlerMock.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          get: expect.any(Function),
          has: expect.any(Function),
        }),
      })
    );

    expect(
      httpHandlerMock.handle.mock.calls[0][0].headers.get('Authorization')
    ).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header when token is not available', () => {
    const request = new HttpRequest('GET', 'http://localhost');
    authServiceMock.getToken.mockReturnValue(null);
    httpHandlerMock.handle.mockReturnValue(of(null));

    interceptor.intercept(request, httpHandlerMock);

    expect(httpHandlerMock.handle).toHaveBeenCalledWith(request);
  });
});
