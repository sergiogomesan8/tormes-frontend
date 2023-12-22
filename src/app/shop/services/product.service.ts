import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@core/services/http-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import { Product } from '@shop/models/product';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productEndPoint = new ProductEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private readonly snackbarService: SnackbarService
  ) {}

  findAllProducts(): Observable<Product[]> {
    return this.httpService.get(this.productEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }

  delete(product: Product): Observable<undefined> {
    return this.httpService
      .delete(`${this.productEndPoint.DELETE}${product.id}`, product)
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.dashboard.options.products.deleteSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.dashboard.options.products.deleteError'
          );
          return of(error);
        })
      );
  }

  update(product: Product): Observable<Product | undefined> {
    return this.httpService
      .patch(`${this.productEndPoint.UPDATE}${product.id}`, product)
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.dashboard.options.products.updateSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.dashboard.options.products.updateError'
          );
          return of(error);
        })
      );
  }
}
