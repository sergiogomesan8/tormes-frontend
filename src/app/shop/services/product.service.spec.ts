/* tslint:disable:no-unused-variable */
import { ProductService } from './product.service';
import { HttpService } from '@core/services/http-service.service';
import { ProductEndPoint } from '@shared/end-points';
import { Product } from '@shop/models/product';
import { of, throwError } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpService: jest.Mocked<HttpService>;
  let productEndPoint: ProductEndPoint;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    } as any;
    productEndPoint = new ProductEndPoint();
    service = new ProductService(httpService);
  });

  const products: Product[] = [
    {
      id: 'D000000001',
      image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      name: 'Salchichón ibérico de bellota',
      price: 12.99,
      section: 'Fiambres',
    },
    {
      id: 'A000000002',
      image: '../assets/images/chorizo-iberico-de-bellota.jpg',
      name: 'Chorizo ibérico de bellota',
      price: 8.99,
      section: 'Embutidos',
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
});
