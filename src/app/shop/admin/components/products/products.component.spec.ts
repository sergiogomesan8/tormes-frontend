/* tslint:disable:no-unused-variable */
import { ProductsComponent } from './products.component';
import { ProductService } from '@shop/services/product.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from '@shop/models/product';

describe('ProductsInfoComponent', () => {
  let component: ProductsComponent;
  let mockProductService: jest.Mocked<ProductService>;
  let mockRouter: jest.Mocked<Router>;

  const product: Product = {
    id: 'id',
    name: 'test',
    section: 'test',
    price: 10,
    description: 'test',
    image: 'test',
  };
  const products = [product];

  beforeEach(() => {
    mockProductService = {
      findAllProducts: jest.fn().mockReturnValue(of(products)),
      deleteProduct: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    component = new ProductsComponent(mockProductService, mockRouter);
  });

  describe('ngOnInit', () => {
    it('should call findAllProducts on ngOnInit', () => {
      component.ngOnInit();
      expect(mockProductService.findAllProducts).toHaveBeenCalled();
    });
  });

  describe('findAllProducts', () => {
    it('should find all products', () => {
      component.findAllProducts();

      expect(mockProductService.findAllProducts).toHaveBeenCalled();
      expect(component.products).toEqual(products);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      mockProductService.findAllProducts.mockReturnValue(
        throwError(() => error)
      );

      component.findAllProducts();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product and refresh the list', () => {
      const findAllProductsSpy = jest.spyOn(component, 'findAllProducts');
      mockProductService.deleteProduct.mockReturnValue(of(undefined));

      component.deleteProduct(product);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(product);
      expect(findAllProductsSpy).toHaveBeenCalled();
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');
      const product: Product = {
        id: 'id',
        name: 'test',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      };

      mockProductService.deleteProduct.mockReturnValue(throwError(() => error));

      component.deleteProduct(product);

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('updateProduct', () => {
    it('should navigate to update product page', () => {
      component.updateProduct(product);

      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/admin/products/update-product',
        product.id,
      ]);
    });
  });
});
