/* tslint:disable:no-unused-variable */
import { ShoppingCartService } from './shopping-cart.service';
import { BehaviorSubject, of, tap } from 'rxjs';
import { LocalStorageService } from '@shared/services/localStorage.service';
import { ProductService } from './product.service';
import { ShoppingCart } from '@shop/models/shoppping-cart';
import { Product } from '@shop/models/product';

import { TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';

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
});

// describe('ShoppingCartService', () => {
//   let service: ShoppingCartService;
//   let localStorageService: LocalStorageService;
//   let productService: ProductService;
//   let shoppingCart: BehaviorSubject<ShoppingCart>;
//   let mockProduct: Product;

//   beforeEach(() => {
//     localStorageService = {
//       getItem: jest.fn(),
//     } as any;
//     productService = {
//       findProductById: jest.fn(),
//     } as any;
//     service = new ShoppingCartService(localStorageService, productService);
//     jest.spyOn(service, 'updateShoppingCart').mockImplementation();

//     mockProduct = {
//       id: '1',
//       name: 'Product 1',
//       image: 'image_url',
//       price: 100,
//       section: 'section',
//       description: 'description',
//     };

//     shoppingCart = new BehaviorSubject<ShoppingCart>({
//       id: '',
//       shoppingCartProducts: [],
//     });
//     service.shoppingCart$ = shoppingCart.asObservable();
//   });

//   describe('getShoppingCart', () => {
//     it('should get shopping cart', async () => {
//       const mockShoppingCart = {
//         id: '1',
//         shoppingCartProducts: [{ product: { id: '1' } }],
//       };
//       jest
//         .spyOn(localStorageService, 'getItem')
//         .mockReturnValue(JSON.stringify(mockShoppingCart));
//       jest
//         .spyOn(productService, 'findProductById')
//         .mockReturnValue(of(mockProduct));

//       const result = await service.getShoppingCart();

//       expect(result).toEqual({
//         id: '1',
//         shoppingCartProducts: [{ product: mockProduct }],
//       });
//     });

//     it('should return empty shopping cart when local storage is empty', async () => {
//       jest.spyOn(localStorageService, 'getItem').mockReturnValue(null);

//       const result = await service.getShoppingCart();

//       expect(result).toEqual({
//         id: '',
//         shoppingCartProducts: [],
//       });
//     });
//   });

//   describe('addProductToShoppingCart', () => {
//     it('should add a new product to the shopping cart', (done) => {
//       (productService.findProductById as jest.Mock).mockReturnValue(
//         of(mockProduct)
//       );

//       service.addProductToShoppingCart(mockProduct);

//       service.shoppingCart$.subscribe((cart) => {
//         expect(cart.shoppingCartProducts).toContainEqual({
//           product: mockProduct,
//           amount: 1,
//         });
//         done();
//       });
//     }, 10000);

//     it('should increase the amount of an existing product in the shopping cart', (done) => {
//       const mockFullProduct = {
//         id: '1',
//         name: 'Product 1',
//         image: 'image_url',
//         price: 100,
//         section: 'section',
//         description: 'description',
//       };

//       shoppingCart.next({
//         id: '1',
//         shoppingCartProducts: [{ product: mockProduct, amount: 1 }],
//       });

//       service.addProductToShoppingCart(mockProduct);

//       service.shoppingCart$.subscribe((cart) => {
//         expect(cart.shoppingCartProducts).toContainEqual({
//           product: mockFullProduct,
//           amount: 2,
//         });
//         done();
//       });
//     }, 10000);
//   });
// it.skip('should increase the amount of the product if it already exists in the shopping cart', (done) => {
//   const mockShoppingCartProduct = { product: mockProduct, amount: 1 };
//   const mockShoppingCart = {
//     id: '1',
//     shoppingCartProducts: [mockShoppingCartProduct],
//   };
//   shoppingCart.next(mockShoppingCart);
//   jest
//     .spyOn(service, 'updateShoppingCart')
//     .mockImplementation((updatedCart) => {
//       shoppingCart.next(updatedCart);
//     });

//   jest
//     .spyOn(localStorageService, 'getItem')
//     .mockReturnValue(JSON.stringify(mockShoppingCart));
//   jest
//     .spyOn(productService, 'findProductById')
//     .mockReturnValue(of(mockProduct));

//   service.addProductToShoppingCart(mockProduct);

//   expect(mockShoppingCartProduct.amount).toBe(2);
//   expect(service.updateShoppingCart).toHaveBeenCalledWith(mockShoppingCart);
// });

// it('should add the product to the shopping cart if it does not exist in the shopping cart', (done) => {
//   const mockFullProduct = {
//     id: '1',
//     name: 'Product 1',
//     image: 'image_url',
//     price: 100,
//     section: 'section',
//     description: 'description',
//   };
//   const mockShoppingCart = { id: '1', shoppingCartProducts: [] };
//   shoppingCart.next(mockShoppingCart);
//   jest
//     .spyOn(productService, 'findProductById')
//     .mockReturnValue(of(mockFullProduct));

//   service.addProductToShoppingCart(mockProduct);

//   service.shoppingCart$.subscribe((cart) => {
//     expect(cart.shoppingCartProducts[0].amount).toBe(1);
//     done();
//   });
// }, 10000);

// it('should not add the product to the shopping cart if it does not exist in the system', (done) => {
//   const mockShoppingCart = { id: '1', shoppingCartProducts: [] };
//   shoppingCart.next(mockShoppingCart);
//   jest
//     .spyOn(productService, 'findProductById')
//     .mockReturnValue(of(undefined));

//   service.addProductToShoppingCart(mockProduct);

//   service.shoppingCart$.subscribe((cart) => {
//     expect(cart.shoppingCartProducts.length).toBe(0);
//     done();
//   });
// }, 10000);
// });

// describe('removeProductFromShoppingCart', () => {
//   it('should decrease the amount of the product if it is more than 1', () => {
//     const mockProduct = {
//       id: '1',
//       name: 'Product 1',
//       image: 'image_url',
//       price: 100,
//       section: 'section',
//       description: 'description',
//     };
//     const mockShoppingCartProduct = {
//       product: mockProduct,
//       amount: 2,
//     };
//     jest
//       .spyOn(service, 'updateShoppingCart')
//       .mockImplementation((updatedCart) => {
//         shoppingCart.next(updatedCart);
//       });

//     shoppingCart.next({
//       id: '1',
//       shoppingCartProducts: [mockShoppingCartProduct],
//     });

//     service.removeProductFromShoppingCart(mockProduct);

//     const updatedCart = shoppingCart.getValue();
//     console.log(updatedCart);
//     const updatedProduct = updatedCart.shoppingCartProducts.find(
//       (p) => p.product.id === mockProduct.id
//     );

//     expect(updatedProduct).toBeDefined();
//     if (updatedProduct) {
//       expect(updatedProduct.amount).toBe(1);
//     }
//   });

//   it('should remove the product from the cart if the amount is 1', () => {
//     const mockProduct = {
//       id: '1',
//       name: 'Product 1',
//       image: 'image_url',
//       price: 100,
//       section: 'section',
//       description: 'description',
//     };

//     const mockShoppingCartProduct = {
//       product: mockProduct,
//       amount: 1,
//     };
//     jest
//       .spyOn(service, 'updateShoppingCart')
//       .mockImplementation((updatedCart) => {
//         shoppingCart.next(updatedCart);
//       });

//     shoppingCart.next({
//       id: '1',
//       shoppingCartProducts: [mockShoppingCartProduct],
//     });

//     service.removeProductFromShoppingCart(mockProduct);

//     expect(shoppingCart.getValue().shoppingCartProducts.length).toBe(0);
//   });

//   it('should not change the cart if the product does not exist in the cart', () => {
//     const mockProduct = {
//       id: '1',
//       name: 'Product 1',
//       image: 'image_url',
//       price: 100,
//       section: 'section',
//       description: 'description',
//     };

//     shoppingCart.next({
//       id: '1',
//       shoppingCartProducts: [],
//     });

//     service.removeProductFromShoppingCart(mockProduct);

//     expect(shoppingCart.getValue().shoppingCartProducts.length).toBe(0);
//   });
// });
// });
