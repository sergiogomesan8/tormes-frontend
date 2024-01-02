/* tslint:disable:no-unused-variable */
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@shop/services/product.service';
import { CreateProductComponent } from './create-product.component';
import { of, throwError } from 'rxjs';
import { SnackbarService } from '@shared/services/snackbar.service';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let mockProductService: jest.Mocked<ProductService>;
  let mockRouter: jest.Mocked<Router>;
  let formBuilder: FormBuilder;
  let snackbarService: jest.Mocked<SnackbarService>;

  beforeEach(() => {
    mockProductService = {
      createProduct: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    snackbarService = {
      showErrorSnackbar: jest.fn(),
    } as any;

    formBuilder = new FormBuilder();

    component = new CreateProductComponent(
      mockProductService,
      snackbarService,
      formBuilder,
      mockRouter
    );
  });

  describe('createProduct', () => {
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

      mockProductService.createProduct.mockReturnValue(of(undefined));

      component.createProduct();

      expect(mockProductService.createProduct).toHaveBeenCalledWith(productDto);
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

      mockProductService.createProduct.mockReturnValue(throwError(() => error));

      component.createProduct();

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

      component.createProduct();

      expect(mockProductService.createProduct).not.toHaveBeenCalled();
    });
  });

  describe('handleFile', () => {
    it('should set image path on file handle', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      component.handleFile({ file });
      expect(component.formGroup.get('image')?.value).toBe(file);
    });

    it('should handle error', () => {
      const error = 'Test error';
      component.handleFile({ error });
      expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.products.fileTypeError'
      );
    });
  });
});
