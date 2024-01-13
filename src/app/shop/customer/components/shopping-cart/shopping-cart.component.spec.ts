/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '@shop/services/shopping-cart.service';
import { Product } from '@shop/models/product';
import { of } from 'rxjs';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let mockShoppingCartService: ShoppingCartService;
  let mockProduct: Product;

  beforeEach(() => {
    mockShoppingCartService = {
      shoppingCart$: of({ id: '1', shoppingCartProducts: [] }),
      getShoppingCart: jest.fn(),
      deleteProductFromShoppingCart: jest.fn(),
      removeProductFromShoppingCart: jest.fn(),
      addProductToShoppingCart: jest.fn(),
    } as any;

    component = new ShoppingCartComponent(
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
});
