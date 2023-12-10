/* tslint:disable:no-unused-variable */

import { of, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './http-service.service';
import { AuthEndPoint } from '@shared/end-points';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { AuthUser } from '@core/models/auth.user';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpService: jest.Mocked<HttpService>;
  let snackBar: jest.Mocked<MatSnackBar>;
  let translateService: jest.Mocked<TranslateService>;
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
    snackBar = { open: jest.fn() } as any;
    translateService = { get: jest.fn() } as any;
    authEndPoint = new AuthEndPoint();

    service = new AuthenticationService(
      httpService,
      snackBar,
      translateService
    );
  });

  describe('signin', () => {
    it('should call httpService.post and show success snackbar on successful signin', () => {
      httpService.post.mockReturnValue(of(authUser));
      translateService.get.mockReturnValue(of('Success message'));

      service.signin(createUserDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        authEndPoint.REGISTER,
        createUserDto
      );
      expect(translateService.get).toHaveBeenCalledWith(
        'shop.customer.register.success'
      );
      expect(snackBar.open).toHaveBeenCalledWith(
        'Success message',
        'Success',
        expect.any(Object)
      );
    });

    it('should call httpService.post and show error snackbar on failed signin', () => {
      httpService.post.mockReturnValue(throwError(() => new Error('Error')));
      translateService.get.mockReturnValue(of('Error message'));

      service.signin(createUserDto).subscribe(
        () => {},
        () => {
          expect(httpService.post).toHaveBeenCalledWith(
            authEndPoint.REGISTER,
            createUserDto
          );
          expect(translateService.get).toHaveBeenCalledWith(
            'shop.customer.register.error'
          );
          expect(snackBar.open).toHaveBeenCalledWith(
            'Error message',
            'Error',
            expect.any(Object)
          );
        }
      );
    });
  });

  describe('login', () => {
    it('should call httpService.post on successful signin', () => {
      httpService.post.mockReturnValue(of(authUser));
      translateService.get.mockReturnValue(of('Success message'));

      service.login(loginUserDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        authEndPoint.LOGIN,
        loginUserDto
      );
    });

    it('should call httpService.post and show error snackbar on failed signin', () => {
      httpService.post.mockReturnValue(throwError(() => new Error('Error')));
      translateService.get.mockReturnValue(of('Error message'));

      service.login(loginUserDto).subscribe(
        () => {},
        () => {
          expect(httpService.post).toHaveBeenCalledWith(
            authEndPoint.LOGIN,
            loginUserDto
          );
          expect(translateService.get).toHaveBeenCalledWith(
            'shop.customer.login.error'
          );
          expect(snackBar.open).toHaveBeenCalledWith(
            'Error message',
            'Error',
            expect.any(Object)
          );
        }
      );
    });
  });
});
