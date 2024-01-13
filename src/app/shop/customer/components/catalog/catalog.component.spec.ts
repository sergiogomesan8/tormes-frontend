/* tslint:disable:no-unused-variable */
import { of, throwError } from 'rxjs';
import { CatalogComponent } from './catalog.component';
import { ProductService } from '@shop/services/product.service';
import { Product } from '@shop/models/product';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let productService: ProductService;

  beforeEach(() => {
    productService = { findAllProducts: jest.fn() } as any;
    component = new CatalogComponent('browser', productService);
  });

  const products: Product[] = [
    {
      id: 'D000000001',
      image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      name: 'Salchichón ibérico de bellota',
      price: 12.99,
      section: 'Fiambres',
      description: 'Salchichón ibérico de bellota',
    },
    {
      id: 'A000000002',
      image: '../assets/images/chorizo-iberico-de-bellota.jpg',
      name: 'Chorizo ibérico de bellota',
      price: 8.99,
      section: 'Embutidos',
      description: 'Chorizo ibérico de bellota',
    },
  ];

  describe('ngOnInit', () => {
    it('should call findAllProducts on init', () => {
      jest
        .spyOn(productService, 'findAllProducts')
        .mockReturnValue(of(products));

      component.ngOnInit();
      component.findAllProducts();

      expect(productService.findAllProducts).toHaveBeenCalled();
      expect(component.products).toEqual(products);
    });

    it('should handle error on findAllProducts', () => {
      jest
        .spyOn(productService, 'findAllProducts')
        .mockReturnValue(throwError(() => new Error('Error')));

      component.findAllProducts();

      expect(productService.findAllProducts).toHaveBeenCalled();
    });
  });

  describe('onResize', () => {
    it('should set carouselWidth on resize', () => {
      component.onResize();

      expect(component.carouselWidth).toEqual(
        window.innerWidth <= 576 ? '244px' : '520px'
      );
    });
  });
});
