import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-service.service';
import { ProductEndPoint } from '@shared/end-points';
import { Product } from '@shop/models/product';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productEndPoint = new ProductEndPoint();

  constructor(private readonly httpService: HttpService) {}

  findAllProducts(): Observable<Product[]> {
    return this.httpService.get(this.productEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }
}
