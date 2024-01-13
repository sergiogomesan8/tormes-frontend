/* tslint:disable:no-unused-variable */
import { ProductComponent } from './product.component';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { Product } from '@shop/models/product';
import { of } from 'rxjs';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let mockShoppingCartService: ShoppingCartService;
  let mockProduct: Product;

  beforeEach(() => {
    mockShoppingCartService = {
      shoppingCart$: of({
        id: '1',
        shoppingCartProducts: [
          { product: { id: '1' }, amount: 10 },
          { product: { id: '2' }, amount: 2 },
        ],
      }),
      getShoppingCart: jest.fn(),
      deleteProductFromShoppingCart: jest.fn(),
      removeProductFromShoppingCart: jest.fn(),
      addProductToShoppingCart: jest.fn(),
    } as any;

    component = new ProductComponent(
      mockShoppingCartService as ShoppingCartService
    );

    mockProduct = {
      id: '1',
      image: 'image.jpg',
      name: 'Mock Product',
      price: 100,
      section: 'Mock Section',
      description: 'Mock Description',
    };

    component.product = mockProduct;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get shopping cart on init', () => {
    component.ngOnInit();
    expect(mockShoppingCartService.getShoppingCart).toHaveBeenCalled();
  });

  it('should delete product from shopping cart', () => {
    component.deleteProductFromShoppingCart(mockProduct);
    expect(
      mockShoppingCartService.deleteProductFromShoppingCart
    ).toHaveBeenCalledWith(mockProduct);
  });

  it('should remove product from shopping cart', () => {
    component.removeProductFromShoppingCart(mockProduct);
    expect(
      mockShoppingCartService.removeProductFromShoppingCart
    ).toHaveBeenCalledWith(mockProduct);
  });

  it('should add product to shopping cart', () => {
    component.addProductToShoppingCart(mockProduct);
    expect(
      mockShoppingCartService.addProductToShoppingCart
    ).toHaveBeenCalledWith(mockProduct);
  });

  it('should return total price of shopping cart items', () => {
    const totalPrice = component.totalProductAmount;

    expect(totalPrice).toBe(10);
  });
});
