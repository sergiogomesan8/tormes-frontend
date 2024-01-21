/* tslint:disable:no-unused-variable */
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { CreateUserDto } from '@shop/customer/dtos/user.dto';
import { AuthUser } from '@core/models/auth.user';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let formBuilder: FormBuilder;
  let authenticationService: jest.Mocked<AuthenticationService>;

  let router: jest.Mocked<Router>;
  let translateService: jest.Mocked<TranslateService>;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    authenticationService = { signin: jest.fn() } as any;
    router = { navigate: jest.fn() } as any;
    translateService = {} as any;

    component = new RegisterComponent(
      translateService,
      formBuilder,
      authenticationService,
      router
    );
  });

  const email = 'user@example.com';
  const password = expect.any(String) as unknown as string;
  const name = 'John';

  const createUserDto = new CreateUserDto(name, email, password);

  const authUser: AuthUser = {
    user_info: {
      email: 'test@test.com',
      id: '00',
      name: 'test',
    },
    access_token: 'access_token',
    refresh_token: 'refresh_token',
  };

  it('should call authenticationService.signin and router.navigate on successful signin', async () => {
    authenticationService.signin.mockReturnValue(of(authUser));

    component.formGroup.setValue({
      name: createUserDto.name,
      email: createUserDto.email,
      pass: createUserDto.password,
      passConfirmation: createUserDto.password,
    });

    await component.signin();

    expect(authenticationService.signin).toHaveBeenCalledWith(createUserDto);
    expect(router.navigate).toHaveBeenCalledWith(['/catalog']);
  });

  it('should not call authenticationService.signin and router.navigate if form is invalid', async () => {
    component.formGroup.setValue({
      name: '',
      email: '',
      pass: '',
      passConfirmation: '',
    });

    await component.signin();

    expect(authenticationService.signin).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should handle error on signin', () => {
    component.formGroup.setValue({
      name: createUserDto.name,
      email: createUserDto.email,
      pass: createUserDto.password,
      passConfirmation: createUserDto.password,
    });

    jest
      .spyOn(authenticationService, 'signin')
      .mockReturnValue(throwError(() => new Error('Error')));

    component.signin();

    expect(authenticationService.signin).toHaveBeenCalled();
  });
});
