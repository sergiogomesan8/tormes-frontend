import { Injectable } from '@angular/core';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { HttpService } from './http-service.service';
import { Observable, catchError, of, map } from 'rxjs';
import { AuthEndPoint } from '@shared/end-points';
import { AuthUser } from '@core/models/auth.user';
import { SnackbarService } from '@shared/services/snackbar.service';
import { User } from '@shop/models/user.model';
import { LocalStorageService } from '@shared/services/localStorage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authEndPoint = new AuthEndPoint();
  isRefreshingToken = false;

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
        console.log('login response!!: ', response);
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
    this.localStorageService.removeItem('user_info');
    this.localStorageService.removeItem('access_token');
    this.localStorageService.removeItem('refresh_token');
  }

  refreshToken(): Observable<AuthUser> {
    if (this.isRefreshingToken) {
      return of({} as AuthUser);
    }
    this.isRefreshingToken = true;
    console.log('refresh token');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getRefreshToken()
    );
    return this.httpService
      .post(this.authEndPoint.REFRESH_TOKEN, {}, undefined, headers)
      .pipe(
        map((response: AuthUser) => {
          console.log('refresh token response: ', response);
          this.setAuthUser(response);
          this.isRefreshingToken = false;
          return response;
        }),
        catchError((error: undefined) => {
          console.log('error: ', error);

          return of({} as AuthUser);
        })
      );
  }

  setAuthUser(authUser: AuthUser) {
    this.localStorageService.setItem(
      'user_info',
      JSON.stringify(authUser.user_info)
    );
    this.localStorageService.setItem('access_token', authUser.access_token);
    this.localStorageService.setItem('refresh_token', authUser.refresh_token);
  }

  getUserInfo(): User | undefined {
    const userInfo = this.localStorageService.getItem('user_info');
    return userInfo ? (JSON.parse(userInfo) as User) : undefined;
  }

  getToken(): string {
    return this.localStorageService.getItem('access_token') ?? '';
  }

  getRefreshToken(): string {
    return this.localStorageService.getItem('refresh_token') ?? '';
  }
}
