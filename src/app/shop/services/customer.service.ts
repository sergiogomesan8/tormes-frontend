import { Injectable } from '@angular/core';
import { CreateUserDto } from '../customer/dtos/user.dto';
import { User } from '../models/user.model';
import { HttpService } from '@core/services/http-service.service';
import { Observable, catchError, tap, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpError } from '@core/models/error.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private readonly httpService: HttpService,
    private snackBar: MatSnackBar
  ) {}

  signin(createUserDto: CreateUserDto): Observable<User | undefined> {
    return this.httpService.post('/users', createUserDto).pipe(
      tap((response: User) => {
        // this.showSuccessSnackbar('Usuario creado correctamente');
      }),
      catchError((error: undefined) => {
        // this.showErrorSnackbar('Usuario no creado');
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
