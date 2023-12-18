import { Injectable } from '@angular/core';
import { CreateUserDto, LoginUserDto } from '@shop/customer/dtos/user.dto';
import { HttpService } from './http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, of, map } from 'rxjs';
import { AuthEndPoint } from '@shared/end-points';
import { AuthUser } from '@core/models/auth.user';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authEndPoint = new AuthEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  signin(createUserDto: CreateUserDto): Observable<AuthUser> {
    return this.httpService
      .post(this.authEndPoint.REGISTER, createUserDto)
      .pipe(
        map((response: AuthUser) => {
          this.translateService
            .get('shop.customer.register.success')
            .subscribe((res: string) => {
              this.showSuccessSnackbar(res);
            });
          return response;
        }),
        catchError((error: undefined) => {
          this.translateService
            .get('shop.customer.register.error')
            .subscribe((res: string) => {
              this.showErrorSnackbar(res);
            });
          return of({} as AuthUser);
        })
      );
  }

  login(loginUserDto: LoginUserDto): Observable<AuthUser | undefined> {
    return this.httpService.post(this.authEndPoint.LOGIN, loginUserDto).pipe(
      catchError((error: undefined) => {
        this.translateService
          .get('shop.customer.login.error')
          .subscribe((res: string) => {
            this.showErrorSnackbar(res);
          });
        return of({} as AuthUser);
      })
    );
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Success', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
    });
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Error', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['red-snackbar'],
    });
  }
}
