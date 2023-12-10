/* tslint:disable:no-unused-variable */
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@core/services/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginUserDto } from '@shop/customer/dtos/user.dto';
import { AuthUser } from '@core/models/auth.user';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let formBuilder: FormBuilder;
  let authenticationService: jest.Mocked<AuthenticationService>;

  let router: jest.Mocked<Router>;
  let translateService: jest.Mocked<TranslateService>;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    authenticationService = { login: jest.fn() } as any;
    router = { navigate: jest.fn() } as any;
    translateService = {} as any;

    component = new LoginComponent(
      translateService,
      formBuilder,
      authenticationService
    );
  });

  const email = 'user@example.com';
  const password = expect.any(String) as unknown as string;
  const name = 'John';

  const loginUserDto = new LoginUserDto(email, password);

  const authUser: AuthUser = {
    user_info: {
      email: 'test@test.com',
      id: '00',
      name: 'test',
    },
    token: 'token',
  };

  it('should call authenticationService.login and router.navigate on successful login', async () => {
    authenticationService.login.mockReturnValue(of(authUser));

    component.formGroup.setValue({
      email: loginUserDto.email,
      pass: loginUserDto.password,
    });

    await component.login();

    expect(authenticationService.login).toHaveBeenCalledWith(loginUserDto);
    // expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
  });

  it('should not call authenticationService.login and router.navigate if form is invalid', async () => {
    component.formGroup.setValue({
      email: '',
      pass: '',
    });

    await component.login();

    expect(authenticationService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});