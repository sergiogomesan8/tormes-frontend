import { Injectable } from '@angular/core';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { HttpService } from './http-service.service';
import { Observable, catchError, of, map } from 'rxjs';
import { AuthEndPoint } from '@shared/end-points';
import { AuthUser } from '@core/models/auth.user';
import { SnackbarService } from '@shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authEndPoint = new AuthEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private readonly snackbarService: SnackbarService
  ) {}

  signin(createUserDto: CreateUserDto): Observable<AuthUser> {
    return this.httpService
      .post(this.authEndPoint.REGISTER, createUserDto)
      .pipe(
        map((response: AuthUser) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.customer.register.success'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.customer.register.error'
          );
          return of({} as AuthUser);
        })
      );
  }

  login(loginUserDto: LoginUserDto): Observable<AuthUser | undefined> {
    return this.httpService.post(this.authEndPoint.LOGIN, loginUserDto).pipe(
      catchError((error: undefined) => {
        this.snackbarService.showErrorSnackbar('shop.customer.login.error');
        return of({} as AuthUser);
      })
    );
  }
}
