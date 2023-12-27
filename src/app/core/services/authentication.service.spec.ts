/* tslint:disable:no-unused-variable */

import { of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './http-service.service';
import { AuthEndPoint } from '@shared/end-points';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { AuthUser } from '@core/models/auth.user';
import { SnackbarService } from '@shared/services/snackbar.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpService: jest.Mocked<HttpService>;
  let snackbarService: jest.Mocked<SnackbarService>;

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

  beforeEach(() => {
    httpService = { post: jest.fn() } as any;
    snackbarService = {
      showSuccessSnackbar: jest.fn(),
      showErrorSnackbar: jest.fn(),
    } as any;
    authEndPoint = new AuthEndPoint();

    service = new AuthenticationService(httpService, snackbarService);
  });

  describe('signin', () => {
    it('should call httpService.post and show success snackbar on successful signin', () => {
      httpService.post.mockReturnValue(of(authUser));

      service.signin(createUserDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        authEndPoint.REGISTER,
        createUserDto
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
    it('should call httpService.post on successful signin', () => {
      httpService.post.mockReturnValue(of(authUser));

      service.login(loginUserDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        authEndPoint.LOGIN,
        loginUserDto
      );
    });

    it('should call httpService.post and show error snackbar on failed signin', () => {
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
});
