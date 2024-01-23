/* tslint:disable:no-unused-variable */
import { of, throwError } from 'rxjs';
import { CatalogComponent } from './catalog.component';
import { ProductService } from '@shop/services/product.service';
import { Product } from '@shop/models/product';
import { Section } from '@shop/models/section';
import { SectionService } from '@shop/services/section.service';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let productService: ProductService;
  let sectionService: SectionService;

  beforeEach(() => {
    productService = { findAllProducts: jest.fn() } as any;
    sectionService = { findAllSections: jest.fn() } as any;
    component = new CatalogComponent('browser', productService, sectionService);
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

  const sections: Section[] = [
    {
      id: 'D000000001',
      image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      name: 'Salchichón ibérico de bellota',
    },
    {
      id: 'A000000002',
      image: '../assets/images/chorizo-iberico-de-bellota.jpg',
      name: 'Chorizo ibérico de bellota',
    },
  ];

  describe('ngOnInit', () => {
    it('should call findAllProducts on init', () => {
      jest
        .spyOn(productService, 'findAllProducts')
        .mockReturnValue(of(products));

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

    it('should call findAllSections on init', () => {
      jest
        .spyOn(sectionService, 'findAllSections')
        .mockReturnValue(of(sections));

      component.findAllSections();

      expect(sectionService.findAllSections).toHaveBeenCalled();
      expect(component.sections).toEqual(sections);
    });

    it('should handle error on findAllSections', () => {
      jest
        .spyOn(sectionService, 'findAllSections')
        .mockReturnValue(throwError(() => new Error('Error')));

      component.findAllSections();

      expect(sectionService.findAllSections).toHaveBeenCalled();
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
