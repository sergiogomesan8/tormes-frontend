import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-service.service';
import { ProductEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@shop/admin/dtos/product.dto';
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

  findProductById(productId: string): Observable<Product | undefined> {
    return this.httpService
      .get(`${this.productEndPoint.FIND_BY_ID}${productId}`)
      .pipe(
        map((response: undefined) => {
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

  findAllProducts(): Observable<Product[]> {
    return this.httpService.get(this.productEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }

  createProduct(
    createProductDto: CreateProductDto
  ): Observable<Product | undefined> {
    const formData: FormData = new FormData();
    formData.append('name', createProductDto.name);
    formData.append('description', createProductDto.description);
    formData.append('image', createProductDto.image);
    formData.append('price', createProductDto.price.toString());
    formData.append('section', createProductDto.section);

    return this.httpService.post(this.productEndPoint.ADD, formData).pipe(
      map((response: Product) => {
        this.snackbarService.showSuccessSnackbar(
          'shop.admin.dashboard.options.products.addSuccess'
        );
        return response;
      }),
      catchError((error: undefined) => {
        this.snackbarService.showErrorSnackbar(
          'shop.admin.dashboard.options.products.addError'
        );
        return of(error);
      })
    );
  }

  updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto
  ): Observable<Product | undefined> {
    const formData: FormData = new FormData();

    if (updateProductDto.name) {
      formData.append('name', updateProductDto.name);
    }
    if (updateProductDto.description) {
      formData.append('description', updateProductDto.description);
    }
    if (updateProductDto.image) {
      formData.append('image', updateProductDto.image);
    }
    if (updateProductDto.price) {
      formData.append('price', updateProductDto.price.toString());
    }
    if (updateProductDto.section) {
      formData.append('section', updateProductDto.section);
    }

    return this.httpService
      .patch(`${this.productEndPoint.UPDATE}${productId}`, formData)
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

  deleteProduct(product: Product): Observable<undefined> {
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
}
