import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-service.service';
import { OrderEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import { Order } from '@shop/models/order';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderEndPoint = new OrderEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private readonly snackbarService: SnackbarService
  ) {}

  findProductById(orderId: string): Observable<Order | undefined> {
    return this.httpService
      .get(`${this.orderEndPoint.FIND_BY_ID}${orderId}`)
      .pipe(
        map((response: undefined) => {
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.dashboard.options.orders.getByIdError'
          );
          return of(error);
        })
      );
  }

  findAllOrders(): Observable<Order[]> {
    return this.httpService.get(this.orderEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }

  deleteProduct(order: Order): Observable<undefined> {
    return this.httpService
      .delete(`${this.orderEndPoint.DELETE}${order.id}`, order)
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.dashboard.options.orders.deleteSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.dashboard.options.orders.deleteError'
          );
          return of(error);
        })
      );
  }
}
