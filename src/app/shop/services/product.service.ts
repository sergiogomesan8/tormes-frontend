import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@core/services/http-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductEndPoint } from '@shared/end-points';
import { Product } from '@shop/models/product';
import { Observable, catchError, tap, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productEndPoint = new ProductEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) {}

  findAllProducts(): Observable<Product[]> {
    return this.httpService.get(this.productEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }
}
