/* tslint:disable:no-unused-variable */
import { ProductService } from './product.service';
import { HttpService } from '@core/services/http-service.service';
import { ProductEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from '@shop/admin/dtos/product.dto';
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

  describe('createProduct', () => {
    const createProductDto: CreateProductDto = {
      name: 'Chorizo ibérico de bellota',
      price: 8.99,
      section: 'Embutidos',
      description: 'Chorizo ibérico de bellota de Guijuelo',
      image: new Blob(['test'], { type: 'text/plain' }),
    };
    let formData: FormData;

    beforeEach(() => {
      formData = new FormData();
      formData.append('name', createProductDto.name);
      formData.append('description', createProductDto.description);
      formData.append('image', createProductDto.image);
      formData.append('price', createProductDto.price.toString());
      formData.append('section', createProductDto.section);
    });

    it('should return a product if the http call is successful', () => {
      httpService.post.mockReturnValue(of(products[0]));

      service.createProduct(createProductDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        productEndPoint.ADD,
        formData
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.products.addSuccess'
      );
    });

    it('should show error snackbar and return undefined if the http call fails', () => {
      const errorResponse = new Error('Error');
      httpService.post.mockReturnValue(throwError(errorResponse));

      service.createProduct(createProductDto).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.products.addError'
          );
        }
      );

      expect(httpService.post).toHaveBeenCalledWith(
        productEndPoint.ADD,
        formData
      );
    });
  });

  describe('updateProduct', () => {
    const updateProductDto: UpdateProductDto = {
      name: 'test',
      section: 'test',
      price: 10,
      description: 'test',
      image: new Blob(['test'], { type: 'text/plain' }),
    };

    let formData: FormData;

    beforeEach(() => {
      formData = new FormData();
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
    });
    it('should return undefined if the http call is successful', () => {
      httpService.patch.mockReturnValue(of(undefined));

      service
        .updateProduct(products[0].id, updateProductDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
        });
      expect(httpService.patch).toHaveBeenCalledWith(
        `${productEndPoint.UPDATE}${products[0].id}`,
        formData
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.products.updateSuccess'
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.patch.mockReturnValue(throwError(() => new Error('Error')));

      service
        .updateProduct(products[0].id, updateProductDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.products.updateError'
          );
        });

      expect(httpService.patch).toHaveBeenCalledWith(
        `${productEndPoint.UPDATE}${products[0].id}`,
        formData
      );
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
