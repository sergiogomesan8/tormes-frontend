/* tslint:disable:no-unused-variable */
import { ProductService } from './product.service';
import { HttpService } from '@core/services/http-service.service';
import { ProductEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import { CreateProductDto } from '@shop/admin/dtos/product.dto';
import { Product } from '@shop/models/product';
import { of, throwError } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpService: jest.Mocked<HttpService>;
  let snackbarService: jest.Mocked<SnackbarService>;

  let productEndPoint: ProductEndPoint;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as any;
    snackbarService = {
      showSuccessSnackbar: jest.fn(),
      showErrorSnackbar: jest.fn(),
    } as any;
    productEndPoint = new ProductEndPoint();
    productEndPoint = new ProductEndPoint();
    service = new ProductService(httpService, snackbarService);
  });

  const products: Product[] = [
    {
      id: 'D000000001',
      image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      name: 'Salchichón ibérico de bellota',
      price: 12.99,
      section: 'Fiambres',
      description: 'Salchichón ibérico de bellota de Guijuelo',
    },
    {
      id: 'A000000002',
      image: '../assets/images/chorizo-iberico-de-bellota.jpg',
      name: 'Chorizo ibérico de bellota',
      price: 8.99,
      section: 'Embutidos',
      description: 'Chorizo ibérico de bellota de Guijuelo',
    },
  ];

  const createProductDto: CreateProductDto = {
    name: 'Chorizo ibérico de bellota',
    price: 8.99,
    section: 'Embutidos',
    description: 'Chorizo ibérico de bellota de Guijuelo',
    image: 'image/url',
  };

  describe('findAllProducts', () => {
    it('should return an array of products if the http call is successful', () => {
      httpService.get.mockReturnValue(of(products));

      service.findAllProducts().subscribe((res) => {
        expect(res).toEqual(products);
      });
      expect(httpService.get).toHaveBeenCalled();
    });

    it('should return an empty array if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findAllProducts().subscribe((res) => {
        expect(res).toEqual([]);
      });

      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('findProductById', () => {
    it('should return a product if the http call is successful', () => {
      httpService.get.mockReturnValue(of(products[0]));

      service.findProductById(products[0].id).subscribe((res) => {
        expect(res).toEqual(products[0]);
      });
      expect(httpService.get).toHaveBeenCalledWith(
        productEndPoint.FIND_BY_ID + products[0].id
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findProductById(products[0].id).subscribe(
        () => {},
        () => {
          expect(httpService.get).toHaveBeenCalledWith(
            productEndPoint.FIND_BY_ID + products[0].id
          );

          expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.products.updateError'
          );
        }
      );
    });
  });

  describe('addProduct', () => {
    it('should return a product if the http call is successful', () => {
      httpService.post.mockReturnValue(of(products[0]));

      service.addProduct(createProductDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        productEndPoint.ADD,
        createProductDto
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.post.mockReturnValue(of(products[0]));

      service.addProduct(products[0]).subscribe(
        () => {},
        () => {
          expect(httpService.get).toHaveBeenCalledWith(
            productEndPoint.ADD,
            createProductDto
          );

          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.products.addError'
          );
        }
      );
    });
  });

  describe('updateProduct', () => {
    it('should return undefined if the http call is successful', () => {
      httpService.patch.mockReturnValue(of(undefined));

      service.updateProduct(products[0].id, products[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });
      expect(httpService.patch).toHaveBeenCalled();
    });

    it('should return undefined if the http call fails', () => {
      httpService.patch.mockReturnValue(throwError(() => new Error('Error')));

      service.updateProduct(products[0].id, products[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });

      expect(httpService.patch).toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should return undefined if the http call is successful', () => {
      httpService.delete.mockReturnValue(of(undefined));

      service.deleteProduct(products[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });
      expect(httpService.delete).toHaveBeenCalled();
    });

    it('should return undefined if the http call fails', () => {
      httpService.delete.mockReturnValue(throwError(() => new Error('Error')));

      service.deleteProduct(products[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });

      expect(httpService.delete).toHaveBeenCalled();
    });
  });
});
