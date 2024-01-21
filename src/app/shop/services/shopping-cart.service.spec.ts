/* tslint:disable:no-unused-variable */
import { ShoppingCartService } from './shopping-cart.service';
import { of } from 'rxjs';
import { ProductService } from './product.service';
import { ShoppingCart } from '@shop/models/shoppping-cart';
import { Product } from '@shop/models/product';
import { TestBed } from '@angular/core/testing';

describe('ShoppingCartService', () => {
  let service: ShoppingCartService;
  let productService: ProductService;
  let mockProduct: Product;

  const mockProductService = {
    findProductById: jest
      .fn()
      .mockResolvedValue({ id: '1', name: 'Product 1', price: 10 }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShoppingCartService,
        { provide: ProductService, useValue: mockProductService }, // Proporcionar el mock en lugar del servicio real
      ],
    });
    mockProduct = {
      id: '1',
      name: 'Product 1',
      image: 'image_url',
      price: 100,
      section: 'section',
      description: 'description',
    };
    service = TestBed.inject(ShoppingCartService);
    productService = TestBed.inject(ProductService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getShoppingCart', () => {
      const getShoppingCartSpy = jest.spyOn(service, 'getShoppingCart');

      service.ngOnInit();

      expect(getShoppingCartSpy).toHaveBeenCalled();
    });
  });

  describe('getShoppingCart', () => {
    it('should get shopping cart', async () => {
      const shoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 2 }],
      };

      jest
        .spyOn(service['localStorageService'], 'getItem')
        .mockReturnValue(JSON.stringify(shoppingCart));
      jest
        .spyOn(productService, 'findProductById')
        .mockReturnValue(of(mockProduct));

      let result: ShoppingCart | undefined;

      await service.getShoppingCart();
      service.shoppingCart$.subscribe((value) => {
        result = value;
      });

      expect(result).toEqual(shoppingCart);
    });
  });

  describe('addProductToShoppingCart', () => {
    it('should increase the amount of the product if it already exists in the shopping cart', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 2 }],
      };
      service['shoppingCart'].next(shoppingCart);

      service.addProductToShoppingCart(mockProduct);

      expect(service['shoppingCart'].value.shoppingCartProducts[0].amount).toBe(
        3
      );
    });

    it('should add the product to the shopping cart if it does not exist', (done) => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [],
      };
      service['shoppingCart'].next(shoppingCart);

      jest
        .spyOn(productService, 'findProductById')
        .mockReturnValue(of(mockProduct));

      service.addProductToShoppingCart(mockProduct);

      service.shoppingCart$.subscribe((value) => {
        expect(value.shoppingCartProducts[0].product).toEqual(mockProduct);
        expect(value.shoppingCartProducts[0].amount).toBe(1);
        done();
      });
    });
  });
  describe('removeProductFromShoppingCart', () => {
    it('should decrease the amount of the product if the amount is greater than 1', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 2 }],
      };
      service['shoppingCart'].next(shoppingCart);

      service.removeProductFromShoppingCart(mockProduct);

      expect(service['shoppingCart'].value.shoppingCartProducts[0].amount).toBe(
        1
      );
    });

    it('should remove the product from the shopping cart if the amount is 1', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 1 }],
      };
      service['shoppingCart'].next(shoppingCart);

      service.removeProductFromShoppingCart(mockProduct);

      expect(service['shoppingCart'].value.shoppingCartProducts.length).toBe(0);
    });
  });

  describe('deleteProductFromShoppingCart', () => {
    it('should remove the product from the shopping cart if the amount is 1', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 1 }],
      };
      service['shoppingCart'].next(shoppingCart);

      service.deleteProductFromShoppingCart(mockProduct);

      expect(service['shoppingCart'].value.shoppingCartProducts.length).toBe(0);
    });
  });

  describe('updateShoppingCart', () => {
    it('should update the shopping cart and save it to local storage', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 1 }],
      };

      const localStorageSpy = jest.spyOn(
        service['localStorageService'],
        'setItem'
      );

      service.updateShoppingCart(shoppingCart);

      expect(service['shoppingCart'].value).toEqual(shoppingCart);
      expect(localStorageSpy).toHaveBeenCalledWith(
        'shopping_cart',
        JSON.stringify({
          id: '123',
          shoppingCartProducts: [
            { product: { id: '1', name: 'Product 1' }, amount: 1 },
          ],
        })
      );
    });
  });

  describe('cleanShoppingCart', () => {
    it('should clean the shopping cart and remove it from local storage', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 1 }],
      };
      service['shoppingCart'].next(shoppingCart);

      const localStorageSpy = jest.spyOn(
        service['localStorageService'],
        'removeItem'
      );

      service.cleanShoppingCart();

      expect(service['shoppingCart'].value).toEqual({
        id: '',
        shoppingCartProducts: [],
      });
      expect(localStorageSpy).toHaveBeenCalledWith('shopping_cart');
    });

    it('should throw an error if removing item from local storage fails', () => {
      const shoppingCart: ShoppingCart = {
        id: '123',
        shoppingCartProducts: [{ product: mockProduct, amount: 1 }],
      };
      service['shoppingCart'].next(shoppingCart);

      const error = new Error('Failed to remove item from local storage');
      jest
        .spyOn(service['localStorageService'], 'removeItem')
        .mockImplementation(() => {
          throw error;
        });

      expect(() => service.cleanShoppingCart()).toThrowError(error);
    });
  });
});
