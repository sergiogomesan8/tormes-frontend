/* tslint:disable:no-unused-variable */
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@shop/services/product.service';
import { CreateProductComponent } from './create-product.component';
import { of, throwError } from 'rxjs';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let mockProductService: jest.Mocked<ProductService>;
  let mockRouter: jest.Mocked<Router>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    mockProductService = {
      addProduct: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    formBuilder = new FormBuilder();

    component = new CreateProductComponent(
      mockProductService,
      formBuilder,
      mockRouter
    );
  });

  describe('addProduct', () => {
    it('should add product and navigate on success', () => {
      component.formGroup = formBuilder.group({
        name: ['test', [Validators.required]],
        section: ['test', [Validators.required]],
        price: [
          '10',
          [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
        ],
        description: ['test', [Validators.required]],
        image: ['test', [Validators.required]],
      });

      const productDto = {
        name: 'test',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      };

      mockProductService.addProduct.mockReturnValue(of(undefined));

      component.addProduct();

      expect(mockProductService.addProduct).toHaveBeenCalledWith(productDto);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/products']);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      component.formGroup = formBuilder.group({
        name: ['test', [Validators.required]],
        section: ['test', [Validators.required]],
        price: [
          '10',
          [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
        ],
        description: ['test', [Validators.required]],
        image: ['test', [Validators.required]],
      });

      mockProductService.addProduct.mockReturnValue(throwError(() => error));

      component.addProduct();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    it('should not add product if form is invalid', () => {
      component.formGroup = formBuilder.group({
        name: ['', [Validators.required]],
        section: ['test', [Validators.required]],
        price: [
          '10',
          [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
        ],
        description: ['test', [Validators.required]],
        image: ['test', [Validators.required]],
      });

      component.addProduct();

      expect(mockProductService.addProduct).not.toHaveBeenCalled();
    });
  });

  describe('handleFile', () => {
    it('should set image path on file handle', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      component.handleFile(file);
      expect(component.formGroup.get('image')?.value).toBe('/image/test.png');
    });
  });
});
