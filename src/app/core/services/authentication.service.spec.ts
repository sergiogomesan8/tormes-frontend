/* tslint:disable:no-unused-variable */

import { of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { HttpService } from './http-service.service';
import { AuthEndPoint } from '@shared/end-points';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { AuthUser } from '@core/models/auth.user';
import { SnackbarService } from '@shared/services/snackbar.service';
import { LocalStorageService } from '@shared/services/localStorage.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpService: jest.Mocked<HttpService>;
  let snackbarService: jest.Mocked<SnackbarService>;
  let localStorageService: jest.Mocked<LocalStorageService>;

  let authEndPoint: AuthEndPoint;

  const email = 'user@example.com';
  const password = expect.any(String);
  const name = 'John';

  const createUserDto = new CreateUserDto(name, email, password);
  const loginUserDto = new LoginUserDto(email, password);

  const authUser: AuthUser = {
    user_info: {
      email: 'test@test.com',
      id: '00',
      name: 'test',
    },
    token: 'token',
  };

  const authUserResponse = of(authUser);

  beforeEach(() => {
    const storage: { [key: string]: string } = {};

    localStorageService = {
      getItem: jest.fn((key) => storage[key]),
      setItem: jest.fn((key, value) => {
        storage[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete storage[key];
      }),
    } as any;
    httpService = { post: jest.fn() } as any;
    snackbarService = {
      showSuccessSnackbar: jest.fn(),
      showErrorSnackbar: jest.fn(),
    } as any;
    authEndPoint = new AuthEndPoint();

    service = new AuthenticationService(
      httpService,
      snackbarService,
      localStorageService
    );
  });

  describe('signin', () => {
    it('should call httpService.post and show success snackbar on successful signin', () => {
      httpService.post.mockReturnValue(of(authUser));

      service.signin(createUserDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        authEndPoint.REGISTER,
        createUserDto
      );

      expect(localStorageService.setItem).toHaveBeenCalledWith(
        'accessToken',
        authUser.token
      );

      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.customer.register.success'
      );
    });

    it('should call httpService.post and show error snackbar on failed signin', () => {
      httpService.post.mockReturnValue(throwError(() => new Error('Error')));

      service.signin(createUserDto).subscribe(
        () => {},
        () => {
          expect(httpService.post).toHaveBeenCalledWith(
            authEndPoint.REGISTER,
            createUserDto
          );
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.customer.register.error'
          );
        }
      );
    });
  });

  describe('login', () => {
    it('should call httpService.post, setAuthUser on successful signin', () => {
      httpService.post.mockReturnValue(authUserResponse);

      service.login(loginUserDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        authEndPoint.LOGIN,
        loginUserDto
      );

      expect(localStorageService.setItem).toHaveBeenCalledWith(
        'accessToken',
        authUser.token
      );
    });

    it('should call httpService.post, showErrorSnackbar, and return empty AuthUser on failed signin', () => {
      httpService.post.mockReturnValue(throwError(() => new Error('Error')));

      service.login(loginUserDto).subscribe(
        () => {},
        () => {
          expect(httpService.post).toHaveBeenCalledWith(
            authEndPoint.LOGIN,
            loginUserDto
          );
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.customer.login.error'
          );
        }
      );
    });
  });

  describe('logout', () => {
    it('should remove user info and tokens from local storage', () => {
      service.setAuthUser(authUser);
      service.logout();

      expect(service.getUserInfo()).toBeUndefined();
      expect(localStorageService.getItem('accessToken')).toBeUndefined();
    });
  });

  describe('setAuthUser', () => {
    it('should set user info and tokens in local storage', () => {
      service.setAuthUser(authUser);

      expect(service.getUserInfo()).toEqual(authUser.user_info);
      expect(localStorageService.getItem('accessToken')).toEqual(
        authUser.token
      );
    });
  });

  describe('getUserInfo', () => {
    it('should return user info if it exists', () => {
      service.setAuthUser(authUser);

      expect(service.getUserInfo()).toEqual(authUser.user_info);
    });

    it('should return undefined if user info does not exist', () => {
      service.setAuthUser({} as AuthUser);

      expect(service.getUserInfo()).toBeUndefined();
    });
  });

  describe('getToken', () => {
    it('should return access token if it exists', () => {
      service.setAuthUser(authUser);

      expect(service.getToken()).toEqual(authUser.token);
    });

    it('should return empty string if access token does not exist', () => {
      localStorageService.removeItem('accessToken');

      const mockAuthUser: AuthUser = {
        user_info: { id: '', email: '', name: '' },
        token: '',
      };

      service.setAuthUser(mockAuthUser);

      expect(service.getToken()).toEqual('');
    });
  });
});
