import { Injectable } from '@angular/core';
import { CreateUserDto } from '@shop/customer/dtos/user.dto';
import { HttpService } from './http-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, of } from 'rxjs';
import { HttpError } from '@core/models/error.model';
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

  signin(createUserDto: CreateUserDto): Observable<AuthUser | undefined> {
    return this.httpService
      .post(this.authEndPoint.REGISTER, createUserDto)
      .pipe(
        tap((response: AuthUser) => {
          this.translateService
            .get('shop.customer.register.success')
            .subscribe((res: string) => {
              this.showSuccessSnackbar(res);
            });
        }),
        catchError((error: undefined) => {
          this.translateService
            .get('shop.customer.register.error')
            .subscribe((res: string) => {
              this.showErrorSnackbar(res);
            });
          return of(error);
        })
      );
  }

  private showSuccessSnackbar(message: string): void {
    this.snackBar.open(message, 'Success', { duration: 2000 });
  }

  private showErrorSnackbar(message: string): void {
    this.snackBar.open(message, 'Error', { duration: 2000 });
  }
}
