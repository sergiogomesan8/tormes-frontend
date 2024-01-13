/* tslint:disable:no-unused-variable */
import { ProductService } from '@shop/services/product.service';
import { UpdateProductComponent } from './update-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '@shared/services/snackbar.service';
import { Product } from '@shop/models/product';
import { of, throwError } from 'rxjs';
import { UpdateProductDto } from '@shop/admin/dtos/product.dto';

describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let mockProductService: jest.Mocked<ProductService>;
  let mockRouter: jest.Mocked<Router>;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let snackbarService: jest.Mocked<SnackbarService>;

  beforeEach(() => {
    mockProductService = {
      updateProduct: jest.fn(),
      findProductById: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    snackbarService = {
      showErrorSnackbar: jest.fn(),
    } as any;

    formBuilder = new FormBuilder();

    route = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    } as any;

    component = new UpdateProductComponent(
      mockProductService,
      snackbarService,
      formBuilder,
      mockRouter,
      route
    );
  });

  const product: Product = {
    id: '1',
    name: 'test',
    section: 'test',
    price: 10,
    description: 'test',
    image: 'test',
  };

  describe('ngOnInit', () => {
    it('should initialize form with product data if product id is present', () => {
      const testProduct: Product = {
        id: '1',
        name: 'Test Product',
        section: 'Test Section',
        price: 100,
        description: 'Test Description',
        image: 'Test Image',
      };

      mockProductService.findProductById.mockReturnValue(of(testProduct));

      component.ngOnInit();

      expect(mockProductService.findProductById).toHaveBeenCalledWith('1');
      expect(component.formGroup.value).toEqual({
        name: testProduct.name,
        section: testProduct.section,
        price: testProduct.price,
        description: testProduct.description,
        image: testProduct.image,
      });
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to /admin/products if product id is not present', () => {
      route.snapshot.paramMap.get = jest.fn().mockImplementation(() => null);

      component.ngOnInit();

      expect(route.snapshot.paramMap.get).toHaveBeenCalledWith('id');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/products']);
    });

    it('should navigate to /admin/products if product is not found', () => {
      mockProductService.findProductById.mockReturnValue(of(undefined));

      component.ngOnInit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/products']);
    });
  });

  describe('updateProduct', () => {
    it('should call updateProduct service if form is valid and there are changes', () => {
      component.formGroup.setValue({
        name: 'new name',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      });
      component.product = product;
      mockProductService.updateProduct.mockReturnValue(of(undefined));
      component.updateProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(
        product.id,
        { name: 'new name' }
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/products']);
    });

    it('should show error snackbar if form is valid but there are no changes', () => {
      component.formGroup.setValue({
        name: 'test',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      });
      component.product = product;
      component.updateProduct();
      expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.products.noChanges'
      );
    });

    it('should not call updateProduct service if form is invalid', () => {
      component.formGroup.setErrors({ invalid: true });
      component.updateProduct();
      expect(mockProductService.updateProduct).not.toHaveBeenCalled();
    });

    it('should log error if updateProduct service fails', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.formGroup.setValue({
        name: 'new name',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      });
      component.product = product;
      const error = new Error('Error');
      mockProductService.updateProduct.mockReturnValue(throwError(() => error));
      component.updateProduct();
      expect(consoleSpy).toHaveBeenCalledWith(error);
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

  describe('buildUpdateProductDto', () => {
    it('should return null if no changes', () => {
      component.formGroup.setValue({
        name: 'test',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      });
      component.product = product;
      expect(component.buildUpdateProductDto()).toBeNull();
    });

    it('should return updated fields if changes', () => {
      component.formGroup.setValue({
        name: 'new name',
        section: 'test',
        price: 10,
        description: 'test',
        image: 'test',
      });
      component.product = product;
      const expectedDto: UpdateProductDto = { name: 'new name' };
      expect(component.buildUpdateProductDto()).toEqual(expectedDto);
    });
  });

  describe('addIfChanged', () => {
    it('should add field to dto if changed', () => {
      const dto: UpdateProductDto = {};
      component.addIfChanged('name', 'new name', 'old name', dto);
      expect(dto).toEqual({ name: 'new name' });
    });

    it('should not add field to dto if not changed', () => {
      const dto: UpdateProductDto = {};
      component.addIfChanged('name', 'old name', 'old name', dto);
      expect(dto).toEqual({});
    });
  });
});
