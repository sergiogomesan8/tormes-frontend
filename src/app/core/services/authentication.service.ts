import { Injectable } from '@angular/core';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { HttpService } from './http-service.service';
import { Observable, catchError, of, map } from 'rxjs';
import { AuthEndPoint } from '@shared/end-points';
import { AuthUser } from '@core/models/auth.user';
import { SnackbarService } from '@shared/services/snackbar.service';
import { User } from '@shop/models/user.model';
import { LocalStorageService } from '@shared/services/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authEndPoint = new AuthEndPoint();
  private user: User | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly snackbarService: SnackbarService,
    private readonly localStorageService: LocalStorageService
  ) {}

  signin(createUserDto: CreateUserDto): Observable<AuthUser> {
    return this.httpService
      .post(this.authEndPoint.REGISTER, createUserDto)
      .pipe(
        map((response: AuthUser) => {
          this.setAuthUser(response);
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
      map((response: AuthUser) => {
        this.setAuthUser(response);
        return response;
      }),
      catchError((error: undefined) => {
        this.snackbarService.showErrorSnackbar('shop.customer.login.error');
        return of({} as AuthUser);
      })
    );
  }

  logout() {
    this.user = undefined;
    this.localStorageService.removeItem('accessToken');
  }

  refreshToken(): Observable<AuthUser> {
    return this.httpService.post(this.authEndPoint.REFRESH_TOKEN, {}).pipe(
      map((response: AuthUser) => {
        this.setAuthUser(response);
        return response;
      }),
      catchError((error: undefined) => {
        return of({} as AuthUser);
      })
    );
  }

  setAuthUser(authUser: AuthUser) {
    this.user = authUser.user_info;
    this.localStorageService.setItem('accessToken', authUser.token);
  }

  getUserInfo(): User | undefined {
    return this.user ?? undefined;
  }

  getToken(): string {
    return this.localStorageService.getItem('accessToken') ?? '';
  }
}
